import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { Card } from 'react-bootstrap';
import { Link } from '@reach/router';
import { ReferIcon } from 'components/utils/Icons';
import { RightArrowIcon } from 'components/utils/Icons';
import SearchForProperty from 'components/common/SearchDashboardPropertyForm';
import ContributionGraph from 'components/common/ContributionGraph';
import {
  OwnedPropertyCard,
  RecommendedPropertyCard,
} from 'components/common/PropertyCard';

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
          <OwnedPropertyCard />
        </div>
        <div className="col-sm-6">
          <EnjoyYourBallingExperience />
        </div>
      </div>

      <LinkHeader to="/" name="Just for you" />
      <div className="row">
        <div className="col-sm-6">
          <RecommendedPropertyCard />
          <RecommendedPropertyCard />
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

const EnjoyYourBallingExperience = () => (
  <Card className="card-container text-center d-block h-100">
    <h5 className="mt-5">Enjoying your balling experience?</h5>
    <div>Expand your portfolio today</div>

    <div className="btn btn-secondary mt-5">Add a new property + </div>
  </Card>
);

export default Dashboard;
