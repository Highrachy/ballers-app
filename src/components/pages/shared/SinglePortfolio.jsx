import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { Card } from 'react-bootstrap';
import Map from 'components/common/Map';
import { BASE_API_URL, USER_TYPES } from 'utils/constants';
import Toast, { useToast } from 'components/utils/Toast';
import Axios from 'axios';
import { MapPinIcon } from 'components/utils/Icons';
import { getTokenFromStore } from 'utils/localStorage';
import NoContent from 'components/utils/NoContent';
import {
  moneyFormatInNaira,
  getError,
  getLocationFromAddress,
} from 'utils/helpers';
import { MyPropertyIcon } from 'components/utils/Icons';
import Image from 'components/utils/Image';
import PropertyPlaceholderImage from 'assets/img/placeholder/property.png';
import Modal from 'components/common/Modal';
import { Link } from '@reach/router';
import { UserContext } from 'context/UserContext';
import { CameraIcon } from 'components/utils/Icons';
import { BathIcon } from 'components/utils/Icons';
import { ToiletIcon } from 'components/utils/Icons';
import { BedIcon } from 'components/utils/Icons';
import { VendorIcon } from 'components/utils/Icons';
import Humanize from 'humanize-plus';
import { CertifyIcon } from 'components/utils/Icons';
import { Accordion } from 'react-bootstrap';
import { ArrowDownIcon } from 'components/utils/Icons';
import { ContextAwareToggle } from 'components/common/FAQsAccordion';
import { ArrowUpIcon } from 'components/utils/Icons';
import { CheckSquareIcon } from 'components/utils/Icons';
import { SchoolIcon } from 'components/utils/Icons';
import { CarIcon } from 'components/utils/Icons';
import { HospitalIcon } from 'components/utils/Icons';

const FLOOR_PLANS = [
  {
    name: 'Upper Floor',
    plan:
      'https://ballers-staging.s3.amazonaws.com/600e6414650f0000170ba5a0/07cf5fb0-7a52-11eb-b46b-c372b34a5c1f.pdf',
  },
  {
    name: 'Lower Floor',
    plan:
      'https://ballers-staging.s3.amazonaws.com/600e6414650f0000170ba5a0/07cf5fb0-7a52-11eb-b46b-c372b34a5c1f.pdf',
  },
  {
    name: 'Middle Floor',
    plan:
      'https://ballers-staging.s3.amazonaws.com/600e6414650f0000170ba5a0/07cf5fb0-7a52-11eb-b46b-c372b34a5c1f.pdf',
  },
];

