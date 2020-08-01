import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Card } from 'react-bootstrap';

const ContributionGraph = () => (
  <Card className="card-container h-100">
    <div className="row">
      <div className="col-sm-4">
        <h6>No Active Contributions</h6>
      </div>
      <div className="col-sm-4">
        <div className="ml-n5 mr-n5">
          <Doughnut
            data={{
              labels: ['Red', 'Green', 'Yellow'],
              datasets: [
                {
                  data: [2, 6, 1],
                  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                  hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                },
              ],
            }}
            options={{
              responsive: true,
              rotation: -0.5,
              maintainAspectRatio: true,
              cutoutPercentage: 75,
              legend: {
                display: false,
              },
            }}
          />
        </div>
        <h5 className="text-center mt-3">Testing 123</h5>
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
  <div className={`circle circle-${color}`}>
    {title}
    <br />
    <strong>N {price}</strong>
  </div>
);

export default ContributionGraph;
