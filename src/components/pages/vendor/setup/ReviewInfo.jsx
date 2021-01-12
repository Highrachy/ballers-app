import React from 'react';
import { Card } from 'react-bootstrap';
import BackendPage from 'components/layout/BackendPage';
import CardTableSection from 'components/common/CardTableSection';
import { UserContext } from 'context/UserContext';
import { getFormattedAddress } from 'utils/helpers';
import { navigate } from '@reach/router';
import { ShowDirectorsTable } from './Signatories';

const ReviewInfo = () => (
  <BackendPage>
    <div className="container-fluid">
      <ReviewInfoForm />
    </div>
  </BackendPage>
);

export const ReviewInfoForm = () => {
  const { userState } = React.useContext(UserContext);
  return (
    <>
      <CardTableSection name="Company Information">
        <tr>
          <td>
            <strong>Company Logo</strong>
          </td>
          <td>
            {userState.vendor?.companyLogo && (
              <img
                alt={userState.firstName}
                className="img-fluid dashboard-top-nav__company-logo mb-3"
                src={userState.vendor.companyLogo}
                title={userState.firstName}
              />
            )}
          </td>
        </tr>
        <tr>
          <td>
            <strong>Company Name</strong>
          </td>
          <td>{userState.vendor?.companyName}</td>
        </tr>
        <tr>
          <td>
            <strong>Email</strong>
          </td>
          <td>{userState.email}</td>
        </tr>
        <tr>
          <td>
            <strong>Phone</strong>
          </td>
          <td>
            {userState.phone} <br /> {userState.phone2}
          </td>
        </tr>

        <tr>
          <td>
            <strong>Company Address</strong>
          </td>
          <td>{userState.address && getFormattedAddress(userState.address)}</td>
        </tr>
        <tr>
          <td>
            <strong>Entity Type</strong>
          </td>
          <td>{userState.vendor?.entity}</td>
        </tr>
        {userState.vendor?.redanNumber && (
          <tr>
            <td>
              <strong>Redan Number</strong>
            </td>
            <td>{userState.vendor?.redanNumber}</td>
          </tr>
        )}
      </CardTableSection>
      <CardTableSection name="Bank Information">
        <tr>
          <td>
            <strong>Account Name</strong>
          </td>
          <td>{userState.vendor?.bankInfo?.accountName}</td>
        </tr>
        <tr>
          <td>
            <strong>Bank Name</strong>
          </td>
          <td>{userState.vendor?.bankInfo?.bankName}</td>
        </tr>
        <tr>
          <td>
            <strong>Account Number</strong>
          </td>
          <td>{userState.vendor?.bankInfo?.accountNumber}</td>
        </tr>
      </CardTableSection>

      <Card className="card-container mb-5">
        <h5 className="mb-4">Directors / Signatories</h5>
        <ShowDirectorsTable
          directors={userState.vendor?.directors}
          moveToNextStep={null}
        />
      </Card>
      <CardTableSection name="Certificates">
        <tr>
          <td>
            <strong>Identification</strong>
          </td>
          <td>
            <img
              alt="Tax Certificate"
              className="img-fluid mb-3"
              src={userState.vendor?.identification[0].url}
              title="Tax Certificate"
            />
            {userState.vendor?.identification[0].type}
          </td>
        </tr>
        <tr>
          <td>
            <strong>Tax Certificate</strong>
          </td>
          <td>
            <img
              alt="Tax Certificate"
              className="img-fluid mb-3"
              src={userState.vendor?.taxCertificate}
              title="Tax Certificate"
            />
          </td>
        </tr>
      </CardTableSection>
      <button
        className="btn btn-secondary"
        onClick={() => navigate('/vendor/dashboard')}
      >
        Finish Verification
      </button>
    </>
  );
};

export default ReviewInfo;