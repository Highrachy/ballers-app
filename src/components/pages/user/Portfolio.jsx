import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { Link } from '@reach/router';
import PropertyCard from 'components/common/PropertyCard';
import Axios from 'axios';
import { ACTIVE_OFFER_STATUS, BASE_API_URL } from 'utils/constants';
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
import { FileIcon } from 'components/utils/Icons';
import { SuccessIcon } from 'components/utils/Icons';
import { InfoIcon } from 'components/utils/Icons';

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
      <div className="row">
        <PortfolioCards setToast={setToast} />
      </div>
    </div>

    <Offers />
    <EnjoyingBallers />

    <LoadItems
      Icon={<MyPropertyIcon />}
      items={recommendedProperties}
      loadingText="Loading Property Recommendations"
      noContent={<NoContent isButton text="No Properties found" />}
    >
      <div className="container-fluid">
        <h5 className="mt-4">Just for you</h5>
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
      <h5 className="container-fluid mt-5">All Offers</h5>
      <LoadItems
        Icon={<MessageIcon />}
        items={offers}
        size="small"
        loadingText="Loading your Offers"
        noContent={
          <NoContent
            size="small"
            Icon={<MessageIcon />}
            text="No Offers found"
          />
        }
      >
        <OffersRowList toast={toast} offers={offers || []} />
      </LoadItems>
    </>
  );
};

const OffersRowList = ({ offers }) => (
  <div className="container-fluid mb-5">
    <Card>
      <div className="table-responsive">
        <table className="table table-border table-hover mb-0">
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
  <>
    <tr>
      <td>{number}</td>{' '}
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
      <td>
        <strong>Highrachy</strong>
        <br />
        <small>09012345678</small>
      </td>
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
          to={`/user/property/offer-letter/${_id}`}
        >
          <FileIcon /> View Offer
        </Link>
      </td>
    </tr>
  </>
);

export default Portfolio;
