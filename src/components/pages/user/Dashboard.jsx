import React from 'react';
import Sidebar from 'components/layout/Sidebar';
import { Doughnut } from 'react-chartjs-2';
import TopBar from 'components/layout/TopBar';
import { Card } from 'react-bootstrap';
import { Link } from '@reach/router';

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const closeSidebar = () => {
    document.body.classList.remove('modal-open');
    setShowSidebar(false);
  };

  return (
    <div>
      <Sidebar closeSidebar={closeSidebar} showSidebar={showSidebar} />

      {/* Content Page */}
      <div className="content-page">
        <TopBar />
        <Overview />
        <Others />
      </div>
    </div>
  );
};

const Overview = () => (
  <div className="container-fluid ">
    <div className="row">
      <div className="col-sm-8">
        <ContributionGraph />
      </div>
      <div className="col-sm-4">
        <ReferAndEarn />
      </div>
    </div>
  </div>
);

const ContributionGraph = () => (
  <Card className="card-container">
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
              // datasets: [
              //   {
              //     data: [1],
              //     backgroundColor: ['#000000'],
              //     hoverBackgroundColor: ['#111111'],
              //   },
              // ],
            }}
            options={{
              responsive: true,
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

const ReferAndEarn = () => (
  <section className="card">
    <h4>Refer and Earn</h4>
    <p className="">
      Refer your colleagues and friends to receive bonuses to grow your BALL net
      worth.
    </p>
    <Link to="/" className="btn btn-secondary">
      Refer and Earn
    </Link>
  </section>
);

const Others = () => (
  <>
    <div className="card">
      <div className="row no-gutters align-items-center">
        <div className="col-md-5">
          <img
            src="assets/images/small/img-6.jpg"
            className="card-img"
            alt="..."
          />
        </div>
        <div className="col-md-7">
          <div className="card-body">
            <h5 className="card-title font-size-16">Card title</h5>
            <p className="card-text text-muted">
              This is a wider card with supporting text lead-in to additional
              content.
            </p>
            <p className="card-text">
              <small className="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Dashboard;
