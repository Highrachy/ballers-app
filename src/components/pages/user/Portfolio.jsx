import React from 'react';
import Sidebar from 'components/layout/Sidebar';
import TopBar from 'components/layout/TopBar';
import { Card, ProgressBar } from 'react-bootstrap';
import { Link } from '@reach/router';
import { RightArrowIcon } from 'components/utils/Icons';
import HomeImage from 'assets/img/home.png';

const Portfolio = () => {
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
        <Others />
      </div>
    </div>
  );
};

const Others = () => (
  <>
    <div className="container-fluid">
      <LinkHeader to="/" name="Just For You" />
      <div className="row row-eq-height">
        <div className="col-sm-6">
          <PropertyHolder />
        </div>
        <div className="col-sm-6">
          <EnjoyYourBallingExperience />
        </div>
      </div>

      <LinkHeader to="/" name="Just for you" />
      <div className="row">
        <div className="col-sm-6">
          <RecommendedProperty />
          <RecommendedProperty />
        </div>
      </div>
    </div>
  </>
);

const LinkHeader = ({ name, to }) => (
  <>
    <div className="link-header">
      <span>{name}</span>
      <Link to={to}>
        View All &nbsp;
        <RightArrowIcon />
      </Link>
    </div>
  </>
);

const now = 60;
const color = 'success';
const PropertyHolder = () => (
  <Card className="card-container h-100">
    <div className="property-holder">
      <div
        className={`badge badge-${color} property-holder__details float-right`}
      >
        Details <RightArrowIcon />
      </div>
      <h5 className={`property-holder__title border-${color}`}>Property A</h5>
      <div className="row">
        <div className="col-md-5">
          <img src={HomeImage} alt="" className="img-fluid" />
        </div>
        <div className="col-md-7">
          <div className="">Property Value</div>
          <h3>N 23,000,000</h3>
          <div className="property-holder__location">Ikate, Lagos state</div>
          <div className="property-holder__house-type">3 bedroom flat</div>
          <div className="property-holder__payment-status">
            Overdue: -3 days{' '}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div style={{ paddingLeft: `${now - 5}%` }}>{now}%</div>
          <ProgressBar variant="success" now={now} label={`${now}%`} srOnly />
          <div>
            Amount Contributed:N 18,000{' '}
            <span className="float-right">Goal</span>
          </div>
        </div>
      </div>
    </div>
  </Card>
);

const RecommendedProperty = () => (
  <Card className="card-container">
    <div className="property-holder">
      <div className="row">
        <div className="col-md-5">
          <img src={HomeImage} alt="" className="img-fluid" />
        </div>
        <div className="col-md-7">
          <div>Blissville Condos</div>
          <div className="property-holder__location">
            Location: Ikate, Lagos state
          </div>
          <div className="property-holder__house-type">
            House Type: 3 bedroom flat
          </div>

          <h3 className="mt-4">N 23,000,000</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="float-right">
            Details <RightArrowIcon />
          </div>
        </div>
      </div>
    </div>
  </Card>
);

const EnjoyYourBallingExperience = () => (
  <Card className="card-container text-center d-block h-100">
    <h5 className="mt-5">Enjoying your balling experience?</h5>
    <div>Expand your portfolio today</div>

    <div className="btn btn-secondary mt-5">Add a new property + </div>
  </Card>
);

export default Portfolio;
