import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { Card, ProgressBar } from 'react-bootstrap';
import { Link } from '@reach/router';
import { BASE_API_URL } from 'utils/constants';
import { useToast } from 'components/utils/Toast';
import Axios from 'axios';
import { getTokenFromStore } from 'utils/localStorage';
import { PortfolioIcon } from 'components/utils/Icons';
import { useGetQuery } from 'hooks/useQuery';
import { API_ENDPOINT } from 'utils/URL';
import { ContentLoader } from 'components/utils/LoadingItems';
import { OwnedPropertyCard } from '../shared/SingleProperty';
import { moneyFormatInNaira } from 'utils/helpers';
import { getTinyDate } from 'utils/date-helpers';
import { LinkSeparator } from 'components/common/Helpers';

const pageOptions = {
  key: 'portfolio',
  pageName: 'Portfolio',
};

const SinglePortfolio = ({ id }) => {
  const [toast, setToast] = useToast();
  const [portfolioQuery, portfolio, setPortfolio] = useGetQuery({
    key: pageOptions.key,
    name: [pageOptions.key, id],
    setToast,
    endpoint: API_ENDPOINT.getOnePortfolio(id),
    refresh: true,
  });

  return (
    <BackendPage>
      <ContentLoader
        hasContent={!!portfolio}
        Icon={<PortfolioIcon />}
        query={portfolioQuery}
        name={pageOptions.pageName}
        toast={toast}
      >
        <OwnedPropertyCard
          property={{
            ...portfolio?.propertyInfo,
            price: portfolio?.totalAmountPayable,
          }}
          setToast={setToast}
          setProperty={setPortfolio}
          Sidebar={<AssignedPropertySidebar portfolio={portfolio} />}
          isPortfolioPage
        />
      </ContentLoader>
    </BackendPage>
  );
};

const NOW = 50;

// create modal for online payment and offline payment
// online payment should not exceed 900,000
// offline payment should have bank details and form to fill for offline payments

const AssignedPropertySidebar = ({ portfolio }) => {
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

  const nextPayment = portfolio?.nextPaymentInfo[0];

  return (
    <>
      <Card className="card-container property-holder">
        <h5 className="header-smaller">
          Next Payment <div className="badge badge-overdue">Overdue: 3days</div>
        </h5>
        <table className="table table-sm table-borderless">
          <tbody>
            <tr>
              <td>
                <small className="ml-n1">Expected Payment</small>{' '}
              </td>
              <td>
                <h5>{moneyFormatInNaira(nextPayment.expectedAmount)}</h5>
              </td>
            </tr>
            <tr>
              <td>
                <small className="ml-n1">Due Date</small>{' '}
              </td>
              <td>
                <h5>{getTinyDate(nextPayment.expiresOn)}</h5>
              </td>
            </tr>
          </tbody>
        </table>

        <button
          className="btn btn-block btn-secondary"
          onClick={initiatePayment}
        >
          Make Payment
        </button>

        <section className="mt-5 mb-3">
          <div className="text-small">Contribution Progress</div>
          <div className="row">
            <div className="col-sm-12">
              <small style={{ paddingLeft: `${NOW - 5}%` }}>{NOW}%</small>
              <ProgressBar
                variant="success"
                now={NOW}
                label={`${NOW}%`}
                srOnly
              />
            </div>
          </div>
        </section>

        <table className="table table-sm table-borderless">
          <tbody>
            <tr>
              <td>
                <small className="ml-n1">Equity Amount</small>{' '}
              </td>
              <td>
                <h5>{moneyFormatInNaira(portfolio.totalAmountPayable)}</h5>
              </td>
            </tr>
            <tr>
              <td>
                <small className="ml-n1">Amount Contributed</small>{' '}
              </td>
              <td>
                <h5>{moneyFormatInNaira(portfolio.amountContributed)}</h5>
              </td>
            </tr>
            <tr className="border-top border-bottom">
              <td>
                <small className="ml-n1">Outstanding Balance</small>{' '}
              </td>
              <td>
                <h5>
                  {moneyFormatInNaira(
                    portfolio?.amountContributed - portfolio.totalAmountPayable
                  )}
                </h5>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="text-center mt-3">
          <Link
            to={`/user/offer/${portfolio._id}`}
            className="text-link text-secondary text-small"
          >
            View Offer Letter
          </Link>
          <LinkSeparator />
          <Link
            to="/users/transaction"
            className="text-link text-secondary text-small"
          >
            Transaction History
          </Link>
        </div>
      </Card>
    </>
  );
};

export default SinglePortfolio;
