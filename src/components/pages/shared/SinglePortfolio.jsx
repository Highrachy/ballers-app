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
import { BathIcon } from 'components/utils/Icons';
import { ToiletIcon } from 'components/utils/Icons';
import { BedIcon } from 'components/utils/Icons';
import Humanize from 'humanize-plus';
import { Accordion } from 'react-bootstrap';
import { ArrowDownIcon } from 'components/utils/Icons';
import { ContextAwareToggle } from 'components/common/FAQsAccordion';
import { ArrowUpIcon } from 'components/utils/Icons';
import { CheckCircleIcon } from 'components/utils/Icons';
import { SchoolIcon } from 'components/utils/Icons';
import { CarIcon } from 'components/utils/Icons';
import { HospitalIcon } from 'components/utils/Icons';
import { GalleryList } from './Gallery';
import { LinkSeparator } from 'components/common/Helpers';
import { useCurrentRole } from 'hooks/useUser';
import { TextSeparator } from 'components/common/Helpers';
import { Spacing } from 'components/common/Helpers';

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
      {useCurrentRole().role === USER_TYPES.vendor && (
        <ManagePropertyLink property={property} />
      )}
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

const ManagePropertyLink = ({ property }) => (
  <section className="mt-3">
    <Link
      to={`/vendor/portfolios/edit/${property._id}`}
      className="text-link text-muted"
    >
      Edit Property
    </Link>
    <LinkSeparator />
    <Link
      to={`/vendor/gallery/${property._id}`}
      className="text-link  text-muted"
    >
      {property?.gallery?.length > 0 ? 'Edit Gallery' : 'Add Gallery'}
    </Link>
  </section>
);

export const PropertyImage = ({ property }) => {
  const hideGallery = !!property?.gallery?.lengh;
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
        {hideGallery || <GalleryList property={property} />}
      </div>
    </>
  );
};

export const PropertyDescription = ({ property }) => {
  const [showFloorPlansModal, setShowFloorPlansModal] = React.useState(false);
  const [showDescription, setShowDescription] = React.useState(false);
  const DESCRIPTION_LENGTH = 600;
  const hideSomePropertyDescription =
    !showDescription && property.description.length > DESCRIPTION_LENGTH;

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
      <h4 className="text-secondary mb-3">
        {moneyFormatInNaira(property.price)}
      </h4>
      <p className="mb-2 text-muted">
        {getLocationFromAddress(property.address)}
      </p>

      <div className="property-info-details">
        <span className="pr-3">
          <BedIcon /> <Spacing /> {property.bedrooms}{' '}
          {Humanize.pluralize(property.bedrooms, 'bed')}
        </span>
        <TextSeparator />
        <span className="px-3">
          <BathIcon /> <Spacing /> {property.bathrooms}{' '}
          {Humanize.pluralize(property.bathrooms, 'bath')}
        </span>
        <TextSeparator />
        <span className="pl-3">
          <ToiletIcon /> <Spacing /> {property.toilets}{' '}
          {Humanize.pluralize(property.toilets, 'toilet')}
        </span>
      </div>

      <h5 className="mt-5 header-smaller">About Property</h5>
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

      <h5 className="mt-5 header-smaller">Features</h5>
      <ul className="list-unstyled row">
        {property.features?.map((feature, index) => (
          <li className="col-sm-6" key={index}>
            <span className="text-secondary">
              <CheckCircleIcon /> &nbsp;
            </span>
            {feature}
          </li>
        ))}
      </ul>
      {useCurrentRole().role !== USER_TYPES.vendor && (
        <div className="mt-5">
          <div className="hero-holder">
            <h5 className="text-primary header-smaller">Important Notice</h5>
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
    <div className="property__floor-plans">
      <h5 className="mt-5 header-smaller mb-3">Floor Plans</h5>
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
                <p className="">
                  <a href={plan} className="text mt-3">
                    {plan}
                  </a>
                </p>
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
    <h5 className="mt-5 header-smaller">The neighbourhood</h5>
    <div className="single__detail-features-nearby">
      <IconBox name="Schools" color="pink" Icon={<SchoolIcon />} />

      <div className="row">
        <div className="col-md-8">
          <div className="list-neighbourhood">
            <ul className="list-unstyled">
              <li className="row">
                <p className="col-sm-8">British International School</p>
                <p className="col-sm-4 text-right">
                  <MapPinIcon /> <Spacing /> 20 km
                </p>
              </li>
              <li className="row">
                <p className="col-sm-8">British International School</p>
                <p className="col-sm-4 text-right">
                  <MapPinIcon /> <Spacing /> 20 km
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

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
