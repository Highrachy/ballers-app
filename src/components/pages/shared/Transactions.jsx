import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { Card } from 'react-bootstrap';
import { TransactionIcon } from 'components/utils/Icons';
import {
  getError,
  moneyFormatInNaira,
  statusIsSuccessful,
} from 'utils/helpers';
import { getDate, getTinyDate } from 'utils/date-helpers';
import PaginatedContent from 'components/common/PaginatedContent';
import { API_ENDPOINT } from 'utils/URL';
import Button from 'components/forms/Button';
import Modal from 'components/common/Modal';
import { Spacing } from 'components/common/Helpers';
import { useCurrentRole } from 'hooks/useUser';
import { getTokenFromStore } from 'utils/localStorage';
import Axios from 'axios';
import { BASE_API_URL } from 'utils/constants';
import { refreshQuery } from 'hooks/useQuery';
import TimeAgo from 'timeago-react';
import { PropertyAvatar } from 'components/common/PropertyCard';
import { SuccessIcon } from 'components/utils/Icons';
import { WarningIcon } from 'components/utils/Icons';

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
      initialFilter={{ sortBy: 'createdAt', sortDirection: 'desc' }}
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
        percentage: 5,
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
      <Card className="mt-4">
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
}) => (
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
                {moneyFormatInNaira(Math.round(0.95 * payment?.amount || 0))}
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

const ModalForTransactionDetails = ({
  payment,
  showDetailsModal,
  setShowDetailsModal,
  showRemitPaymentModal,
}) => {
  const isAdmin = useCurrentRole().isAdmin;
  const isVendor = useCurrentRole().isVendor;
  const isUser = useCurrentRole().isUser;

  if (!payment) {
    return null;
  }

  const remittance =
    payment?.remittance?.amount || Math.round(0.95 * payment?.amount);
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
            <h4 className="header-smaller">
              Remittance ({payment?.remittance?.percentage}%)
            </h4>
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
  } = transaction;
  const isAdmin = useCurrentRole().isAdmin;
  const isVendor = useCurrentRole().isVendor;
  const isAdminOrVendor = isAdmin || isVendor;

  const amountPaid = isVendor ? Math.round(0.95 * amount) : amount;
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

export default Transactions;
