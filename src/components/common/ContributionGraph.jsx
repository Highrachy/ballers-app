import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Card } from 'react-bootstrap';
import Axios from 'axios';
import { BASE_API_URL } from 'utils/constants';
import Toast, { useToast } from 'components/utils/Toast';
import { getTokenFromStore } from 'utils/localStorage';
import { getError, moneyFormatInNaira } from 'utils/helpers';

const PROPERTY_COLOR = '#2dca73';
const CONTRIBUTION_REWARD_COLOR = '#161d3f';
const REFERRAL_COLOR = '#F79B18';

const ContributionGraph = () => {
  const [toast, setToast] = useToast();
  const initialOverview = {
    contributionReward: 0,
    totalAmountPaid: 0,
    referralRewards: 0,
  };
  const [accountOverview, setaccountOverview] = React.useState({
    ...initialOverview,
    loading: true,
  });
  React.useEffect(() => {
    Axios.get(`${BASE_API_URL}/user/account-overview`, {
      headers: {
        Authorization: getTokenFromStore(),
      },
    })
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setaccountOverview({ ...data.accountOverview, loading: false });
        }
      })
      .catch(function (error) {
        setaccountOverview({ ...initialOverview, loading: false });
        setToast({
          message: getError(error),
        });
      });
  }, [setToast, initialOverview]);
  return (
    <Card className="card-container h-100">
      <Toast {...toast} showToastOnly />
      <div className="row">
        <div className="col-sm-4">
          <h6>Transactions</h6>
          <OverviewPrice
            title="Property"
            color="green"
            price={
              accountOverview.loading
                ? '-'
                : moneyFormatInNaira(accountOverview.totalAmountPaid)
            }
          />
        </div>
        <div className="col-sm-4">
          <div className="ml-n5 mr-n5">
            <Doughnut
              data={{
                labels: ['Property', 'Contribution Rewards', 'Referral Bonus'],
                datasets: [
                  {
                    data: [
                      accountOverview.totalAmountPaid || 1,
                      accountOverview.contributionReward,
                      accountOverview.referralRewards,
                    ],
                    backgroundColor: [
                      PROPERTY_COLOR,
                      CONTRIBUTION_REWARD_COLOR,
                      REFERRAL_COLOR,
                    ],
                  },
                ],
              }}
              options={{
                responsive: true,
                rotation: 1,
                maintainAspectRatio: true,
                cutoutPercentage: 75,
                legend: {
                  display: false,
                },
              }}
            />
          </div>
          <h5 className="text-center mt-3">
            {accountOverview.loading
              ? '-'
              : moneyFormatInNaira(
                  accountOverview.totalAmountPaid +
                    accountOverview.contributionReward +
                    accountOverview.referralRewards
                )}
          </h5>
          <p className="text-center  mb-0">
            My BALL <span className="text-orange">Net Worth</span>
          </p>
        </div>
        <div className="col-sm-4">
          <h6>Earnings</h6>
          <OverviewPrice
            title="Contribution Rewards"
            color="purple"
            price={
              accountOverview.loading
                ? '-'
                : moneyFormatInNaira(accountOverview.contributionReward)
            }
          />
          <OverviewPrice
            title="Referral Bonus"
            color="orange"
            price={
              accountOverview.loading
                ? '-'
                : moneyFormatInNaira(accountOverview.referralRewards)
            }
          />
        </div>
      </div>
    </Card>
  );
};

const OverviewPrice = ({ color, title, price }) => (
  <div className={`overview-price__circle overview-price__circle-${color}`}>
    <span className="overview-price__title">{title}</span>
    <strong className="overview-price__amount">{price}</strong>
  </div>
);

export default ContributionGraph;
