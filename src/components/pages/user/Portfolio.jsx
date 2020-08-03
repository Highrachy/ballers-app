import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { Card, ProgressBar } from 'react-bootstrap';
import { Link } from '@reach/router';
import { RightArrowIcon } from 'components/utils/Icons';
import PropertyPlaceholderImage from 'assets/img/placeholder/property-holder.jpg';
import { MapPinIcon, MyPropertyIcon } from 'components/utils/Icons';

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
          <PropertyHolder />
        </div>
      </div>
    </div>

    <EnjoyingBallers />

    <div className="container-fluid">
      <h5 className="mt-4">Just for you (Recommended Properties)</h5>
      <div className="row">
        <div className="col-sm-6">
          <RecommendedProperty />
        </div>
        <div className="col-sm-6">
          <RecommendedProperty />
        </div>
      </div>
    </div>
  </>
);

const now = 60;
const color = 'success';
export const PropertyHolder = () => (
  <Link to="/user/portfolio/1">
    <Card className="card-container h-100 property-holder">
      <h5 className={`property-holder__title border-${color}`}>
        <span
          className={`badge badge-${color} property-holder__details float-right`}
        >
          Details <RightArrowIcon />
        </span>
        Property A
      </h5>
      <div className="row">
        <div className="col-md-5">
          <img
            src={PropertyPlaceholderImage}
            alt="Property"
            className="img-fluid property-holder__img"
          />
        </div>
        <div className="col-md-7 property-holder__icon">
          <div className="">Property Value</div>
          <h3>N 23,000,000</h3>
          <div className="property-holder__location">
            <MapPinIcon /> Ikate, Lagos state
          </div>
          <div className="property-holder__house-type">
            <MyPropertyIcon /> 3 bedroom flat
          </div>
          <div className="property-holder__payment-status">
            Overdue: -3 days{' '}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 mt-3">
          <div className="small" style={{ paddingLeft: `${now - 5}%` }}>
            {now}%
          </div>
          <ProgressBar variant="success" now={now} label={`${now}%`} srOnly />
          <div className="small">
            Amount Contributed: <strong>N 18,000 </strong>
            <span className="float-right text-green">Goal</span>
          </div>
        </div>
      </div>
    </Card>
  </Link>
);

export const RecommendedProperty = () => (
  <Card className="card-container property-holder">
    <div className="row">
      <div className="col-md-5">
        <img
          src={PropertyPlaceholderImage}
          alt=""
          className="img-fluid property-holder__img"
        />
      </div>
      <div className="col-md-7">
        <div>Blissville Condos</div>
        <div className="property-holder__location">
          Location: Ikate, Lagos state
        </div>
        <div className="property-holder__house-type">
          House Type: 3 bedroom flat
        </div>

        <h5 className="mt-2">N 23,000,000</h5>
        <span className="badge badge-light small float-right">
          Details <RightArrowIcon />
        </span>
      </div>
    </div>
  </Card>
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
            <Link to="/" className="btn btn-secondary">
              + Add a New Property
            </Link>
          </section>
        </div>
      </div>
    </div>
  </section>
);

export default Portfolio;
