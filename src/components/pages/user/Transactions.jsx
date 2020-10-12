import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import ContributionGraph from 'components/common/ContributionGraph';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { BASE_API_URL } from 'utils/constants';
import { useToast } from 'components/utils/Toast';
import { getTokenFromStore } from 'utils/localStorage';
import LoadItems from 'components/utils/LoadingItems';
import NoContent from 'components/utils/NoContent';
import { TransactionIcon } from 'components/utils/Icons';
import { getError, moneyFormatInNaira } from 'utils/helpers';
// import { Link } from '@reach/router';
import { getShortDate } from 'utils/date-helpers';

const Transactions = () => (
  <BackendPage>
    <Overview />
    <AllTransactions />
  </BackendPage>
);

const Overview = () => (
  <div className="container-fluid ">
    <ContributionGraph />
  </div>
);

const AllTransactions = () => {
  const [toast, setToast] = useToast();
  const [transactions, setTransactions] = React.useState(null);
  React.useEffect(() => {
    Axios.get(`${BASE_API_URL}/transaction/user`, {
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
    <LoadItems
      Icon={<TransactionIcon />}
      items={transactions}
      loadingText="Loading your Transactions"
      noContent={
        <NoContent
          Icon={<TransactionIcon />}
          isButton
          text="No Transactions found"
        />
      }
    >
      <TransactionsRowList toast={toast} transactions={transactions || []} />
    </LoadItems>
  );
};

const TransactionsRowList = ({ transactions }) => (
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
              {/* <td></td> */}
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
  paidOn,
  number,
  additionalInfo,
  paymentSource,
  amount,
}) => (
  <tr>
    <td>{number}</td>
    <td>{getShortDate(paidOn)}</td>
    <td>
      {paymentSource} ({additionalInfo})
    </td>
    <td>{moneyFormatInNaira(amount)}</td>
    {/* <td>
      <Link
        className="btn btn-sm btn-secondary"
        to={`/admin/transaction/${_id}`}
      >
        View Transaction
      </Link>
    </td> */}
  </tr>
);

export default Transactions;
