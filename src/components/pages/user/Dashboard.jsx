import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { Card, ProgressBar } from 'react-bootstrap';
import { Link } from '@reach/router';
import { ReferIcon } from 'components/utils/Icons';
import { RightArrowIcon } from 'components/utils/Icons';
import HomeImage from 'assets/img/home.png';
import SearchForProperty from 'components/common/SearchDashboardPropertyForm';
import ContributionGraph from 'components/common/ContributionGraph';

const Dashboard = () => (
  <BackendPage>
    <Welcome />
    <Overview />
    <Others />
  </BackendPage>
);

const Welcome = () => (
  <section className="container-fluid">
    <div className="card bg-primary dashboard mb-3">
      <div className="row">
        <div className="col-sm-5">
          <h4>Hello, Danjuma </h4>
          <p className="lead">Welcome to BALL!</p>
        </div>
        <div className="col-sm-7">
          <section className="property-search__dashboard">
            <SearchForProperty />
          </section>
        </div>
      </div>
    </div>
  </section>
);

const Overview = () => (
  <div className="container-fluid ">
    <div className="row row-eq-height">
      <div className="col-sm-8">
        <ContributionGraph />
      </div>
      <div className="col-sm-4">
        <ReferAndEarn />
      </div>
    </div>
  </div>
);

const ReferAndEarn = () => (
  <section className="card d-block card-container h-100 text-center">
    <div className="icon-container">
      <ReferIcon width={48} height={48} />
    </div>
    <h5 className="mt-3">Refer and Earn</h5>
    <p className="">
      Refer your colleagues and friends to receive bonuses to grow your BALL net
      worth.
    </p>
    <Link to="/" className="btn btn-sm btn-secondary">
      Refer and Earn
    </Link>
  </section>
);

const Others = () => (
  <>
    <div className="container-fluid">
      <LinkHeader to="/" name="Overview" />
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

export default Dashboard;
