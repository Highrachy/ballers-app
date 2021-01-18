import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { BASE_API_URL, USER_TYPES } from 'utils/constants';
import Toast, { useToast } from 'components/utils/Toast';
import Axios from 'axios';
import { getTokenFromStore } from 'utils/localStorage';
import NoContent from 'components/utils/NoContent';
import {
  getError,
  getFormattedAddress,
  statusIsSuccessful,
} from 'utils/helpers';
import { UsersIcon } from 'components/utils/Icons';
import CardTableSection from 'components/common/CardTableSection';
import { ShowDirectorsTable } from '../vendor/setup/Signatories';
import { Card } from 'react-bootstrap';
import Button from 'components/forms/Button';
import { Formik, Form } from 'formik';
import { commentSchema } from 'components/forms/schemas/vendorSchema';
import {
  DisplayFormikState,
  setInitialValues,
} from 'components/forms/form-helper';
import { createSchema } from 'components/forms/schemas/schema-helpers';
import Textarea from 'components/forms/Textarea';
import { VENDOR_STEPS } from 'utils/constants';
import Image from 'components/utils/Image';
import ProfileAvatar from 'assets/img/avatar/profile.png';
import Modal from 'components/common/Modal';

const SingleUser = ({ id }) => {
  const [toast, setToast] = useToast();
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    Axios.get(`${BASE_API_URL}/user/${id}`, {
      headers: {
        Authorization: getTokenFromStore(),
      },
    })
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setUser(data.user);
          console.log('data.user', data.user);
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
      <div className="container-fluid">
        {user ? (
          <UserInfoCard
            vendorId={id}
            user={user}
            setUser={setUser}
            toast={toast}
            setToast={setToast}
          />
        ) : (
          <NoContent text="Loading User" Icon={<UsersIcon />} />
        )}
      </div>
    </BackendPage>
  );
};

// add comment form should be in each tab
// Add upgrade and downgrade editor here

// change documents name from
// better colour alignment of remaining steps

