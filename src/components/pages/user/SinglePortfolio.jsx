import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { Card, ProgressBar } from 'react-bootstrap';
import { Link } from '@reach/router';
import { BASE_API_URL } from 'utils/constants';
import Modal from 'components/common/Modal';
import Toast, { useToast } from 'components/utils/Toast';
import Axios from 'axios';
import { RightArrowIcon } from 'components/utils/Icons';
import { getTokenFromStore } from 'utils/localStorage';
import { MyPropertyIcon } from 'components/utils/Icons';
import { Loading } from 'components/utils/LoadingItems';
import { getLongDate } from 'utils/date-helpers';
import { VisitationIcon } from 'components/utils/Icons';
import { PropertyImage } from '../shared/SinglePortfolio';
import { PropertyDescription } from '../shared/SinglePortfolio';
import { Neighborhood } from '../shared/SinglePortfolio';
import { PropertyMap } from '../shared/SinglePortfolio';
import { getError } from 'utils/helpers';
import { CancelVisitForm } from './ProcessVisitation';
import { RescheduleVisitForm } from './ProcessVisitation';
import { ScheduleVisitForm } from './ProcessVisitation';

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
      <Toast {...toast} showToastOnly />
      {property ? (
        <OwnedPropertyCard
          property={property}
          setToast={setToast}
          assigned={assigned}
        />
      ) : (
        <Loading text="Loading Property" Icon={<MyPropertyIcon />} />
      )}
    </BackendPage>
  );
};

const NOW = 50;

const OwnedPropertyCard = ({ assigned, property, setToast }) => (
  <div className="container-fluid">
    <Card className="card-container mt-4 h-100 property-holder__big">
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
                setToast={setToast}
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

const PropertySidebar = ({
  propertyId,
  visitationInfo,
  enquiryInfo,
  setToast,
}) => {
  const [showRequestVisitForm, setShowRequestVisitForm] = React.useState(false);
  const [showTitleDocument, setShowTitleDocument] = React.useState(false);
  const userHasScheduledVisit =
    visitationInfo?.length > 0 &&
    visitationInfo?.[visitationInfo.length - 1].status === 'Pending';
  const userHasPreviousEnquiry = !!enquiryInfo;
  const [showReschedule, setShowReschedule] = React.useState(false);
  const [showCancelModal, setShowCancelModal] = React.useState(false);
  const alreadyVisitedProperty = visitationInfo?.some(
    (visit) => visit.status === 'Resolved'
  );

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
            {/* show cancel visitation */}
            {showCancelModal && (
              <>
                <h6>Cancel Modal Form</h6>

                <CancelVisitForm
                  visitationInfo={visitationInfo?.[visitationInfo.length - 1]}
                  hideForm={() => setShowRequestVisitForm(false)}
                  setToast={setToast}
                />

                <div className="text-right">
                  <button
                    onClick={() => setShowCancelModal(false)}
                    className="btn btn-danger btn-sm mt-5"
                  >
                    Back
                  </button>
                </div>
              </>
            )}

            {/* reschedule visitation */}
            {showReschedule && !showCancelModal && (
              <>
                <h6>Reschedule Form</h6>
                <RescheduleVisitForm
                  visitationInfo={visitationInfo?.[visitationInfo.length - 1]}
                  hideForm={() => setShowRequestVisitForm(false)}
                  setToast={setToast}
                />
                <div className="text-right">
                  <button
                    onClick={() => setShowReschedule(false)}
                    className="btn btn-danger btn-sm mt-5"
                  >
                    Back
                  </button>
                </div>
              </>
            )}

            {/* show visitation information */}
            {!showReschedule && !showCancelModal && (
              <>
                <table className="table table-hover table-borderless">
                  <tbody>
                    <tr>
                      <td>Name </td>
                      <td>
                        {
                          visitationInfo?.[visitationInfo.length - 1]
                            .visitorName
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Email </td>
                      <td>
                        {
                          visitationInfo?.[visitationInfo.length - 1]
                            .visitorEmail
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Phone </td>
                      <td>
                        {
                          visitationInfo?.[visitationInfo.length - 1]
                            .visitorPhone
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Visit Date </td>
                      <td>
                        {getLongDate(
                          visitationInfo?.[visitationInfo.length - 1].visitDate
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button
                  onClick={() => setShowReschedule(true)}
                  className="btn btn-sm btn-primary"
                >
                  Reschedule Visitation
                </button>
                &nbsp;&nbsp;
                <button
                  onClick={() => setShowCancelModal(true)}
                  className="btn btn-sm btn-secondary"
                >
                  Cancel Visitation
                </button>
                &nbsp;&nbsp;
                <button
                  onClick={() => setShowRequestVisitForm(false)}
                  className="btn btn-sm btn-danger"
                >
                  Close Modal
                </button>
              </>
            )}
          </>
        ) : (
          <ScheduleVisitForm
            hideForm={() => setShowRequestVisitForm(false)}
            propertyId={propertyId}
            setToast={setToast}
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
                {getLongDate(
                  visitationInfo?.[visitationInfo.length - 1].visitDate
                )}
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
            {alreadyVisitedProperty ? (
              <p className="mr-4">
                You have already visited this property
                <br /> Request another visit.
              </p>
            ) : (
              <p className="mr-4">
                Want to come check the property?
                <br /> Request a visit.
              </p>
            )}
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

export default SinglePortfolio;
