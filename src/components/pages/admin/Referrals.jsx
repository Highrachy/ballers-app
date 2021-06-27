import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import {
  USER_TYPES,
  VENDOR_IDENTIFICATION_TYPE,
  VENDOR_INFO_STATUS,
} from 'utils/constants';
import PaginatedContent from 'components/common/PaginatedContent';
import { Form, Formik } from 'formik';
import Select from 'components/forms/Select';
import BackendPage from 'components/layout/BackendPage';
import { API_ENDPOINT } from 'utils/URL';
import {
  booleanOptions,
  formatFilterBoolean,
  formatFilterString,
  getError,
  getReferralStatus,
  moneyFormatInNaira,
  objectToOptions,
  statusIsSuccessful,
  valuesToOptions,
} from 'utils/helpers';
import Input from 'components/forms/Input';
import Button from 'components/forms/Button';
import {
  DisplayFormikState,
  processFilterValues,
} from 'components/forms/form-helper';
import { ReferralsIcon } from 'components/utils/Icons';
import UserCard from 'components/common/UserCard';
import { useCurrentRole } from 'hooks/useUser';
import Modal from 'components/common/Modal';
import { Spacing } from 'components/common/Helpers';
import { SuccessIcon } from 'components/utils/Icons';
import { WarningIcon } from 'components/utils/Icons';
import { PropertyAvatar } from 'components/common/PropertyCard';
import Axios from 'axios';
import { BASE_API_URL } from 'utils/constants';
import { getTokenFromStore } from 'utils/localStorage';
import { refreshQuery } from 'hooks/useQuery';

const Referrals = () => (
  <BackendPage>
    <PaginatedContent
      endpoint={API_ENDPOINT.getAllReferrals()}
      initialFilter={{ sortBy: 'createdAt', sortDirection: 'desc' }}
      pageName="Referral"
      DataComponent={ReferralsRowList}
      FilterComponent={FilterForm}
      PageIcon={<ReferralsIcon />}
      queryName="referral"
    />
  </BackendPage>
);

