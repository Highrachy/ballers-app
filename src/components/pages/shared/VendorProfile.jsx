import React from 'react';
import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';
import { PropertyIcon } from 'components/utils/Icons';
import { API_ENDPOINT } from 'utils/URL';
import PaginatedContent from 'components/common/PaginatedContent';
import { PropertiesRowList } from '../user/JustForYou';
import CardTableSection from 'components/common/CardTableSection';
import Toast, { useToast } from 'components/utils/Toast';
import { useGetQuery } from 'hooks/useQuery';
import { ContentLoader } from 'components/utils/LoadingItems';
import { UserIcon } from 'components/utils/Icons';
import { getFormattedAddress } from 'utils/helpers';
import { ErrorIcon } from 'components/utils/Icons';
import { SuccessIcon } from 'components/utils/Icons';
import { getUserStatus } from '../admin/Users';
import Tooltip from 'components/common/Tooltip';
import { EmptyTitleSection } from 'components/common/TitleSection';

const pageOptions = {
  key: 'user',
  pageName: 'User',
};

const VendorProfile = ({ slug }) => {
  const [toast, setToast] = useToast();
  const [userQuery, user] = useGetQuery({
    key: pageOptions.key,
    name: [pageOptions.key, slug],
    setToast,
    endpoint: API_ENDPOINT.getVendor(slug),
    refresh: true,
  });

  return (
    <>
      <Header />

      <EmptyTitleSection>
        <Toast {...toast} showToastOnly />

        <section className="container-fluid">
          <ContentLoader
            hasContent={!!user}
            Icon={<UserIcon />}
            query={userQuery}
            name={pageOptions.pageName}
            toast={toast}
          >
            <div className="row">
              <div className="col-sm-4">
                <ContentHeader user={user} />
              </div>
              <div className="col-sm-8">
                {user?._id && (
                  <PaginatedContent
                    endpoint={API_ENDPOINT.searchProperties()}
                    initialFilter={{ addedBy: user?._id }}
                    pageName="Property"
                    pluralPageName="Properties"
                    DataComponent={PropertiesRowList}
                    PageIcon={<PropertyIcon />}
                    queryName="property"
                  />
                )}
              </div>
            </div>
          </ContentLoader>
        </section>
      </EmptyTitleSection>

      <Footer />
    </>
  );
};

const ContentHeader = ({ user }) => {
  const status = getUserStatus(user);
  return (
    <section>
      <h4 className="mb-3 text-secondary">Vendor Page</h4>

      <CardTableSection name="Company Information">
        <tr>
          <td>
            <strong>Company Name</strong>
          </td>
          <td>
            {user.vendor?.companyName}{' '}
            <Tooltip text={status.tooltip}>
              <span className={`${status.className} icon-md`}>
                {status.Icon}
              </span>
            </Tooltip>
          </td>
        </tr>
        <tr>
          <td>
            <strong>Company Logo</strong>
          </td>
          <td>
            <img
              alt={user.firstName}
              className="img-fluid dashboard-top-nav__company-logo mb-3"
              src={user.vendor.companyLogo}
              title={user.firstName}
            />
          </td>
        </tr>
        <tr>
          <td>
            <strong>Company Address</strong>
          </td>
          <td>{user.address && getFormattedAddress(user.address)}</td>
        </tr>
        <tr>
          <td>
            <strong>Entity Type</strong>
          </td>
          <td>{user.vendor?.entity}</td>
        </tr>
        {user.vendor?.redanNumber && (
          <tr>
            <td>
              <strong>Redan Number</strong>
            </td>
            <td>{user.vendor?.redanNumber}</td>
          </tr>
        )}
        <tr>
          <td>
            <strong>Verified</strong>
          </td>
          <td>
            {user.vendor?.verified ? (
              <>
                Yes <SuccessIcon />{' '}
              </>
            ) : (
              <>
                No <ErrorIcon />
              </>
            )}
          </td>
        </tr>
        <tr>
          <td>
            <strong>Certified</strong>
          </td>
          <td>
            {user.vendor?.certified ? (
              <>
                Yes <SuccessIcon />{' '}
              </>
            ) : (
              <>
                No <ErrorIcon />
              </>
            )}
          </td>
        </tr>
      </CardTableSection>
    </section>
  );
};

export default VendorProfile;
