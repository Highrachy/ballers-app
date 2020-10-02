import React from 'react';
import PropTypes from 'prop-types';
import BackendPage from 'components/layout/BackendPage';
import { Card } from 'react-bootstrap';
import Axios from 'axios';
import { BASE_API_URL } from 'utils/constants';
import Toast, { useToast } from 'components/utils/Toast';
import { getTokenFromStore } from 'utils/localStorage';
import LoadItems from 'components/utils/LoadingItems';
import NoContent from 'components/utils/NoContent';
import { TransactionIcon } from 'components/utils/Icons';
import { getError } from 'utils/helpers';
import TopTitle from 'components/utils/TopTitle';
import ProfileAvatar from 'assets/img/avatar/profile.png';
import { Link } from '@reach/router';

const AddTransaction = () => {
  const [toast, setToast] = useToast();
  const [offers, setOffers] = React.useState(null);
  React.useEffect(() => {
    Axios.get(`${BASE_API_URL}/offer/admin/all`, {
      headers: {
        Authorization: getTokenFromStore(),
      },
    })
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setOffers(data.offers);
        }
      })
      .catch(function (error) {
        setToast({
          message: getError(error),
        });
      });
  }, [setToast]);
  return (
    <BackendPage>
      <Toast {...toast} showToastOnly />
      <TopTitle>All Offers</TopTitle>
      <AllOffers offers={offers} />
    </BackendPage>
  );
};

const AllOffers = ({ offers, toast }) => (
  <LoadItems
    Icon={<TransactionIcon />}
    items={offers}
    loadingText="Loading your Offers"
    noContent={
      <NoContent Icon={<TransactionIcon />} isButton text="No Offers found" />
    }
  >
    <OffersRowList toast={toast} offers={offers || []} />
  </LoadItems>
);

const OffersRowList = ({ offers }) => (
  <div className="container-fluid">
    <Card className="mt-4">
      <div className="table-responsive">
        <table className="table table-border table-hover">
          <thead>
            <tr>
              <td>S/N</td>
              <td>Avatar</td>
              <td>Name</td>
              <td>Phone</td>
              <td>Status</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {offers.map((user, index) => (
              <OffersRow key={index} number={index + 1} {...user} />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

OffersRowList.propTypes = {
  offers: PropTypes.array.isRequired,
};

const OffersRow = ({
  _id,
  totalAmountPayable,
  monthlyPayment,
  paymentFrequency,
  number,
  enquiryInfo,
  userInfo,
}) => (
  <tr>
    <td>{number}</td>
    <td>
      <img
        alt={userInfo.firstName}
        className="img-fluid avatar--medium--small"
        src={userInfo.profileImage ? userInfo.profileImage.url : ProfileAvatar}
        title={userInfo.firstName}
      />
    </td>
    <td>
      {enquiryInfo.firstName} {enquiryInfo.lastName} <br />
      <small>{enquiryInfo.email}</small>
    </td>
    <td>
      {enquiryInfo.phone} <br />
    </td>
    <td>
      {enquiryInfo.phone} <br />
    </td>

    <td>
      <Link
        className="btn btn-sm btn-secondary"
        to={`/admin/transactions/new/${_id}`}
      >
        Add Payment
      </Link>
    </td>
  </tr>
);

export default AddTransaction;