const ReferralsRowList = ({ results, offset, setToast }) => {
  const [referral, setReferral] = React.useState(null);
  const [showRemitModal, setShowRemitModal] = React.useState(false);
  const [showDetailsModal, setShowDetailsModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const showTransactionDetailsModal = (referral) => {
    setReferral(referral);
    setShowDetailsModal(true);
  };

  const showRemitPaymentModal = () => {
    setShowRemitModal(true);
    setShowDetailsModal(false);
  };

  const remitPayment = () => {
    setLoading(true);
    Axios.put(
      `${BASE_API_URL}/referral/reward`,
      {
        referralId: referral._id,
      },
      {
        headers: { Authorization: getTokenFromStore() },
      }
    )
      .then(function (response) {
        const { status } = response;
        if (statusIsSuccessful(status)) {
          setToast({
            type: 'success',
            message: `Referral has been successfully rewarded`,
          });

          refreshQuery('referral', true);
          setLoading(false);
          setShowRemitModal(false);
        }
      })
      .catch(function (error) {
        setToast({
          message: getError(error),
        });
        setLoading(false);
      });
  };

  const requestForBankDetails = () => {
    setLoading(true);
    Axios.post(
      `${BASE_API_URL}/user/request-bank/${referral?.referrer?._id}`,
      {},
      {
        headers: { Authorization: getTokenFromStore() },
      }
    )
      .then(function (response) {
        const { status } = response;
        if (statusIsSuccessful(status)) {
          setToast({
            type: 'success',
            message: `Bank Account Has been Requested`,
          });
          setLoading(false);
          setShowDetailsModal(false);
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
    <div className="container-fluid">
      <Card>
        <div className="table-responsive">
          <table className="table table-border table-hover">
            <thead>
              <tr>
                <th>S/N</th>
                <th>Referred User</th>
                <th>Referred By</th>
                <th>Status</th>
                <th>Reward</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {results.map((referral, index) => (
                <UsersRow
                  key={index}
                  number={offset + index + 1}
                  showTransactionDetailsModal={showTransactionDetailsModal}
                  {...referral}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Remit Payment Modal */}
      <ModalToRemitPayment
        referral={referral}
        showRemitModal={showRemitModal}
        setShowRemitModal={setShowRemitModal}
        loading={loading}
        remitPayment={remitPayment}
      />

      {/* Referral Details */}
      <ModalForReferralDetails
        referral={referral}
        showDetailsModal={showDetailsModal}
        setShowDetailsModal={setShowDetailsModal}
        showRemitPaymentModal={showRemitPaymentModal}
        requestForBankDetails={requestForBankDetails}
        loading={loading}
      />
    </div>
  );
};

ReferralsRowList.propTypes = {
  results: PropTypes.array.isRequired,
};

const UsersRow = ({ number, showTransactionDetailsModal, ...referral }) => {
  const referralStatus = getReferralStatus(
    referral.status,
    referral?.reward?.status
  );

  return (
    <tr key={referral.email}>
      <td>{number}</td>
      <td>
        <UserCard
          user={
            {
              email: referral.email,
              firstName: referral?.firstName,
              ...referral?.referee,
            } || {}
          }
          hideImage
          nameOnly
        />
      </td>
      <td>
        <UserCard user={referral?.referrer || {}} />
      </td>
      <td className={`${referralStatus.className}`}>{referralStatus.text}</td>
      <td>
        {referral?.reward?.amount ? (
          <h5 className="text-dark">
            {moneyFormatInNaira(referral?.reward?.amount)}
          </h5>
        ) : (
          'None Yet'
        )}
      </td>
      <td>
        <Button
          onClick={() => {
            showTransactionDetailsModal(referral);
          }}
          className="btn-xs btn-wide"
        >
          View
        </Button>
      </td>
    </tr>
  );
};

const ModalForReferralDetails = ({
  referral,
  showDetailsModal,
  setShowDetailsModal,
  showRemitPaymentModal,
  requestForBankDetails,
  loading,
}) => {
  const isAdmin = useCurrentRole().isAdmin;
  // const isUser = useCurrentRole().isUser;
  const referralHasBeenPaid = referral?.status === 'Rewarded';

  const referralStatus = getReferralStatus(
    referral?.status,
    referral?.reward?.status
  );

  if (!referral) {
    return null;
  }

  return (
    <Modal
      title="Referral Details"
      show={showDetailsModal}
      onHide={() => setShowDetailsModal(false)}
      showFooter={false}
    >
      <section>
        <table className="table table-sm">
          <thead>
            <tr className="text-secondary">
              <th>
                <strong>
                  Amount {referralHasBeenPaid ? 'Received' : 'To Pay'}
                </strong>
              </th>
              <th>
                <h5 className="text-secondary">
                  {referral?.reward?.amount ? (
                    <>
                      {moneyFormatInNaira(referral?.reward?.amount)}
                      {referralHasBeenPaid ? (
                        <small className="text-success">
                          <Spacing />
                          <SuccessIcon />
                        </small>
                      ) : (
                        <small className="text-warning">
                          <Spacing />
                          <WarningIcon />
                        </small>
                      )}
                    </>
                  ) : (
                    'None'
                  )}
                </h5>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="text-secondary">
              <td>
                <strong>User</strong>
              </td>
              <td>
                <h5 className="text-secondary text-uppercase">
                  <UserCard
                    user={referral?.referrer || {}}
                    nameOnly
                    hideImage
                  />
                </h5>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Referred</strong>
              </td>
              <td>
                {referral?.referee ? (
                  <UserCard user={referral?.referee || {}} nameOnly hideImage />
                ) : (
                  'None'
                )}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Property</strong>
              </td>
              <td>
                {referral?.propertyInfo ? (
                  <PropertyAvatar
                    property={referral?.propertyInfo}
                    nameOnly
                    portfolioId={referral?.offerInfo?._id}
                  />
                ) : (
                  'None'
                )}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Status</strong>
              </td>
              <td className={`${referralStatus.className}`}>
                {referralStatus.text}
              </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>

        {isAdmin &&
          !referralHasBeenPaid &&
          referral?.referrer?.additionalInfo?.bankInfo?.accountNumber && (
            <>
              <h4 className="header-smaller">Bank Details</h4>
              <table className="table table-sm">
                <thead>
                  <tr className="text-secondary">
                    <th>Account Number</th>
                    <th>
                      <h5 className="text-secondary">
                        {
                          referral?.referrer?.additionalInfo?.bankInfo
                            ?.accountNumber
                        }
                      </h5>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>Account Name</strong>
                    </td>
                    <td>
                      {
                        referral?.referrer?.additionalInfo?.bankInfo
                          ?.accountName
                      }
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Bank Name</strong>
                    </td>
                    <td>
                      {referral?.referrer?.additionalInfo?.bankInfo?.bankName}
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          )}

        {!referralHasBeenPaid && !!referral?.reward?.amount && isAdmin && (
          <div className="col-md-12 text-center">
            {!referral?.referrer?.additionalInfo?.bankInfo?.accountNumber ? (
              <Button
                className="btn btn-secondary mb-5"
                onClick={requestForBankDetails}
                loading={loading}
              >
                Request For Bank Details
              </Button>
            ) : (
              referral?.reward?.status === 'Payment Completed' && (
                <Button
                  className="btn btn-secondary mb-5"
                  onClick={showRemitPaymentModal}
                >
                  Pay User ({referral?.referrer?.firstName}{' '}
                  {referral?.referrer?.lastName})
                </Button>
              )
            )}
          </div>
        )}
      </section>
    </Modal>
  );
};

const ModalToRemitPayment = ({
  showRemitModal,
  setShowRemitModal,
  referral,
  loading,
  remitPayment,
}) => {
  return (
    <Modal
      title="Remittance"
      show={showRemitModal}
      onHide={() => setShowRemitModal(false)}
      showFooter={false}
    >
      <section>
        <h5 className="header-smaller mb-4">
          Are you sure you have made this payment
        </h5>
        <table className="table table-sm">
          <thead>
            <tr className="text-secondary">
              <th>Amount to Remit</th>
              <th>
                <h5 className="text-secondary">
                  {moneyFormatInNaira(referral?.reward?.amount)}
                </h5>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-secondary">
              <td>
                <strong>User</strong>
              </td>
              <td>
                <h5 className="text-secondary text-uppercase">
                  <UserCard
                    user={referral?.referrer || {}}
                    nameOnly
                    hideImage
                  />
                </h5>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="col-md-12 text-center">
          <Button
            loading={loading}
            className="btn btn-secondary mb-5"
            onClick={remitPayment}
          >
            Yes, Remit Payment
          </Button>
        </div>
      </section>
    </Modal>
  );
};

const FilterForm = ({ setFilterTerms }) => {
  return (
    <Formik
      initialValues={{}}
      onSubmit={(values, actions) => {
        console.log(`values`, values);
        const payload = processFilterValues(values);
        setFilterTerms(payload, {
          firstName: formatFilterString('First Name', values.firstName),
          lastName: formatFilterString('Last Name', values.lastName),
          email: formatFilterString('Email', values.email),
          phone: formatFilterString('Phone', values.phone),
          phone2: formatFilterString('Phone 2', values.phone2),
          role: formatFilterString(
            'Role',
            Object.keys(USER_TYPES)[values.role]
          ),
          activated: formatFilterBoolean('Activated', values.activated),
          banned: formatFilterBoolean('Banned', values.banned),

          redanNumber: formatFilterString('Redan Number', values.redanNumber),
          companyName: formatFilterString('Company Name', values.companyName),
          entity: formatFilterString('Last Name', values.entity),
          verified: formatFilterBoolean('Verified', values.verified),
          certified: formatFilterBoolean('Certified', values.certified),
          bankDetailsStatus: formatFilterString(
            'Bank Details Status',
            values.bankDetailsStatus
          ),
          companyInfoStatus: formatFilterString(
            'Company Info Status',
            values.companyInfoStatus
          ),
          directorInfoStatus: formatFilterString(
            'Director Info Status',
            values.directorInfoStatus
          ),
          documentUploadStatus: formatFilterString(
            'Document Upload Status',
            values.documentUploadStatus
          ),
        });
      }}
    >
      {({ isSubmitting, handleSubmit, ...props }) => (
        <Form>
          <section>
            <Input label="First Name" name="firstName" />
            <Input label="Last Name" name="lastName" />
            <Input type="email" label="Email" name="email" />
            <Input label="Phone Number" name="phone" />
            <Input label="Phone Number 2" name="phone2" />

            <Select
              label="Referral Type"
              name="role"
              options={objectToOptions(USER_TYPES)}
            />

            <Select
              label="Activated Referral Account"
              name="activated"
              options={booleanOptions()}
            />

            <Select label="Banned" name="banned" options={booleanOptions()} />

            <h6 className="my-5">Vendor Filters</h6>

            <Input label="Company Name" name="companyName" />
            <Input label="Redan Number" name="redanNumber" />

            <Select
              label="Entity"
              name="entity"
              options={valuesToOptions(Object.keys(VENDOR_IDENTIFICATION_TYPE))}
            />

            <Select
              label="Verified Vendor"
              name="verified"
              options={booleanOptions()}
            />

            <Select
              label="Certified Vendor"
              name="certified"
              options={booleanOptions()}
            />

            <Select
              label="Bank Details Status"
              name="bankDetailsStatus"
              options={valuesToOptions(VENDOR_INFO_STATUS)}
              placeholder="Bank Status"
            />

            <Select
              label="Company Info Status"
              name="companyInfoStatus"
              options={valuesToOptions(VENDOR_INFO_STATUS)}
              placeholder="Company Info Status"
            />

            <Select
              label="Director Info Status"
              name="directorInfoStatus"
              options={valuesToOptions(VENDOR_INFO_STATUS)}
              placeholder="Director Info Status"
            />

            <Select
              label="Document Upload Status"
              name="documentUploadStatus"
              options={valuesToOptions(VENDOR_INFO_STATUS)}
            />
          </section>
          <DisplayFormikState {...props} showAll />
          <Button
            className="btn-secondary mt-4"
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            Filter Referrals
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Referrals;
// _id: "60c847caa652c20017d5f487"
// ▶ reward 2 items
// amount: 150000
// status: "Payment Completed"
// status: "Registered"
// email: "temi@yahoo.com"
// referrerId: "60c84798a652c20017d5f484"
// userId: "60c84871a652c20017d5f488"
// ▶ referrer 5 items
// _id: "60c84798a652c20017d5f484"
// firstName: "Remi"
// lastName: "Joseph"
// phone: "2348028388185"
// email: "remi@yahoo.com"
// ▶ offerInfo 24 items
// _id: "60c849a4a652c20017d5f48d"
// contributionReward: 0
// status: "Resolved"
// totalAmountPayable: 10000000
// allocationInPercentage: 100
// initialPayment: 2000000
// initialPaymentDate: "2021-06-16T00:00:00.000Z"
// periodicPayment: 1000000
// paymentFrequency: 30
// expires: "2021-06-22T23:59:59.999Z"
// title: "This is the title document"
// deliveryState: "Delivery state"
// enquiryId: "60c84932a652c20017d5f48b"
// handOverDate: "2022-02-15T06:33:07.681Z"
// vendorId: "600e6414650f0000170ba5a0"
// userId: "60c84871a652c20017d5f488"
// propertyId: "606b485d1980d00017a7ae6e"
// referenceCode: "HIG/EE/OLDD/05/15062021"
// concern: []
// createdAt: "2021-06-15T06:33:08.179Z"
// updatedAt: "2021-06-15T06:45:37.249Z"
// __v: 0
// responseDate: "2021-06-15T06:33:37.072Z"
// signature: "Temi"
// ▶ referee 5 items
// _id: "60c84871a652c20017d5f488"
// firstName: "Temi"
// lastName: "Ola"
// phone: "2348028388185"
// email: "temi@yahoo.com"
// ▶ propertyInfo 26 items
// _id: "606b485d1980d00017a7ae6e"
// ▶ neighborhood 6 items
// ▶ flagged 2 items
// ▶ features 11 items
// ▶ assignedTo 6 items
// paymentPlan: []
// name: "Easter Estate"
// price: 10000000
// units: 2
// houseType: "Detached Duplex"
// bedrooms: 2
// bathrooms: 3
// toilets: 3
// description: "This is the detailed description."
// titleDocument: "This is the title document"
// ▶ address 5 items
// mainImage: "https://ballers-staging.s3.amazonaws.com/600e6414650f0000170ba5a0/0bbfb130-9634-11eb-970d-a987e2aa4353.jpeg"
// ▶ mapLocation 2 items
// addedBy: "600e6414650f0000170ba5a0"
// updatedBy: "600e6414650f0000170ba5a0"
// ▶ floorPlans 1 item
// gallery: []
// createdAt: "2021-04-05T17:26:53.875Z"
// updatedAt: "2021-06-15T06:33:37.028Z"
// __v: 0
// ▶ approved 3 items
