import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { Link } from '@reach/router';
import PropertyCard from 'components/common/PropertyCard';
import Axios from 'axios';
import { BASE_API_URL } from 'utils/constants';
import Toast, { useToast } from 'components/utils/Toast';
import { getTokenFromStore } from 'utils/localStorage';
import { getError, moneyFormatInNaira } from 'utils/helpers';
import LoadItems from 'components/utils/LoadingItems';
import { MyPropertyIcon } from 'components/utils/Icons';
import NoContent from 'components/utils/NoContent';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { MessageIcon } from 'components/utils/Icons';
import ProfileAvatar from 'assets/img/avatar/profile.png';
import { getShortDate } from 'utils/date-helpers';
import PortfolioCards from 'components/common/PortfolioCards';

const Portfolio = () => {
  const [toast, setToast] = useToast();
  const [properties, setProperties] = React.useState(null);

  React.useEffect(() => {
    Axios.post(
      `${BASE_API_URL}/property/search`,
      {},
      {
        headers: {
          Authorization: getTokenFromStore(),
        },
      }
    )
      .then(function (response) {
        const { status, data } = response;
        console.log('data', data);
        // handle success
        if (status === 200) {
          setProperties(data.properties);
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
      <Content setToast={setToast} recommendedProperties={properties} />
    </BackendPage>
  );
};

const Content = ({ setToast, recommendedProperties }) => (
  <>
    <div className="container-fluid">
      <h5>Your active property</h5>
      <PortfolioCards setToast={setToast} />
    </div>

    <EnjoyingBallers />

    <Offers />

    <LoadItems
      Icon={<MyPropertyIcon />}
      items={recommendedProperties}
      loadingText="Loading Property Recommendations"
      noContent={<NoContent isButton text="No Properties found" />}
    >
      <div className="container-fluid">
        <h5 className="mt-4">Just for you (Recommended Properties)</h5>
        <div className="row">
          {recommendedProperties &&
            recommendedProperties.map((property) => (
              <div className="col-sm-6" key={property._id}>
                <PropertyCard {...property} />
              </div>
            ))}
        </div>
      </div>
    </LoadItems>
  </>
);

const EnjoyingBallers = () => (
  <section className="container-fluid">
    <div className="card bg-primary dashboard mt-4 mb-3">
      <div className="row py-4">
        <div className="col-sm-8">
          <h4>Enjoying your balling experience </h4>
          <p className="lead">Expand your portfolio today</p>
        </div>
        <div className="col-sm-4">
          <section className="property-btn">
            <Link to="/user/just-for-you" className="btn btn-secondary">
              + Add a New Property
            </Link>
          </section>
        </div>
      </div>
    </div>
  </section>
);
const Offers = () => {
  const [toast, setToast] = useToast();
  const [offers, setOffers] = React.useState(null);
  React.useEffect(() => {
    Axios.get(`${BASE_API_URL}/offer/user/all`, {
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
    <>
      <h5 className="container-fluid mt-4">All Offers</h5>
      <LoadItems
        Icon={<MessageIcon />}
        items={offers}
        loadingText="Loading your Offers"
        noContent={
          <NoContent Icon={<MessageIcon />} isButton text="No Offers found" />
        }
      >
        <OffersRowList toast={toast} offers={offers || []} />
      </LoadItems>
    </>
  );
};

const OffersRowList = ({ offers }) => (
  <div className="container-fluid">
    <Card>
      <div className="table-responsive">
        <table className="table table-border table-hover">
          <thead>
            <tr>
              <td>S/N</td>
              <td>Image</td>
              <td>Vendor</td>
              <td>Property Name</td>
              <td>Property Price</td>
              <td>Status</td>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer, index) => (
              <OffersRow key={index} number={index + 1} {...offer} />
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
  status,
  _id,
  totalAmountPayable,
  number,
  expires,
  enquiryInfo,
  propertyInfo,
}) => (
  <tr>
    <td>{number}</td>
    <td>
      <img
        alt={propertyInfo.name}
        className="img-fluid avatar--medium--small"
        src={propertyInfo.mainImage ? propertyInfo.mainImage : ProfileAvatar}
        title={propertyInfo.name}
      />
    </td>
    <td>
      Highrachy
      <br />
      <small>09012345678</small>
    </td>
    <td>{propertyInfo.name}</td>
    <td>{moneyFormatInNaira(totalAmountPayable)}</td>
    <td>{status}</td>
    <td>{getShortDate(expires)}</td>
    <td>
      <Link
        className="btn btn-sm btn-secondary"
        to={`/user/property/offer-letter/${_id}`}
      >
        View Offer
      </Link>
    </td>
  </tr>
);

export default Portfolio;
