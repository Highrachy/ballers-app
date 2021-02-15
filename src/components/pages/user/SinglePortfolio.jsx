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
  // CameraIcon,
  CheckIcon,
  DownloadIcon,
  MapPinIcon,
} from 'components/utils/Icons';
import { getTokenFromStore } from 'utils/localStorage';
import { scheduleTourSchema } from 'components/forms/schemas/propertySchema';
import { moneyFormatInNaira, getError } from 'utils/helpers';
import { MyPropertyIcon } from 'components/utils/Icons';
import DatePicker from 'components/forms/DatePicker';
import { Loading } from 'components/utils/LoadingItems';
import { getLongDate } from 'utils/date-helpers';
import { VisitationIcon } from 'components/utils/Icons';
import Image from 'components/utils/Image';

const SinglePortfolio = ({ id, assigned }) => {
  const [toast, setToast] = useToast();
  const [property, setProperty] = React.useState(null);
  console.log('property', property);
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
        <OwnedPropertyCard
          property={property}
          toast={toast}
          assigned={assigned}
        />
      ) : (
        <Loading text="Loading Property" Icon={<MyPropertyIcon />} />
      )}
    </BackendPage>
  );
};

const NOW = 50;

const OwnedPropertyCard = ({ assigned, property, toast }) => (
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
            {assigned ? (
              <AssignedPropertySidebar />
            ) : (
              <PropertySidebar
                propertyId={property._id}
                visitationInfo={property?.visitationInfo}
                enquiryInfo={property?.enquiryInfo}
              />
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
    <div className="col-sm-12">
      <img
        src={property?.mainImage || PropertyPlaceholderImage}
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

const PropertyDescription = ({ property }) => {
  const [showFloorPlansModal, setShowFloorPlansModal] = React.useState(false);

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
      <h5 className="mb-4">
        <span className="text-secondary">
          <MapPinIcon />
        </span>{' '}
        {property.address.street1}
      </h5>
      <div className="row">
        <div className="col-sm-4 col-6">
          <small>Property Value</small>
          <h5>{moneyFormatInNaira(property.price)}</h5>
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

      <h5 className="mt-5">Vendor</h5>
      <img
        alt={property?.vendorInfo?.vendor?.companyName || ''}
        className="img-fluid img-small"
        src={property?.vendorInfo?.vendor?.companyLogo}
        title={property?.vendorInfo?.vendor?.companyName}
      />

      <h5 className="mt-5">About Property</h5>
      <p className="">{property.description}</p>

      <div className="my-5">
        <button
          onClick={() => setShowFloorPlansModal(false)}
          className="btn-link icon-box"
        >
          View floor plans{' '}
          <span className="d-inline-block ml-2">
            <DownloadIcon />
          </span>
        </button>
      </div>
    </>
  );
};

const AssignedPropertySidebar = () => {
  const initiatePayment = () => {
    Axios.post(
      `${BASE_API_URL}/payment/initiate`,
      {
        amount: '100000',
        propertyId: '5f5e8e7576fca200172adf6f',
        offerId: '5f7183398d65710017cfbd1e',
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
      <h5 className="text-center my-3">14th October 2020</h5>

      <button className="btn btn-block btn-secondary" onClick={initiatePayment}>
        Make Payment
      </button>
      <Link to="/users/transaction" className="small text-center mt-3">
        View Transaction History
      </Link>
    </Card>
  );
};

const PropertySidebar = ({ propertyId, visitationInfo, enquiryInfo }) => {
  console.log('visitationInfo', visitationInfo);
  const [showRequestVisitForm, setShowRequestVisitForm] = React.useState(false);
  const [showTitleDocument, setShowTitleDocument] = React.useState(false);
  const userHasScheduledVisit = visitationInfo?.length > 0;
  const userHasPreviousEnquiry = !!enquiryInfo;

  return (
    <>
      <Modal
        title="Schedule visit"
        show={showRequestVisitForm}
        onHide={() => setShowRequestVisitForm(false)}
        showFooter={false}
      >
        {userHasScheduledVisit ? (
          <>
            <table className="table table-hover table-borderless">
              <tr>
                <td>Name </td>
                <td>{visitationInfo[0].visitorName}</td>
              </tr>
              <tr>
                <td>Email </td>
                <td>{visitationInfo[0].visitorEmail}</td>
              </tr>
              <tr>
                <td>Phone </td>
                <td>{visitationInfo[0].visitorPhone}</td>
              </tr>
              <tr>
                <td>Visit Date </td>
                <td>{getLongDate(visitationInfo[0].visitDate)}</td>
              </tr>
            </table>
          </>
        ) : (
          <ScheduleVisitForm
            hideForm={() => setShowRequestVisitForm(false)}
            propertyId={propertyId}
          />
        )}
      </Modal>
      <Card className="card-container property-holder bg-gray">
        <h5>Interested in this property?</h5>

        <p className="">
          {userHasPreviousEnquiry
            ? 'You already made previous enquiries'
            : 'Kindly proceed with property acquisition'}
        </p>
        <Link
          to={`/user/property/enquiry/${propertyId}`}
          className="btn btn-block btn-secondary my-3"
        >
          {userHasPreviousEnquiry ? 'Make Another Enquiry' : 'Proceed'}
        </Link>
      </Card>

      {userHasScheduledVisit ? (
        <>
          <h5 className="header-smaller">You have an upcoming visit</h5>
          <Card
            className="card-container property-holder bg-gray card-link"
            onClick={() => setShowRequestVisitForm(true)}
          >
            <p className="mr-4">
              Your visitation date is on
              <br />{' '}
              <strong className="text-danger">
                {getLongDate(visitationInfo[0].visitDate)}
              </strong>
            </p>
            <div className="circle-icon">
              <VisitationIcon />
            </div>
          </Card>
        </>
      ) : (
        <>
          <h5 className="header-smaller">Schedule a tour</h5>
          <Card
            className="card-container property-holder bg-gray card-link"
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
        </>
      )}

      <h5 className="header-smaller">View title document</h5>
      <Modal
        title="Title Document"
        show={showTitleDocument}
        onHide={() => setShowTitleDocument(false)}
        showFooter={false}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed
        lectus vestibulum mattis ullamcorper. Cras adipiscing enim eu turpis
        egestas. Egestas diam in arcu cursus euismod quis viverra nibh.
        Porttitor lacus luctus accumsan tortor posuere ac ut. Eget lorem dolor
        sed viverra ipsum nunc aliquet. Lectus urna duis convallis convallis.
        Mattis aliquam faucibus purus in massa tempor. Dolor magna eget est
        lorem ipsum dolor sit amet. Quisque sagittis purus sit amet volutpat.
        Neque egestas congue quisque egestas diam in arcu. Magna fermentum
        iaculis eu non diam. Mauris vitae ultricies leo integer malesuada nunc
        vel risus. Malesuada fames ac turpis egestas sed tempus urna et.
      </Modal>
      <Card
        className="card-container property-holder bg-gray card-link"
        onClick={() => setShowTitleDocument(true)}
      >
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
            const payload = {
              propertyId,
              ...values,
              visitDate: values.visitDate.date || values.visitDate,
            };

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
                  hideForm();
                  actions.setSubmitting(false);
                  actions.resetForm();
                }
              })
              .catch(function (error) {
                setToast({
                  message: getError(error),
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

              <DatePicker
                label="Visitation Date"
                name="visitDate"
                minDate={new Date()}
                placeholder="Visit Date"
              />
              <Button
                className="btn-secondary mt-4"
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                Schedule
              </Button>
              <DisplayFormikState {...props} showAll />
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default SinglePortfolio;
