import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { Card } from 'react-bootstrap';
import Map from 'components/common/Map';
import { USER_TYPES } from 'utils/constants';
import { useToast } from 'components/utils/Toast';
import { moneyFormatInNaira, getLocationFromAddress } from 'utils/helpers';
import Image from 'components/utils/Image';
import PropertyPlaceholderImage from 'assets/img/placeholder/property.png';
import { Link } from '@reach/router';
import { BathIcon } from 'components/utils/Icons';
import { ToiletIcon } from 'components/utils/Icons';
import { BedIcon } from 'components/utils/Icons';
import Humanize from 'humanize-plus';
import { CheckCircleIcon } from 'components/utils/Icons';
import { GalleryList } from './Gallery';
import { LinkSeparator } from 'components/common/Helpers';
import { useCurrentRole } from 'hooks/useUser';
import { TextSeparator } from 'components/common/Helpers';
import { Spacing } from 'components/common/Helpers';
import { FloorPlansList } from './FloorPlans';
import { AddFloorPlans } from './FloorPlans';
import { AddNeighborhood } from './Neighborhood';
import { NeighborhoodList } from './Neighborhood';
import { useGetQuery } from 'hooks/useQuery';
import { PortfolioIcon } from 'components/utils/Icons';
import { API_ENDPOINT } from 'utils/URL';
import { ContentLoader } from 'components/utils/LoadingItems';
import Button from 'components/forms/Button';

const pageOptions = {
  key: 'property',
  pageName: 'Property',
};

const SingleProperty = ({ id, Sidebar }) => {
  const [toast, setToast] = useToast();
  const [propertyQuery, property, setProperty] = useGetQuery({
    key: pageOptions.key,
    name: [pageOptions.key, id],
    setToast,
    endpoint: API_ENDPOINT.getOneProperty(id),
    refresh: true,
  });

  return (
    <BackendPage>
      <ContentLoader
        hasContent={!!property}
        Icon={<PortfolioIcon />}
        query={propertyQuery}
        name={pageOptions.pageName}
        toast={toast}
      >
        <OwnedPropertyCard
          property={property}
          setToast={setToast}
          setProperty={setProperty}
          Sidebar={Sidebar}
        />
      </ContentLoader>
    </BackendPage>
  );
};

export const OwnedPropertyCard = ({
  property,
  setToast,
  setProperty,
  Sidebar,
}) => (
  <div className="container-fluid">
    <Card className="card-container mt-4 h-100 property-holder__big">
      <PropertyImage property={property} />
      {useCurrentRole().role === USER_TYPES.vendor && (
        <ManagePropertyLink
          property={property}
          setToast={setToast}
          setProperty={setProperty}
        />
      )}
      <div className="row mt-5">
        <div className={Sidebar ? 'col-sm-7' : 'col-sm-12'}>
          <PropertyDescription property={property} />
        </div>
        {Sidebar && <div className="col-sm-5">{Sidebar}</div>}
      </div>
      <FloorPlansList
        property={property}
        setToast={setToast}
        setProperty={setProperty}
      />
      <NeighborhoodList
        property={property}
        setToast={setToast}
        setProperty={setProperty}
      />
    </Card>
    <PropertyMap mapLocation={property.mapLocation} />
    {useCurrentRole().role === USER_TYPES.user && (
      <div className="text-right mt-5">
        <Button className="btn btn-xs btn-dark btn-wide">
          Report this Property
        </Button>
      </div>
    )}
  </div>
);

const ManagePropertyLink = ({ property, setToast, setProperty }) => (
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
    <LinkSeparator />
    <AddFloorPlans
      className="text-link text-muted"
      property={property}
      setToast={setToast}
      setProperty={setProperty}
    />
    <LinkSeparator />
    <AddNeighborhood
      className="text-link text-muted"
      property={property}
      setToast={setToast}
      setProperty={setProperty}
    />
  </section>
);

export const PropertyImage = ({ property, hideGallery }) => {
  const showGallery = property?.gallery?.length >= 0 && !hideGallery;
  return (
    <>
      <div className="row">
        <div className={!showGallery ? 'col-sm-12' : 'col-sm-10'}>
          <Image
            defaultImage={PropertyPlaceholderImage}
            src={property.mainImage}
            name="Property Image"
            className="img-fluid gallery-main-image property-img"
            watermark
          />
        </div>
        {showGallery && <GalleryList property={property} />}
      </div>
    </>
  );
};

export const PropertyDescription = ({ property }) => {
  const [showDescription, setShowDescription] = React.useState(false);
  const DESCRIPTION_LENGTH = 600;
  const hideSomePropertyDescription =
    !showDescription && property.description.length > DESCRIPTION_LENGTH;

  return (
    <>
      <PropertyHeader property={property} />

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
      <ul className="list-unstyled row lh-2">
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
            <ol className="ml-n3">
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

export const PropertyHeader = ({ property }) => (
  <>
    {' '}
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
  </>
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

export default SingleProperty;
