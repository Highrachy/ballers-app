import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { Card } from 'react-bootstrap';
import { TransactionIcon } from 'components/utils/Icons';
import { moneyFormatInNaira } from 'utils/helpers';
import { getShortDate } from 'utils/date-helpers';
import PaginatedContent from 'components/common/PaginatedContent';
import { API_ENDPOINT } from 'utils/URL';

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
    />
  );
};

const TransactionsRowList = ({ results, offset }) => (
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
            {results.map((transaction, index) => (
              <TransactionsRow
                key={index}
                number={offset + index + 1}
                {...transaction}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

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
