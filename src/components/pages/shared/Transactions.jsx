import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { Card } from 'react-bootstrap';
import { TransactionIcon } from 'components/utils/Icons';
import {
  getError,
  moneyFormatInNaira,
  statusIsSuccessful,
} from 'utils/helpers';
import { formatFilterDate, getDate, getTinyDate } from 'utils/date-helpers';
import PaginatedContent from 'components/common/PaginatedContent';
import { API_ENDPOINT } from 'utils/URL';
import Button from 'components/forms/Button';
import Modal from 'components/common/Modal';
import { Spacing } from 'components/common/Helpers';
import { useCurrentRole } from 'hooks/useUser';
import { getTokenFromStore } from 'utils/localStorage';
import Axios from 'axios';
import { BASE_API_URL, DEFAULT_VENDOR_PERCENTAGE } from 'utils/constants';
import { refreshQuery } from 'hooks/useQuery';
import TimeAgo from 'timeago-react';
import { PropertyAvatar } from 'components/common/PropertyCard';
import { SuccessIcon } from 'components/utils/Icons';
import { WarningIcon } from 'components/utils/Icons';
import { UserContext } from 'context/UserContext';
import { Form, Formik } from 'formik';
import {
  DisplayFormikState,
  processFilterValues,
} from 'components/forms/form-helper';
import Select from 'components/forms/Select';
import { formatFilterString, getRange, valuesToOptions } from 'utils/helpers';
import InputFormat from 'components/forms/InputFormat';
import FilterRange from 'components/forms/FilterRange';
import DatePicker from 'components/forms/DatePicker';

const Transactions = () => (
  <BackendPage>
    <AllTransactions />
  </BackendPage>
);

export const AllTransactions = () => {
  return (
    <PaginatedContent
      endpoint={API_ENDPOINT.getAllTransactions()}
      pageName="Transaction"
      DataComponent={TransactionsRowList}
      PageIcon={<TransactionIcon />}
      queryName="transaction"
      initialFilter={{
        sortBy: 'paidOn',
        sortDirection: 'desc',
      }}
      FilterComponent={FilterForm}
    />
  );
};

