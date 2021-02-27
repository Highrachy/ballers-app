import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { Card, ProgressBar } from 'react-bootstrap';
import { Link } from '@reach/router';
// import PropertyPlaceholderImage from 'assets/img/placeholder/property-holder.jpg';
import Map from 'components/common/Map';
import { BASE_API_URL } from 'utils/constants';
import Toast, { useToast } from 'components/utils/Toast';
import Axios from 'axios';
import {
  // CameraIcon,
  CheckIcon,
  // DownloadIcon,
  MapPinIcon,
} from 'components/utils/Icons';
import { getTokenFromStore } from 'utils/localStorage';
import {
  moneyFormatInNaira,
  getError,
  getLocationFromAddress,
} from 'utils/helpers';
import { MyPropertyIcon } from 'components/utils/Icons';
import { Loading } from 'components/utils/LoadingItems';

const SinglePortfolio = ({ id, assigned }) => {
  const [toast, setToast] = useToast();
  const [property, setProperty] = React.useState(null);
  React.useEffect(() => {
    Axios.get(`${BASE_API_URL}/property/assigned/${id}`, {
      headers: {
        Authorization: getTokenFromStore(),
      },
    })
      .then(function (response) {
        const { status, data } = response;
        if (status === 200) {
          setProperty(data.property);
        }
      })
      .catch(function (error) {
        setToast({
          message: getError(error),
        });
      });
  }, [setToast, id]);
  return (
    <BackendPage>
      {property ? (
        <OwnedPropertyCard
          offer={property.offer}
          totalPaid={property.totalPaid}
          toast={toast}
        />
      ) : (
        <Loading text="Loading Property" Icon={<MyPropertyIcon />} />
      )}
    </BackendPage>
  );
};

const OwnedPropertyCard = ({ offer, totalPaid, toast }) => {
  const property = offer.propertyInfo;
  return (
    <div className="container-fluid">
      <Toast {...toast} />
      <Card className="card-container mt-4 h-100 property-holder__big">
        <div className="row">
          <div className="col-sm-10">
            <h3 className={`property-holder__big-title border-success`}>
              {property.name}
            </h3>
          </div>
        </div>
        <PropertyImage property={property} />
        <div className="row mt-5">
          <div className="col-sm-7">
            <PropertyDescription
              property={property}
              propertyPrice={offer.totalAmountPayable}
            />
          </div>

          {/* Side Card */}
          <div className="col-sm-5">
            <aside className="ml-md-5">
              <AssignedPropertySidebar offer={offer} totalPaid={totalPaid} />
            </aside>
          </div>
        </div>
        <Neighborhood />
      </Card>
      <PropertyMap mapLocation={property.mapLocation} />
    </div>
  );
};

const PropertyImage = ({ property }) => (
  <div className="row">
    <div className="col-sm-12">
      <img
        src={property.mainImage}
        alt="Property"
        className="img-fluid gallery-main-image  property-img"
      />
    </div>
    {/* <div className="col-sm-2">
      <aside className="row gallery-row">
        <div className="gallery-col col-3 col-md-12">
          <img
            src={PropertyPlaceholderImage}
            alt="Property"
            className="img-fluid gallery-thumbnails property-img"
          />
        </div>
        <div className="gallery-col col-3 col-md-12">
          <img
            src={PropertyPlaceholderImage}
            alt="Property"
            className="img-fluid gallery-thumbnails property-img"
          />
        </div>
        <div className="gallery-col col-3 col-md-12">
          <img
            src={PropertyPlaceholderImage}
            alt="Property"
            className="img-fluid gallery-thumbnails property-img"
          />
        </div>
        <div className="gallery-col col-3 col-md-12">
          <Link to="/user/gallery" className="overlay overlay__secondary">
            <img
              src={PropertyPlaceholderImage}
              alt="Property"
              className="img-fluid gallery-thumbnails property-img mb-0"
            />
            <span>
              <CameraIcon /> <br />
              View Gallery
            </span>
          </Link>
        </div>
      </aside>
    </div> */}
  </div>
);