const SinglePortfolio = ({ id }) => {
  const [toast, setToast] = useToast();
  const [property, setProperty] = React.useState(null);
  React.useEffect(() => {
    Axios.get(`${BASE_API_URL}/property/${id}`, {
      headers: {
        Authorization: getTokenFromStore(),
      },
    })
      .then(function (response) {
        const { status, data } = response;
        // handle success
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
        <OwnedPropertyCard property={property} toast={toast} />
      ) : (
        <NoContent text="Loading Property" Icon={<MyPropertyIcon />} />
      )}
    </BackendPage>
  );
};

const OwnedPropertyCard = ({ property, toast }) => (
  <div className="container-fluid">
    <Toast {...toast} />
    <Card className="card-container mt-4 h-100 property-holder__big">
      <PropertyImage property={property} />
      <div className="row mt-5">
        <div className="col-sm-12">
          <PropertyDescription property={property} />
        </div>
      </div>
      <FloorPlans />
      <Neighborhood />
    </Card>
    <PropertyMap mapLocation={property.mapLocation} />
  </div>
);

export const PropertyImage = ({ property }) => {
  const hideGallery = false;
  return (
    <>
      <div className="row">
        <div className={hideGallery ? 'col-sm-12' : 'col-sm-10'}>
          <Image
            defaultImage={PropertyPlaceholderImage}
            src={property.mainImage}
            name="Property Image"
            className="img-fluid gallery-main-image property-img"
            watermark
          />
        </div>
        {hideGallery || <Gallery />}
      </div>
      <div className="text-right mt-4">
        <button className="btn btn-sm btn-secondary">Add Gallery Image</button>
      </div>
    </>
  );
};

const Gallery = () => (
  <div className="col-sm-2">
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
  </div>
);

export const PropertyDescription = ({ property }) => {
  const [showFloorPlansModal, setShowFloorPlansModal] = React.useState(false);
  const { userState } = React.useContext(UserContext);
  const [showDescription, setShowDescription] = React.useState(false);
  const DESCRIPTION_LENGTH = 600;
  const hideSomePropertyDescription =
    !showDescription && property.description.length > DESCRIPTION_LENGTH;
  console.log('property', property);

  return (
    <>
      <Modal
        title="Floor Plans"
        show={showFloorPlansModal}
        onHide={() => setShowFloorPlansModal(false)}
        showFooter={false}
        size="lg"
      >
        <Image
          src={property.floorPlans}
          name={property.name}
          options={{ h: 1000 }}
        />
      </Modal>

      <h3 className={`property-holder__big-title`}>{property.name}</h3>
      <h4 className="text-secondary property-spacing mb-3">
        {moneyFormatInNaira(property.price)}
      </h4>
      <p className="mb-2 text-muted">
        <MapPinIcon /> {getLocationFromAddress(property.address)}
      </p>

      <div className="property-info property-spacing">
        <span className="pr-3">
          <BedIcon /> {property.bedrooms}{' '}
          {Humanize.pluralize(property.bedrooms, 'bed')}
        </span>
        |{' '}
        <span className="px-3">
          <BathIcon /> {property.bathrooms}{' '}
          {Humanize.pluralize(property.bathrooms, 'bath')}
        </span>
        |
        <span className="pl-3">
          <ToiletIcon /> {property.toilets}{' '}
          {Humanize.pluralize(property.toilets, 'toilet')}
        </span>
      </div>

      <h5 className="mt-5">About Property</h5>
      <div className="position-relative">
        {hideSomePropertyDescription
          ? Humanize.truncate(property.description, DESCRIPTION_LENGTH, '...')
          : property.description}
        {hideSomePropertyDescription && (
          <div className="show-more-holder">
            <button
              className="btn btn-xs btn-dark btn-wide show-more-button"
              onClick={() => setShowDescription(true)}
            >
              Show All
            </button>
          </div>
        )}
      </div>

      <ul className="list-unstyled row mt-5">
        {property.features?.map((feature, index) => (
          <li className="col-sm-6" key={index}>
            <CheckSquareIcon /> {feature}
          </li>
        ))}
      </ul>

      {userState?.role === USER_TYPES.vendor ? (
        <Link
          className="btn btn-secondary"
          to={`/vendor/portfolios/edit/${property._id}`}
        >
          Edit Property
        </Link>
      ) : (
        <div>
          <h5 className="text-primary mt-4">
            <VendorIcon /> Agent: {property?.vendorInfo?.vendor?.companyName}{' '}
            <CertifyIcon />
          </h5>
          <div className="hero">
            <ol>
              <li>
                Do not make any upfront payment as inspection fee when visiting
                the property.
              </li>
              <li>
                When you find a property of your interest, make sure you ask
                appropriate questions before accepting your offer.
              </li>
              <li>
                All meetings with agents should be done in open locations.
              </li>
              <li>
                The agent is not a representative from Baller.ng neither does
                Baller.ng control the affairs of the agent as both parties are
                different entities.
              </li>
            </ol>
          </div>
        </div>
      )}
    </>
  );
};

export const FloorPlans = () =>
  FLOOR_PLANS.length > 0 && (
    <div>
      <h5 className="mt-5">Floor Plans</h5>
      <Accordion>
        {FLOOR_PLANS.map(({ name, plan }, index) => (
          <Card key={index + 1}>
            <Accordion.Toggle
              as={Card.Header}
              variant="link"
              eventKey={index + 1}
            >
              <ContextAwareToggle
                iconOpen={<ArrowUpIcon />}
                iconClose={<ArrowDownIcon />}
                eventKey={index + 1}
              >
                {name}
              </ContextAwareToggle>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={index + 1}>
              <Card.Body>
                <Image src={plan} alt={name} name={name} />
                {plan}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
      <button className="btn btn-secondary btn-sm mt-3">Add Floor Plan</button>
    </div>
  );

export const Neighborhood = () => (
  <>
    <h5 className="mt-5">The neighbourhood</h5>
    <div className="single__detail-features-nearby">
      <IconBox name="Schools" color="pink" Icon={<SchoolIcon />} />

      <ul className="list-unstyled">
        <li className="row">
          <p className="col-sm-4">British International School</p>
          <p className="col-sm-4 text-right">
            <MapPinIcon /> 20 km
          </p>
        </li>
      </ul>

      <IconBox
        name="Health and Medicals"
        color="blue"
        Icon={<HospitalIcon />}
      />
      <ul className="list-unstyled">
        <li className="row">
          <p className="col-sm-4">Reddington Hospital</p>
          <p className="col-sm-4 text-right">
            10 minutes <CarIcon />
          </p>
        </li>
        <li className="row">
          <p className="col-sm-4">Large Sales Pharmacy</p>
          <p className="col-sm-4 text-right">
            15 minutes <CarIcon />
          </p>
        </li>
        <li className="row">
          <p className="col-sm-4">Crystal Hospital</p>
          <p className="col-sm-4 text-right">
            30 minutes <CarIcon />
          </p>
        </li>
      </ul>
      <button className="btn btn-secondary btn-sm mt-3">
        Add Neighborhood
      </button>
    </div>
  </>
);

const IconBox = ({ name, color, Icon }) => (
  <div className="neighborhood-check icon-box">
    <span className={color}>{Icon}</span>
    {name}
  </div>
);

export const PropertyMap = ({ mapLocation }) =>
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
