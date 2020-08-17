import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { Card, ProgressBar } from 'react-bootstrap';
import { Link } from '@reach/router';
import PropertyPlaceholderImage from 'assets/img/placeholder/property-holder.jpg';
import Map from 'components/common/Map';
import { BASE_API_URL } from 'utils/constants';
import Modal from 'components/common/Modal';
import Toast, { useToast } from 'components/utils/Toast';
import Axios from 'axios';
import Input from 'components/forms/Input';
import {
  setInitialValues,
  DisplayFormikState,
} from 'components/forms/form-helper';
import Button from 'components/forms/Button';
import { Formik, Form } from 'formik';
import { createSchema } from 'components/forms/schemas/schema-helpers';
import {
  RightArrowIcon,
  CameraIcon,
  CheckIcon,
  DownloadIcon,
  MapPinIcon,
} from 'components/utils/Icons';
import { getTokenFromStore } from 'utils/localStorage';
import NoContent from 'components/utils/NoContent';
import { scheduleTourSchema } from 'components/forms/schemas/propertySchema';

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
          console.log('data.property', data.property);
        }
      })
      .catch(function (error) {
        console.log('error.response', error.response);
        // setToast({
        //   message: error.response.data.message,
        // });
      });
  }, [setToast, id]);
  return (
    <BackendPage>
      {property ? (
        <OwnedPropertyCard property={property} toast={toast} />
      ) : (
        <NoContent text="Loading Property" />
      )}
    </BackendPage>
  );
};

const NOW = 50;

const OwnedPropertyCard = ({ property, toast }) => (
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
          <PropertyDescription property={property} />
        </div>

        {/* Side Card */}
        <div className="col-sm-5">
          <aside className="ml-md-5">
            {<PropertySidebar propertyId={property._id} /> || (
              <AssignedPropertySidebar />
            )}
          </aside>
        </div>
      </div>
      <Neighborhood />
    </Card>
    <PropertyMap mapLocation={property.mapLocation} />
  </div>
);

const PropertyImage = ({ property }) => (
  <div className="row">
    <div className="col-sm-10">
      <img
        src={property.mainImage}
        alt="Property"
        className="img-fluid gallery-main-image  property-img"
      />
    </div>
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
  </div>
);

const PropertyDescription = ({ property }) => (
  <>
    <h5 className="mb-4">
      <span className="text-secondary">
        <MapPinIcon />
      </span>{' '}
      {property.location}
    </h5>
    <div className="row">
      <div className="col-sm-4 col-6">
        <small>Property Value</small>
        <h5>N {property.price}</h5>
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

    <div className="my-5">
      <a href="/" className="btn-link icon-box">
        View floor plans{' '}
        <span className="d-inline-block ml-2">
          <DownloadIcon />
        </span>
      </a>
    </div>
  </>
);

const AssignedPropertySidebar = () => (
  <Card className="card-container property-holder">
    <table className="table table-sm table-borderless">
      <tbody>
        <tr>
          <td>
            <small className="ml-n1">Amount Contributed</small>{' '}
          </td>
          <td>
            <h5>N35,000,000</h5>
          </td>
        </tr>
        <tr>
          <td>
            <small className="ml-n1">Equity Contributed</small>{' '}
          </td>
          <td>
            <h5>N35,000,000</h5>
          </td>
        </tr>
      </tbody>
    </table>

    <small className="">Contribution Progress</small>

    <div className="row">
      <div className="col-sm-12">
        <small style={{ paddingLeft: `${NOW - 5}%` }}>{NOW}%</small>
        <ProgressBar variant="success" now={NOW} label={`${NOW}%`} srOnly />
      </div>
    </div>

    <hr className="my-4" />

    <small className="">Next Payment</small>
    <h5 className="text-center my-3">14th September 2020</h5>

    <button className="btn btn-block btn-secondary">Make Payment</button>
    <Link to="/users/transaction" className="small text-center mt-3">
      View Transaction History
    </Link>
  </Card>
);

const PropertySidebar = ({ propertyId }) => {
  const [showRequestVisitForm, setShowRequestVisitForm] = React.useState(false);

  return (
    <>
      <Modal
        title="Schedule visit"
        show={showRequestVisitForm}
        onHide={() => setShowRequestVisitForm(false)}
        showFooter={false}
      >
        <ScheduleVisitForm
          hideForm={() => setShowRequestVisitForm(false)}
          propertyId={propertyId}
        />
      </Modal>
      <Card className="card-container property-holder bg-gray">
        <h5>Interested in this property?</h5>

        <p className="">Kindly proceed with property acquisition</p>
        <Link
          to="/user/property/enquiry/1"
          className="btn btn-block btn-secondary my-3"
        >
          Proceed
        </Link>
      </Card>

      <h5 className="text-smaller">Schedule a tour</h5>
      <Card
        className="card-container property-holder bg-gray"
        onClick={() => setShowRequestVisitForm(true)}
      >
        <p className="mr-4">
          Want to come check the property?
          <br /> Request a visit.
        </p>
        <div className="circle-icon">
          <RightArrowIcon />
        </div>
      </Card>

      <h5 className="text-smaller">Request title document</h5>
      <Card className="card-container property-holder bg-gray">
        <p className="mr-4">Request a copy of the property document.</p>
        <div className="circle-icon bg-green">
          <RightArrowIcon />
        </div>
      </Card>
    </>
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

const ScheduleVisitForm = ({ propertyId, hideForm }) => {
  const [toast, setToast] = useToast();
  return (
    <section className="row">
      <div className="col-md-10">
        <Formik
          initialValues={setInitialValues(scheduleTourSchema)}
          onSubmit={(values, actions) => {
            const payload = { propertyId, ...values };

            Axios.post(`${BASE_API_URL}/visitation/schedule`, payload, {
              headers: { Authorization: getTokenFromStore() },
            })
              .then(function (response) {
                const { status } = response;
                if (status === 201) {
                  setToast({
                    type: 'success',
                    message: `Your visitation has been scheduled. We will contact you within 24 hours).`,
                  });
                  actions.setSubmitting(false);
                  actions.resetForm();
                }
              })
              .catch(function (error) {
                setToast({
                  message: error.response.data.error,
                });
                actions.setSubmitting(false);
              });
          }}
          validationSchema={createSchema(scheduleTourSchema)}
        >
          {({ isSubmitting, handleSubmit, ...props }) => (
            <Form>
              <Toast {...toast} />
              <Input
                isValidMessage="Name looks good"
                label="Name"
                name="visitorName"
                placeholder="Name"
              />
              <Input
                isValidMessage="Email address seems valid"
                label="Email"
                name="visitorEmail"
                placeholder="Email Address"
              />
              <Input
                isValidMessage="Phone number looks good"
                label="Phone"
                name="visitorPhone"
                placeholder="Phone"
              />
              <Button
                className="btn-secondary mt-4"
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                Schedule
              </Button>
              <DisplayFormikState {...props} hide showAll />
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default SinglePortfolio;