const PropertyDescription = ({ property, propertyPrice }) => (
  <>
    <h5 className="mb-4">
      <span className="text-secondary">
        <MapPinIcon />
      </span>{' '}
      {getLocationFromAddress(property.address)}
    </h5>
    <div className="row">
      <div className="col-sm-4 col-6">
        <small>Property Value</small>
        <h5>{moneyFormatInNaira(propertyPrice)}</h5>
      </div>
      <div className="col-sm-4 col-6">
        <small>House Type</small>
        <h5>{property.houseType}</h5>
      </div>
      <div className="col-sm-2 col-6">
        <small>Bedroom</small>
        <h5>{property.bedrooms}</h5>
      </div>
      <div className="col-sm-2 col-6">
        <small>Bathroom</small>
        <h5>{property.toilets}</h5>
      </div>
    </div>

    <h5 className="mt-5">About Property</h5>
    <p className="">{property.description}</p>

    {/* <div className="my-5">
      <a href="/" className="btn-link icon-box">
        View floor plans{' '}
        <span className="d-inline-block ml-2">
          <DownloadIcon />
        </span>
      </a>
    </div> */}
  </>
);

const AssignedPropertySidebar = ({ offer, totalPaid }) => {
  const property = offer.propertyInfo;
  const amountToPay =
    totalPaid === 0 ? offer.initialPayment : offer.periodicPayment;
  const percentage = Math.floor((totalPaid / offer.totalAmountPayable) * 100);

  const initiatePayment = () => {
    Axios.post(
      `${BASE_API_URL}/payment/initiate`,
      {
        amount: amountToPay,
        propertyId: property._id,
        offerId: offer._id,
      },
      {
        headers: {
          Authorization: getTokenFromStore(),
        },
      }
    )
      .then(function (response) {
        const { status, data } = response;
        if (status === 201) {
          window.location.href = data.payment.authorization_url;
        }
      })
      .catch(function (error) {});
  };
  return (
    <Card className="card-container property-holder">
      <table className="table table-sm table-borderless">
        <tbody>
          <tr>
            <td>
              <small className="ml-n1">Property Value</small>{' '}
            </td>
            <td>
              <h5>{moneyFormatInNaira(offer.totalAmountPayable)}</h5>
            </td>
          </tr>
          <tr>
            <td>
              <small className="ml-n1">Amount Paid</small>{' '}
            </td>
            <td>
              <h5>{totalPaid === 0 ? '-' : moneyFormatInNaira(totalPaid)}</h5>
            </td>
          </tr>
        </tbody>
      </table>

      <small className="">Contribution Progress</small>

      <div className="row">
        <div className="col-sm-12">
          <small style={{ paddingLeft: `${percentage - 5}%` }}>
            {percentage}%
          </small>
          <ProgressBar
            variant="success"
            now={percentage}
            label={`${percentage}%`}
            srOnly
          />
        </div>
      </div>

      <hr className="my-4" />

      <small className="">Next Payment</small>
      <h5 className="text-center my-3">{moneyFormatInNaira(amountToPay)}</h5>

      <button className="btn btn-block btn-secondary" onClick={initiatePayment}>
        Make Payment
      </button>
      <Link to="/users/transaction" className="small text-center mt-3">
        View Transaction History
      </Link>
    </Card>
  );
};

const Neighborhood = () => (
  <>
    <h5 className="mt-5">The neighbourhood</h5>
    <div className="row">
      <div className="col-sm-4">
        <NeighborhoodCheck name="Schools" color="blue" />
      </div>
      <div className="col-sm-4">
        <NeighborhoodCheck name="Hospitals" color="orange" />
      </div>
      <div className="col-sm-4">
        <NeighborhoodCheck name="Shopping Mall" color="purple" />
      </div>
      <div className="col-sm-4">
        <NeighborhoodCheck name="Entertainment" color="green" />
      </div>
      <div className="col-sm-4">
        <NeighborhoodCheck name="Restaurant & Bars" color="blue" />
      </div>
      <div className="col-sm-4">
        <NeighborhoodCheck name="Parks" color="pink" />
      </div>
    </div>
  </>
);

const NeighborhoodCheck = ({ name, color }) => (
  <div className="neighborhood-check icon-box">
    <span className={color}>
      <CheckIcon />
    </span>
    {name}
  </div>
);

const PropertyMap = ({ mapLocation }) =>
  mapLocation ? (
    mapLocation.latitude &&
    mapLocation.longitude && (
      <div style={{ height: '15rem', marginTop: '-2px' }}>
        <Map
          coordinates={{
            lat: mapLocation.latitude,
            lng: mapLocation.longitude,
          }}
        />
      </div>
    )
  ) : (
    <></>
  );

export default SinglePortfolio;
