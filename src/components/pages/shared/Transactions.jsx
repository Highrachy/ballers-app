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
import { OfflinePaymentForm } from 'components/pages/shared/MakePayment';
import { Spacing } from 'components/common/Helpers';
import { useCurrentRole } from 'hooks/useUser';
import { getTokenFromStore } from 'utils/localStorage';
import Axios from 'axios';
import { BASE_API_URL } from 'utils/constants';
import { refreshQuery } from 'hooks/useQuery';
import Image from 'components/utils/Image';
import TimeAgo from 'timeago-react';
import { SuccessIcon } from 'components/utils/Icons';

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

export const AllOfflinePayments = () => {
  return (
    <PaginatedContent
      endpoint={API_ENDPOINT.getAllOfflinePayments()}
      pageName="Offline Payment"
      DataComponent={OfflinePaymentsRowList}
      PageIcon={<TransactionIcon />}
      queryName="payment"
      initialFilter={{
        resolved: false,
        sortBy: 'createdAt',
        sortDirection: 'desc',
      }}
      hideNoContent
    />
  );
};

const TransactionsRowList = ({ results, offset, setToast }) => {
  const [offlinePayment, setOfflinePayment] = React.useState(null);
  const [showRemitModal, setShowRemitModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const showRemitPaymentModal = (payment) => {
    setOfflinePayment(payment);
    setShowRemitModal(true);
  };

  const remitPayment = () => {
    console.log(`remitting`, offlinePayment);
    setLoading(true);
    Axios.post(
      `${BASE_API_URL}/transaction/remittance`,
      {
        transactionId: offlinePayment._id,
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
                <td>Description</td>
                <td>Amount</td>
                {!useCurrentRole().isUser && <td>Remittance</td>}
                {useCurrentRole().isAdmin && <td></td>}
              </tr>
            </thead>
            <tbody>
              {results.map((transaction, index) => (
                <TransactionsRow
                  key={index}
                  number={offset + index + 1}
                  showRemitPaymentModal={showRemitPaymentModal}
                  {...transaction}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      {/* Remit Payment Modal */}
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
                    {moneyFormatInNaira(
                      Math.round(0.95 * offlinePayment?.amount || 0)
                    )}
                  </h5>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Vendor</td>
                <td>{offlinePayment?.vendorInfo?.vendor.companyName}</td>
              </tr>
              <tr>
                <td>User</td>
                <td>
                  {offlinePayment?.userInfo?.firstName}{' '}
                  {offlinePayment?.userInfo?.lastName}
                </td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
            </tbody>
          </table>
          <div className="col-md-12 text-center">
            <Button
              loading={loading}
              className="btn btn-secondary mb-5"
              onClick={() => remitPayment()}
            >
              Yes, Remit Payment
            </Button>
          </div>
        </section>
      </Modal>
    </div>
  );
};

const TransactionsRow = ({
  _id,
  paidOn,
  number,
  additionalInfo,
  paymentSource,
  showRemitPaymentModal,
  amount,
  vendorInfo,
  userInfo,
  remittance,
}) => {
  return (
    <tr>
      <td>{number}</td>
      <td>
        {getDate(paidOn)}{' '}
        <span className="block-text-small text-muted">
          <TimeAgo datetime={paidOn} />
        </span>{' '}
      </td>
      <td>
        {paymentSource}{' '}
        <span className="block-text-small text-muted">{additionalInfo}</span>
      </td>
      <td>{moneyFormatInNaira(amount)}</td>
      {!useCurrentRole().isUser && (
        <td>
          {moneyFormatInNaira(Math.round(0.95 * amount || 0))}{' '}
          {remittance?.date && (
            <span className="block-text-small text-muted">
              {getTinyDate(remittance.date)}
            </span>
          )}
        </td>
      )}
      {useCurrentRole().isAdmin && (
        <td>
          {remittance ? (
            <div className="">
              <span className="text-success">
                <SuccessIcon />
              </span>{' '}
              <Spacing />
              Resolved
            </div>
          ) : (
            <Button
              className="btn btn-sm btn-xs btn-danger"
              onClick={() => {
                showRemitPaymentModal({ _id, amount, userInfo, vendorInfo });
              }}
            >
              Remit Payment
            </Button>
          )}
        </td>
      )}
    </tr>
  );
};

const OfflinePaymentsRowList = ({ results, offset, setToast }) => {
  const [offlinePayment, setOfflinePayment] = React.useState(null);
  const [
    showOfflinePaymentsModal,
    setShowOfflinePaymentsModal,
  ] = React.useState(false);
  const [showApprovalModal, setShowApprovalModal] = React.useState(false);
  const [showEditOfflineForm, setShowEditOfflineForm] = React.useState(false);

  const viewPayment = (offlinePayment, showEdit = false) => {
    setOfflinePayment(offlinePayment);
    setShowEditOfflineForm(showEdit);

    setShowApprovalModal(false);
    setShowOfflinePaymentsModal(true);
  };

  const approvePayment = (offlinePayment) => {
    setOfflinePayment(offlinePayment);

    setShowOfflinePaymentsModal(false);
    setShowApprovalModal(true);
  };

  const [loading, setLoading] = React.useState(false);

  const approveOfflinePayment = () => {
    setLoading(true);
    Axios.put(
      `${BASE_API_URL}/offline-payment/resolve/${offlinePayment._id}`,
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
            message: `Payment has been successfully approved`,
          });

          refreshQuery('payment', true);
          refreshQuery('transaction', true);
          setShowApprovalModal(false);
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
    <div className="container-fluid">
      <Card className="mt-4">
        <div className="table-responsive">
          <table className="table table-border table-hover">
            <thead>
              <tr>
                <td>S/N</td>
                <td>Amount</td>
                <td>Bank</td>
                <td>Date</td>
                <td>&nbsp;</td>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <OfflinePaymentsRow
                  key={index}
                  number={offset + index + 1}
                  offlinePayment={result}
                  viewPayment={viewPayment}
                  approvePayment={approvePayment}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Modal
        title="Offline Payment"
        show={showOfflinePaymentsModal}
        onHide={() => setShowOfflinePaymentsModal(false)}
        showFooter={false}
      >
        {!showEditOfflineForm ? (
          <>
            <table className="table">
              <thead>
                <tr className="text-secondary">
                  <th>Amount</th>
                  <th>
                    <h5 className="text-secondary">
                      {moneyFormatInNaira(offlinePayment?.amount)}
                    </h5>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Bank</td>
                  <td>{offlinePayment?.bank}</td>
                </tr>
                <tr>
                  <td>Payment Type</td>
                  <td>{offlinePayment?.type}</td>
                </tr>
                <tr>
                  <td>Paid On</td>
                  <td>{getDate(offlinePayment?.dateOfPayment)}</td>
                </tr>
                {offlinePayment?.receipt && (
                  <tr>
                    <td>Receipt</td>
                    <td>
                      <Image
                        src={offlinePayment?.receipt}
                        name="receipt"
                        bordered
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <Button
              className="btn btn-sm btn-secondary"
              onClick={() => {
                setShowEditOfflineForm(true);
              }}
            >
              Edit Payment
            </Button>
          </>
        ) : (
          <OfflinePaymentForm
            offlinePayment={offlinePayment}
            setToast={setToast}
            hideForm={() => setShowOfflinePaymentsModal(false)}
          />
        )}
      </Modal>

      {/* Approve Payment Modal */}
      <Modal
        title="Approve Payment"
        show={showApprovalModal}
        onHide={() => setShowApprovalModal(false)}
        showFooter={false}
      >
        <section>
          <h5 className="header-smaller mb-4">
            Are you sure you want to approve this payment?
          </h5>
          <table className="table table-sm">
            <thead>
              <tr className="text-secondary">
                <th>Amount</th>
                <th>
                  <h5 className="text-secondary">
                    {moneyFormatInNaira(offlinePayment?.amount)}
                  </h5>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bank</td>
                <td>{offlinePayment?.bank}</td>
              </tr>
              <tr>
                <td>User</td>
                <td>
                  {offlinePayment?.userInfo?.firstName}{' '}
                  {offlinePayment?.userInfo?.lastName}
                </td>
              </tr>
              <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
            </tbody>
          </table>
          <div className="col-md-12 text-center">
            <Button
              loading={loading}
              className="btn btn-secondary mb-5"
              onClick={() => approveOfflinePayment()}
            >
              Yes, Approve Payment
            </Button>
          </div>
        </section>
      </Modal>
    </div>
  );
};

const OfflinePaymentsRow = ({
  offlinePayment,
  number,
  viewPayment,
  approvePayment,
}) => {
  const userIsAdmin = useCurrentRole().isAdmin;
  const userIsUser = useCurrentRole().isUser;
  return (
    <tr>
      <td>{number}</td>
      <td>
        {moneyFormatInNaira(offlinePayment.amount)}
        <div className="block-text-small">
          Paid on {getDate(offlinePayment.dateOfPayment)}
        </div>
      </td>
      <td>
        {offlinePayment.type}
        <br /> <small>{offlinePayment.bank}</small>
      </td>
      <td>{getDate(offlinePayment.createdAt)}</td>
      <td>
        <Button
          className="btn btn-sm btn-xs btn-secondary"
          onClick={() => {
            viewPayment(offlinePayment);
          }}
        >
          View Payment
        </Button>
        <Spacing />
        <Spacing />

        {userIsUser && (
          <Button
            className="btn btn-sm btn-xs btn-info"
            onClick={() => {
              viewPayment(offlinePayment, true);
            }}
          >
            Edit Payment
          </Button>
        )}

        {userIsAdmin && (
          <Button
            className="btn btn-sm btn-xs btn-info"
            onClick={() => {
              approvePayment(offlinePayment);
            }}
          >
            Approve Payment
          </Button>
        )}
      </td>
    </tr>
  );
};

export default Transactions;
