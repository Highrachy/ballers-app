import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { Card } from 'react-bootstrap';
import { Link } from '@reach/router';
import PaginatedContent from 'components/common/PaginatedContent';
import { API_ENDPOINT } from 'utils/URL';
import ProfileAvatar from 'assets/img/avatar/profile.png';
import { moneyFormatInNaira } from 'utils/helpers';
import { ACTIVE_OFFER_STATUS } from 'utils/constants';
import { SuccessIcon } from 'components/utils/Icons';
import { InfoIcon } from 'components/utils/Icons';
import { FileIcon } from 'components/utils/Icons';
import { useCurrentRole } from 'hooks/useUser';
import { OfferIcon } from 'components/utils/Icons';
import UserCard from 'components/common/UserCard';

const Offers = () => (
  <BackendPage>
    <PaginatedContent
      endpoint={API_ENDPOINT.getAllOffers()}
      pageName="Offer"
      pluralPageName="Offers"
      DataComponent={OffersRowList}
      PageIcon={<OfferIcon />}
      queryName="offer"
    />
  </BackendPage>
);

export const OffersRowList = ({ results, offset }) => (
  <div className="container-fluid mb-5">
    <Card>
      <div className="table-responsive">
        <table className="table table-border table-hover mb-0">
          <tbody>
            {results?.map((offer, index) => (
              <OffersRow key={index} number={offset + index + 1} {...offer} />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

const OffersRow = ({
  status,
  _id,
  totalAmountPayable,
  number,
  expires,
  enquiryInfo,
  vendorInfo,
  userInfo,
  propertyInfo,
}) => (
  <>
    <tr>
      <td>{number}</td>
      <td>
        <img
          alt={propertyInfo.name}
          className="img-fluid avatar--medium--small rounded"
          src={propertyInfo.mainImage ? propertyInfo.mainImage : ProfileAvatar}
          title={propertyInfo.name}
        />
      </td>
      <td>
        <strong>{propertyInfo.name}</strong>
        <br />
        <small>
          {propertyInfo.address.city}, {propertyInfo.address.state}
        </small>
      </td>
      <td>
        <strong>{moneyFormatInNaira(totalAmountPayable)}</strong>
      </td>
      {useCurrentRole().isUser ? (
        <td>
          <strong>{vendorInfo?.vendor?.companyName}</strong>
          <br />
          <small>{vendorInfo?.phone}</small>
        </td>
      ) : (
        <td>
          <UserCard user={userInfo} />
        </td>
      )}
      <td>
        {ACTIVE_OFFER_STATUS.includes(status) ? (
          <span className="text-green">
            <SuccessIcon />{' '}
          </span>
        ) : (
          <span className="text-danger">
            <InfoIcon />
          </span>
        )}
      </td>
      <td>
        <Link
          className="btn btn-sm btn-secondary"
          to={`/${useCurrentRole().name}/offer/${_id}`}
        >
          <FileIcon /> View Offer
        </Link>
      </td>
    </tr>
  </>
);

export default Offers;
