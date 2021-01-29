import React from 'react';
import PropTypes from 'prop-types';
import BackendPage from 'components/layout/BackendPage';
import { Card } from 'react-bootstrap';
import Axios from 'axios';
import { BASE_API_URL } from 'utils/constants';
import Toast, { useToast } from 'components/utils/Toast';
import { getTokenFromStore } from 'utils/localStorage';
import LoadItems from 'components/utils/LoadingItems';
import NoContent from 'components/utils/NoContent';
import { Link } from '@reach/router';
import { moneyFormatInNaira, getError } from 'utils/helpers';
import { MyPropertyIcon } from 'components/utils/Icons';
import TopTitle from 'components/utils/TopTitle';
import { getTinyDate } from 'utils/date-helpers';

const Transactions = () => {
  const [toast, setToast] = useToast();
  const [transactions, setTransactions] = React.useState(null);

  React.useEffect(() => {
    Axios.get(`${BASE_API_URL}/transaction/all`, {
      headers: {
        Authorization: getTokenFromStore(),
      },
    })
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setTransactions(data.transactions);
        }
      })
      .catch(function (error) {
        setToast({
          message: getError(error),
        });
      });
  }, [setToast]);
  return (
    <BackendPage>
      <Toast {...toast} showToastOnly />
      <TopTitle buttonText="Add Transaction" to="/admin/add-transaction">
        All Transactions
      </TopTitle>
      <AllTransactions transactions={transactions} toast={toast} />
    </BackendPage>
  );
};

const AllTransactions = ({ transactions, toast }) => (
  <LoadItems
    Icon={<MyPropertyIcon />}
    items={transactions}
    loadingText="Loading your Transactions"
    noContent={
      <NoContent
        isButton
        Icon={<MyPropertyIcon />}
        text="No Transactions found"
      />
    }
  >
    <TransactionsRowList toast={toast} transactions={transactions || []} />
  </LoadItems>
);

const TransactionsRowList = ({ transactions }) => (
  <div className="container-fluid">
    <Card className="mt-2">
      <div className="table-responsive">
        <table className="table table-border table-hover">
          <thead>
            <tr>
              <td>S/N</td>
              <td>Paid On</td>
              <td>Source</td>
              <td>Amount</td>
              <td>User</td>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <TransactionsRow
                key={index}
                number={index + 1}
                {...transaction}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

TransactionsRowList.propTypes = {
  transactions: PropTypes.array.isRequired,
};

const TransactionsRow = ({
  _id,
  paymentSource,
  amount,
  paidOn,
  number,
  userInfo,
}) => (
  <tr>
    <td>{number}</td>
    <td>{getTinyDate(paidOn)}</td>
    <td>{paymentSource}</td>
    <td>
      <strong>{moneyFormatInNaira(amount)}</strong>
    </td>
    <td>
      {userInfo.firstName} {userInfo.lastName}
    </td>
    <td>
      <Link
        className="btn btn-sm btn-secondary"
        to={`/admin/transaction/${_id}`}
      >
        View Details
      </Link>
    </td>
  </tr>
);

export default Transactions;
