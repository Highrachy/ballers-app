import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Card } from 'react-bootstrap';

const PROPERTY_COLOR = '#2dca73';
const CONTRIBUTION_REWARD_COLOR = '#161d3f';
const REFERRAL_COLOR = '#F79B18';

const ContributionGraph = () => (
  <Card className="card-container h-100">
    <div className="row">
      <div className="col-sm-4">
        <h6>No Active Contributions</h6>
        <OverviewPrice title="Property A" color="green" price={0} />
      </div>
      <div className="col-sm-4">
        <div className="ml-n5 mr-n5">
          <Doughnut
            data={{
              labels: ['Property', 'Contribution Rewards', 'Referral Bonus'],
              datasets: [
                {
                  data: [6, 2, 1],
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
        <h5 className="text-center mt-3">N23,000,000</h5>
        <p className="text-center  mb-0">
          My BALL <span className="text-orange">Net Worth</span>
        </p>
      </div>
      <div className="col-sm-4">
        <h6>Earnings</h6>
        <OverviewPrice title="Contribution Rewards" color="purple" price={0} />
        <OverviewPrice title="Referral Bonus" color="orange" price={0} />
      </div>
    </div>
  </Card>
);

const OverviewPrice = ({ color, title, price }) => (
  <div className={`overview-price__circle overview-price__circle-${color}`}>
    <span className="overview-price__title">{title}</span>
    <strong className="overview-price__amount">N {price}</strong>
  </div>
);

export default ContributionGraph;
