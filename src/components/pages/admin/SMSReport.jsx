import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import BackendPage from 'components/layout/BackendPage';
import { getDateTime } from 'utils/date-helpers';
import { buildKudiSMSActionUrl } from 'utils/sms';
import { getNairaSymbol } from 'utils/helpers';
import TopTitle from 'components/utils/TopTitle';
import BallersSpinner from 'components/utils/BallersSpinner';

const Reports = () => {
  const [loading, setLoading] = React.useState(true);
  const [balance, setBalance] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    axios
      .post(buildKudiSMSActionUrl('balance'))
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setBalance(data.balance);
        }
        setLoading(false);
      })
      .catch(function () {
        setBalance(0);
        setLoading(false);
      });
  }, []);

  return (
    <BackendPage>
      <section className="container-fluid">
        <TopTitle>
          SMS Balance:{' '}
          {loading ? (
            <BallersSpinner small />
          ) : (
            <>
              {getNairaSymbol()} {balance}
            </>
          )}
        </TopTitle>
      </section>
    </BackendPage>
  );
};

const ReportsRowList = ({ reports }) => (
  <div className="table-responsive">
    <table className="table table-dark table__no-border table__with-bg">
      <tbody>
        {reports.map((report, index) => (
          <ReportsRow key={index} report={report} />
        ))}
      </tbody>
    </table>
    <br />
    <br />
  </div>
);

ReportsRowList.propTypes = {
  reports: PropTypes.array.isRequired,
};

const ReportsRow = ({ report }) => (
  <tr>
    <td className="table__number" width="5%">
      <span
        className={`circle ${report.status === 'DELIVERED' ? 'green' : 'gray'}`}
      ></span>
    </td>
    <td width="15%">
      <span className="text-white">{report.status}</span>
    </td>
    <td width="50%">
      <span className="text-muted-light-2 small--2">{report.message}</span>
    </td>

    <td width="15%">
      <span className="text-white">{report.mobile}</span>
    </td>
    <td className="text-right" width="15%">
      <span>
        <i className="icon icon-clock" /> {getDateTime(report.date)}
      </span>
    </td>
  </tr>
);

ReportsRow.propTypes = {
  report: PropTypes.object.isRequired,
};

export default Reports;
