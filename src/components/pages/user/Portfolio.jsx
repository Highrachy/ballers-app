import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { Link } from '@reach/router';
import {
  OwnedPropertyCard,
  RecommendedPropertyCard,
} from 'components/common/PropertyCard';

const Portfolio = () => (
  <BackendPage>
    <Others />
  </BackendPage>
);

const Others = () => (
  <>
    <div className="container-fluid">
      <h5>Your active property</h5>
      <div className="row row-eq-height">
        <div className="col-sm-6">
          <OwnedPropertyCard />
        </div>
      </div>
    </div>

    <EnjoyingBallers />

    <div className="container-fluid">
      <h5 className="mt-4">Just for you (Recommended Properties)</h5>
      <div className="row">
        <div className="col-sm-6">
          <RecommendedPropertyCard />
        </div>
        <div className="col-sm-6">
          <RecommendedPropertyCard />
        </div>
      </div>
    </div>
  </>
);

const EnjoyingBallers = () => (
  <section className="container-fluid">
    <div className="card bg-primary dashboard mt-4 mb-3">
      <div className="row py-4">
        <div className="col-sm-8">
          <h4>Enjoying your balling experience </h4>
          <p className="lead">Expand your portfolio today</p>
        </div>
        <div className="col-sm-4">
          <section className="property-btn">
            <Link to="/user/just-for-you" className="btn btn-secondary">
              + Add a New Property
            </Link>
          </section>
        </div>
      </div>
    </div>
  </section>
);

export default Portfolio;