const TransactionsRowList = ({ results, offset, setToast }) => {
  const [payment, setPayment] = React.useState(null);
  const [showRemitModal, setShowRemitModal] = React.useState(false);
  const [showDetailsModal, setShowDetailsModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const isUser = useCurrentRole().isUser;

  const showRemitPaymentModal = () => {
    setShowRemitModal(true);
    setShowDetailsModal(false);
  };

  const showTransactionDetailsModal = (payment) => {
    setPayment(payment);
    setShowDetailsModal(true);
  };

  const remitPayment = () => {
    setLoading(true);
    Axios.post(
      `${BASE_API_URL}/transaction/remittance`,
      {
        transactionId: payment._id,
        date: Date.now(),
        percentage:
          payment?.vendorInfo?.vendor?.remittancePercentage ||
          DEFAULT_VENDOR_PERCENTAGE,
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
            message: `Remittance has been successfully approved`,
          });

          refreshQuery('payment', true);
          refreshQuery('transaction', true);
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

  return (
    <div className="container-fluid">
      <Card>
        <div className="table-responsive">
          <table className="table table-border table-hover">
            <thead>
              <tr>
                <td>S/N</td>
                <td>Date</td>
                <td>Property</td>
                <td>Type</td>
                <td className="text-right">Amount (NGN)</td>
                {!isUser && <td>Remittance</td>}
              </tr>
            </thead>
            <tbody>
              {results.map((transaction, index) => (
                <TransactionsRow
                  key={index}
                  number={offset + index + 1}
                  showRemitPaymentModal={showRemitPaymentModal}
                  showTransactionDetailsModal={showTransactionDetailsModal}
                  {...transaction}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Remit Payment Modal */}
      <ModalToRemitPayment
        payment={payment}
        showRemitModal={showRemitModal}
        setShowRemitModal={setShowRemitModal}
        loading={loading}
        remitPayment={remitPayment}
      />

      {/* Transaction Details */}
      <ModalForTransactionDetails
        payment={payment}
        showDetailsModal={showDetailsModal}
        setShowDetailsModal={setShowDetailsModal}
        showRemitPaymentModal={showRemitPaymentModal}
      />
    </div>
  );
};

const ModalToRemitPayment = ({
  showRemitModal,
  setShowRemitModal,
  payment,
  loading,
  remitPayment,
}) => {
  const remittancePercentage =
    payment?.vendorInfo?.vendor?.remittancePercentage ||
    DEFAULT_VENDOR_PERCENTAGE;
  const amountPaid = Math.round(
    ((100 - remittancePercentage) / 100) * payment?.amount
  );

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
                  {moneyFormatInNaira(amountPaid)}
                </h5>
              </th>
            </tr>
          </thead>
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

const ModalForTransactionDetails = ({
  payment,
  showDetailsModal,
  setShowDetailsModal,
  showRemitPaymentModal,
}) => {
  const { userState } = React.useContext(UserContext);
  const isAdmin = useCurrentRole().isAdmin;
  const isVendor = useCurrentRole().isVendor;
  const isUser = useCurrentRole().isUser;

  if (!payment) {
    return null;
  }

  const vendorPercentage = isVendor
    ? userState?.vendor?.remittancePercentage
    : payment?.vendorInfo?.vendor?.remittancePercentage;
  const remittancePercentage =
    payment?.remittance?.percentage ||
    vendorPercentage ||
    DEFAULT_VENDOR_PERCENTAGE;

  const remittance =
    payment?.remittance?.amount ||
    Math.round(((100 - remittancePercentage) / 100) * payment?.amount);
  const amountPaid = isVendor ? remittance : payment?.amount;

  return (
    <Modal
      title="Transaction Details"
      show={showDetailsModal}
      onHide={() => setShowDetailsModal(false)}
      showFooter={false}
    >
      <section>
        <p className="text-small text-primary">
          Payment ID: {payment?.additionalInfo}
        </p>

        <table className="table table-sm">
          <thead>
            <tr className="text-secondary">
              {isAdmin && !payment?.remittance ? (
                <>
                  <th>
                    <strong>Vendor</strong>
                  </th>
                  <th>
                    <h5 className="text-secondary">
                      {payment?.vendorInfo?.vendor.companyName}
                    </h5>
                  </th>
                </>
              ) : (
                <>
                  <th>
                    <strong>Amount {isVendor ? 'Received' : 'Paid'}</strong>
                  </th>
                  <th>
                    <h5 className="text-secondary">
                      {moneyFormatInNaira(amountPaid)}
                      {isVendor &&
                        (payment?.remittance ? (
                          <small className="text-success">
                            <Spacing />
                            <SuccessIcon />
                          </small>
                        ) : (
                          <small className="text-warning">
                            <Spacing />
                            <WarningIcon />
                          </small>
                        ))}
                    </h5>
                  </th>
                </>
              )}
            </tr>
          </thead>

          <tbody>
            {isVendor && (
              <tr>
                <td>
                  <strong>Amount Paid</strong>
                </td>
                <td> {moneyFormatInNaira(payment?.amount)}</td>
              </tr>
            )}
            {!isUser && (
              <tr>
                <td>
                  <strong>User</strong>
                </td>
                <td>
                  {payment?.userInfo?.firstName} {payment?.userInfo?.lastName}
                </td>
              </tr>
            )}
            <tr>
              <td>
                <strong>Property</strong>
              </td>
              <td>
                <PropertyAvatar
                  property={payment?.propertyInfo}
                  nameOnly
                  portfolioId={payment?.offerId}
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Payment Source</strong>
              </td>
              <td>{payment?.paymentSource}</td>
            </tr>
            <tr>
              <td>
                <strong>Paid On</strong>
              </td>
              <td>
                {getDate(payment?.paidOn)} (
                <TimeAgo datetime={payment?.paidOn} />)
              </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>

        {isAdmin && (
          <>
            <h4 className="header-smaller">Fee ({remittancePercentage} %)</h4>
            <table className="table table-sm">
              <thead>
                <tr className="text-secondary">
                  <th>
                    {payment?.remittance ? 'Remitted' : 'Amount to Remit'}
                  </th>
                  <th>
                    <h5 className="text-secondary">
                      {moneyFormatInNaira(remittance)}
                    </h5>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Vendor</strong>
                  </td>
                  <td>{payment?.vendorInfo?.vendor.companyName}</td>
                </tr>
                {payment?.remittance && (
                  <>
                    <tr>
                      <td>
                        <strong>Remitted Date</strong>
                      </td>
                      <td>
                        {getTinyDate(payment?.remittance?.date)} (
                        <TimeAgo datetime={payment?.remittance?.date} />)
                      </td>
                    </tr>
                  </>
                )}
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </>
        )}

        {isAdmin && !payment?.remittance && (
          <>
            <h4 className="header-smaller">Bank Details</h4>
            <table className="table table-sm">
              <thead>
                <tr className="text-secondary">
                  <th>Account Number</th>
                  <th>
                    <h5 className="text-secondary">
                      {payment?.vendorInfo?.vendor?.bankInfo?.accountNumber}
                    </h5>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Account Name</strong>
                  </td>
                  <td>{payment?.vendorInfo?.vendor?.bankInfo?.accountName}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Bank Name</strong>
                  </td>
                  <td>{payment?.vendorInfo?.vendor?.bankInfo?.bankName}</td>
                </tr>
              </tbody>
            </table>
          </>
        )}

        {!payment?.remittance && isAdmin && (
          <div className="col-md-12 text-center">
            <Button
              className="btn btn-secondary mb-5"
              onClick={showRemitPaymentModal}
            >
              Remit Payment
            </Button>
          </div>
        )}
      </section>
    </Modal>
  );
};

const TransactionsRow = (transaction) => {
  const {
    paidOn,
    number,
    paymentSource,
    showTransactionDetailsModal,
    amount,
    propertyInfo,
    remittance,
    offerId,
    vendorInfo,
  } = transaction;
  const isAdmin = useCurrentRole().isAdmin;
  const isVendor = useCurrentRole().isVendor;
  const isAdminOrVendor = isAdmin || isVendor;

  const { userState } = React.useContext(UserContext);

  const vendorPercentage = isVendor
    ? userState?.vendor?.remittancePercentage
    : vendorInfo?.vendor?.remittancePercentage;
  const remittancePercentage =
    remittance?.percentage || vendorPercentage || DEFAULT_VENDOR_PERCENTAGE;
  const amountPaid = isVendor
    ? Math.round(((100 - remittancePercentage) / 100) * amount)
    : amount;

  return (
    <tr
      className="cursor-pointer"
      onClick={() => {
        showTransactionDetailsModal(transaction);
      }}
    >
      <td>{number}</td>
      <td>
        <span className="text-muted">{getDate(paidOn)}</span>
      </td>
      <td>
        <PropertyAvatar
          property={propertyInfo}
          nameOnly
          portfolioId={offerId}
          linkToPage={false}
        />
      </td>
      <td>
        <strong className="text-primary">{paymentSource}</strong>
      </td>
      <td>
        <h5 className="text-right text-secondary ls-1">
          {moneyFormatInNaira(amountPaid)}
        </h5>
      </td>
      {isAdminOrVendor && (
        <td>
          {remittance ? (
            <div className="">
              <span className="text-success">
                <SuccessIcon />
              </span>{' '}
              <Spacing />
              Remitted
            </div>
          ) : (
            <div className="">
              <span className="text-warning">
                <WarningIcon />
              </span>{' '}
              <Spacing />
              Pending
            </div>
          )}
        </td>
      )}
    </tr>
  );
};

// createdAt: { type: FILTER_TYPE.DATE },
// offerId: { type: FILTER_TYPE.OBJECT_ID }, - get all offers in the database
// paidOn: { type: FILTER_TYPE.DATE },
// propertyId: { type: FILTER_TYPE.OBJECT_ID }, - get all properties
// userId: { type: FILTER_TYPE.OBJECT_ID }, - get all user Id
// vendorId: { type: FILTER_TYPE.OBJECT_ID }, - get all vendor Ids

// remittedAmount: { key: 'remittance.amount', type: FILTER_TYPE.INTEGER },
// remittedBy: { key: 'remittance.by', type: FILTER_TYPE.OBJECT_ID },
// remittedDate: { key: 'remittance.date', type: FILTER_TYPE.DATE },
// remittedPercentage: { key: 'remittance.percentage', type: FILTER_TYPE.INTEGER },

const FilterForm = ({ setFilterTerms }) => {
  return (
    <Formik
      initialValues={{}}
      onSubmit={(values, actions) => {
        // console.log(`initial values`, values);
        // var now = new Date(values?.paidOn?.date);
        // var utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
        // console.log(`utc.toISOString()`, utc.toISOString());
        const payload = processFilterValues({
          ...values,
          paidOn: formatFilterDate(values?.paidOn?.date),
        });
        setFilterTerms(payload, {
          amount: `Amount : ${getRange(values?.amount, { suffix: 'Naira' })}`,
          paymentSource: formatFilterString(
            'Payment Source',
            values?.paymentSource
          ),
          remittedAmount: `Remitted Amount : ${getRange(
            values?.remittedAmount,
            {
              suffix: 'Naira',
            }
          )}`,
          remittedPercentage: `Remitted Percentage : ${getRange(
            values?.remittedPercentage,
            {
              suffix: '%',
            }
          )}`,
          // houseType: formatFilterString(
          //   'House Type',
          //   getTitleCase(values?.houseType)
          // ),
          paidOn: formatFilterString(
            'Paid On',
            getTinyDate(values?.paidOn?.date)
          ),
          // state: formatFilterString('State', values.state),
          // city: formatFilterString('City', values.city),
          // approved: formatFilterBoolean('Approved', values.approved),
          // flagged: formatFilterBoolean('Flagged', values.flagged),
          // bedrooms: formatFilterString('Bathrooms', values.bedrooms),
          // bathrooms: formatFilterString('Bathrooms', values.bathrooms),
        });
      }}
    >
      {({ isSubmitting, handleSubmit, ...props }) => (
        <Form>
          <section>
            <Select
              label="Payment Source"
              name="paymentSource"
              options={valuesToOptions([
                'Paystack',
                'Bank Transfer',
                'Bank Deposit',
              ])}
            />

            <FilterRange
              Field={InputFormat}
              name="amount"
              label="Amount"
              values={props?.values}
            />
            <FilterRange
              Field={InputFormat}
              name="remittedAmount"
              label="Remitted Amount"
              values={props?.values}
            />
            <FilterRange
              Field={InputFormat}
              name="remittedPercentage"
              label="Remitted Percentage"
              values={props?.values}
            />

            <DatePicker label="Paid on" name="paidOn" placeholder="Paid On" />

            {/* <Input label="City" name="city" /> */}
          </section>
          <DisplayFormikState {...props} showAll hide />
          <Button
            className="btn-secondary mt-4"
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            Filter Transaction
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Transactions;