const UserInfoCard = ({ user, setUser, toast, setToast, vendorId }) => {
  const [loadingVerification, setLoadingVerification] = React.useState(false);
  const verifyVendor = () => {
    setLoadingVerification(true);
    const payload = { vendorId };
    Axios.put(`${BASE_API_URL}/user/vendor/verify`, payload, {
      headers: { Authorization: getTokenFromStore() },
    })
      .then(function (response) {
        const { status } = response;
        if (statusIsSuccessful(status)) {
          setToast({
            type: 'success',
            message: `Vendor has been successfully verified`,
          });
          user.vendor.verified = true;
          setUser(user);
          setLoadingVerification(false);
        }
      })
      .catch(function (error) {
        setToast({
          message: getError(error),
        });
        setLoadingVerification(false);
      });
  };
  const certifyVendor = () => {
    setLoadingVerification(true);
    const payload = { vendorId };
    Axios.put(`${BASE_API_URL}/user/vendor/certify`, payload, {
      headers: { Authorization: getTokenFromStore() },
    })
      .then(function (response) {
        const { status } = response;
        if (statusIsSuccessful(status)) {
          setToast({
            type: 'success',
            message: `Vendor has been successfully certified`,
          });
          user.vendor.verified = true;
          setUser(user);
          setLoadingVerification(false);
        }
      })
      .catch(function (error) {
        setToast({
          message: getError(error),
        });
        setLoadingVerification(false);
      });
  };

  const StepAction = ({ step }) => {
    const [hideForm, setHideForm] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const approveVerificationStep = () => {
      setLoading(true);
      const payload = { vendorId, step };
      Axios.put(`${BASE_API_URL}/user/vendor/verify/step`, payload, {
        headers: { Authorization: getTokenFromStore() },
      })
        .then(function (response) {
          const { status } = response;
          if (statusIsSuccessful(status)) {
            setToast({
              type: 'success',
              message: `${VENDOR_STEPS[step]} has been successfully verified`,
            });
            user.vendor.verification[step].status = 'Verified';
            setUser(user);
            setLoading(false);
          }
        })
        .catch(function (error) {
          setToast({
            message: getError(error),
          });
          setLoading(false);
        });
    };
    return (
      <Formik
        enableReinitialize={true}
        initialValues={setInitialValues(commentSchema)}
        onSubmit={({ comment }, actions) => {
          const payload = { vendorId, step, comment };
          Axios.put(`${BASE_API_URL}/user/vendor/verify/comment`, payload, {
            headers: { Authorization: getTokenFromStore() },
          })
            .then(function (response) {
              const { status } = response;
              if (statusIsSuccessful(status)) {
                setToast({
                  type: 'success',
                  message: `Your comment has been successfully added`,
                });
                setHideForm(true);
                user.vendor.verification[step].comments.push({ comment });
                setUser(user);
                actions.setSubmitting(false);
                actions.resetForm();
              }
            })
            .catch(function (error) {
              setToast({
                message: getError(error),
              });
              setHideForm(true);
              actions.setSubmitting(false);
            });
        }}
        validationSchema={createSchema(commentSchema)}
      >
        {({ isSubmitting, handleSubmit, ...props }) => {
          if (user.vendor?.verification[step]?.status === 'Verified') {
            return null;
          }
          return (
            <Form>
              <p>
                <strong>
                  Status: {user.vendor?.verification[step]?.status}
                </strong>
              </p>

              {user.vendor?.verification[step]?.comments.length > 0 && (
                <section className="my-4">
                  <h6>Comments</h6>
                  {user.vendor?.verification[step].comments.map(
                    ({ comment }, index) => (
                      <p className="speech-bubble">{comment}</p>
                    )
                  )}
                </section>
              )}
              {hideForm ? (
                <>
                  <button
                    onClick={() => {
                      setHideForm(false);
                    }}
                    className="btn btn-sm btn-primary"
                  >
                    Add Comment
                  </button>
                  &nbsp; &nbsp; &nbsp;
                  <Button
                    loading={loading}
                    onClick={approveVerificationStep}
                    className="btn btn-sm btn-secondary"
                  >
                    Approve {VENDOR_STEPS[step]}
                  </Button>{' '}
                </>
              ) : (
                <>
                  <Textarea label="Comment" name="comment" />
                  <Button
                    color="primary"
                    className="btn-primary btn-sm mt-3"
                    loading={isSubmitting}
                    onClick={handleSubmit}
                  >
                    Add Comment
                  </Button>{' '}
                  &nbsp; &nbsp; &nbsp;
                  <button
                    onClick={() => {
                      setHideForm(true);
                    }}
                    className="btn btn-sm btn-danger mt-3"
                  >
                    Close Comment
                  </button>
                  <DisplayFormikState {...props} showAll />
                </>
              )}
            </Form>
          );
        }}
      </Formik>
    );
  };

  const VENDOR_STEPS_KEY = Object.keys(VENDOR_STEPS);
  const isVendor = user.role === USER_TYPES.vendor;

  const [showVerifyVendorModal, setVerifyVendorModal] = React.useState(false);

  return (
    <>
      <Toast {...toast} showToastOnly />
      <CardTableSection name="User Information">
        <tr>
          <td colSpan="5" className="text-center">
            <Image
              bordered
              rounded
              alt={user.firstName}
              className={'img-fluid avatar--large'}
              src={user.profileImage?.url || ProfileAvatar}
              name={user.firstName}
            />
          </td>
        </tr>
        {isVendor ? (
          <>
            <tr>
              <td>
                <strong>Company Logo</strong>
              </td>
              <td colSpan="4">
                {user.vendor?.companyLogo && (
                  <img
                    alt={user.firstName}
                    className="img-fluid dashboard-top-nav__company-logo mb-3"
                    src={user.vendor.companyLogo}
                    title={user.firstName}
                  />
                )}
              </td>
            </tr>

            <tr>
              <td>
                <strong>Company Name</strong>
              </td>
              <td colSpan="4">{user.vendor?.companyName}</td>
            </tr>
          </>
        ) : (
          <tr>
            <td>
              <strong>First Name</strong>
            </td>
            <td>{user.firstName}</td>
            <td>&nbsp;</td>
            <td>
              <strong>Last Name</strong>
            </td>
            <td>{user.lastName}</td>
          </tr>
        )}
        <tr>
          <td>
            <strong>Email</strong>
          </td>
          <td>{user.email}</td>
          <td></td>
          <td>
            <strong>Phone</strong>
          </td>
          <td>
            {user.phone} <br /> {user.phone2}
          </td>
        </tr>

        {isVendor && (
          <tr>
            <td>
              <strong>Entity Type</strong>
            </td>
            <td>{user.vendor?.entity}</td>
            <td></td>
            <td>
              <strong>Redan Number</strong>
            </td>
            <td>{user.vendor?.redanNumber}</td>
          </tr>
        )}

        <tr>
          <td>
            <strong>Address</strong>
          </td>
          <td colSpan="4">
            {user.address && getFormattedAddress(user.address)}
          </td>
        </tr>

        {isVendor && (
          <tr>
            <td colSpan="5">
              <StepAction step={VENDOR_STEPS_KEY[0]} />
            </td>
          </tr>
        )}
      </CardTableSection>

      {isVendor && (
        <>
          <CardTableSection name="Bank Information">
            <tr>
              <td>
                <strong>Account Name</strong>
              </td>
              <td>{user.vendor?.bankInfo?.accountName}</td>
            </tr>
            <tr>
              <td>
                <strong>Bank Name</strong>
              </td>
              <td>{user.vendor?.bankInfo?.bankName}</td>
            </tr>
            <tr>
              <td>
                <strong>Account Number</strong>
              </td>
              <td>{user.vendor?.bankInfo?.accountNumber}</td>
            </tr>
            {user.vendor?.bankInfo?.bankName && (
              <tr>
                <td colSpan="5">
                  <StepAction step={VENDOR_STEPS_KEY[1]} />
                </td>
              </tr>
            )}
          </CardTableSection>
          <Card className="card-container mb-5">
            <h5 className="mb-4">Directors / Signatories</h5>
            <ShowDirectorsTable
              directors={user.vendor?.directors}
              moveToNextStep={null}
            />

            {user.vendor?.directors[0] && (
              <StepAction step={VENDOR_STEPS_KEY[2]} />
            )}
          </Card>

          <CardTableSection name="Certificates">
            <tr>
              <td>
                <strong>Identification</strong>
              </td>
              <td>
                <img
                  alt="Tax Certificate"
                  className="img-fluid mb-3"
                  src={
                    user.vendor?.identification &&
                    user.vendor?.identification.url
                  }
                  title="Tax Certificate"
                />
                {user.vendor?.identification &&
                  user.vendor?.identification.type}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Tax Certificate</strong>
              </td>
              <td>
                <img
                  alt="Tax Certificate"
                  className="img-fluid mb-3"
                  src={user.vendor?.taxCertificate}
                  title="Tax Certificate"
                />
              </td>
            </tr>
            {((user.vendor?.identification &&
              user.vendor?.identification?.url) ||
              user.vendor?.taxCertificate) && (
              <tr>
                <td colSpan="5">
                  <StepAction step={VENDOR_STEPS_KEY[3]} />
                </td>
              </tr>
            )}
          </CardTableSection>

          {!user.vendor?.verified &&
            user.vendor?.verification?.companyInfo?.status === 'Verified' &&
            user.vendor?.verification?.bankDetails?.status === 'Verified' &&
            user.vendor?.verification?.directorInfo?.status === 'Verified' &&
            user.vendor?.verification?.documentUpload?.status ===
              'Verified' && (
              <Button
                loading={loadingVerification}
                onClick={verifyVendor}
                className="btn btn-secondary"
              >
                Verify Vendor
              </Button>
            )}
          {user.vendor?.verified && !user.vendor?.certified && (
            <Button
              loading={loadingVerification}
              onClick={() => setVerifyVendorModal(true)}
              className="btn btn-secondary"
            >
              Certify Vendor
            </Button>
          )}

          {/*  Modals */}
          <Modal
            title="Verify Vendor"
            show={showVerifyVendorModal}
            onHide={() => setVerifyVendorModal(false)}
            showFooter={false}
          >
            <section className="row">
              <div className="col-md-12 my-3 text-center">
                <h5 className="my-2">
                  Are you sure you want to{' '}
                  {user.vendor?.verified ? 'certify' : 'verify'} this vendor.
                </h5>
                <button
                  className="btn btn-secondary mb-5"
                  onClick={user.vendor?.verified ? verifyVendor : certifyVendor}
                >
                  Verify Vendor
                </button>
              </div>
            </section>
          </Modal>
        </>
      )}
    </>
  );
};

export default SingleUser;
