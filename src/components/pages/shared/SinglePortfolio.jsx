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

  console.log(`portfolio`, portfolio);
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
          Sidebar={<AssignedPropertySidebar />}
        />
      </ContentLoader>
    </BackendPage>
  );
};

const NOW = 50;

const AssignedPropertySidebar = () => {
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
  return (
    <Card className="card-container property-holder">
      <table className="table table-sm table-borderless">
        <tbody>
          <tr>
            <td>
              <small className="ml-n1">Amount Contributed</small>{' '}
            </td>
            <td>
              <h5>N35,000,000</h5>
            </td>
          </tr>
          <tr>
            <td>
              <small className="ml-n1">Equity Contributed</small>{' '}
            </td>
            <td>
              <h5>N35,000,000</h5>
            </td>
          </tr>
        </tbody>
      </table>

      <small className="">Contribution Progress</small>

      <div className="row">
        <div className="col-sm-12">
          <small style={{ paddingLeft: `${NOW - 5}%` }}>{NOW}%</small>
          <ProgressBar variant="success" now={NOW} label={`${NOW}%`} srOnly />
        </div>
      </div>

      <hr className="my-4" />

      <small className="">Next Payment</small>
      <h5 className="text-center my-3">14th October 2020</h5>

      <button className="btn btn-block btn-secondary" onClick={initiatePayment}>
        Make Payment
      </button>
      <Link to="/users/transaction" className="small text-center mt-3">
        View Transaction History
      </Link>
    </Card>
  );
};

export default SinglePortfolio;
