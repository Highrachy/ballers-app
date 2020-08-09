import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import { Link } from '@reach/router';
import { RightArrowIcon } from 'components/utils/Icons';
import PropertyPlaceholderImage from 'assets/img/placeholder/property-holder.jpg';
import { MapPinIcon, MyPropertyIcon } from 'components/utils/Icons';

const now = 60;
const color = 'success';
export const OwnedPropertyCard = () => (
  <Card className="card-container h-100 property-holder">
    <h5 className={`property-holder__title border-${color}`}>
      <Link to="/user/portfolio/1">
        <span
          className={`badge badge-${color} property-holder__details float-right`}
        >
          Details <RightArrowIcon />
        </span>
      </Link>
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
        <div className="mt-3 mt-md-0">Property Value</div>
        <h3>N 23,000,000</h3>
        <div className="property-holder__location">
          <MapPinIcon /> Ikate, Lagos state
        </div>
        <div className="property-holder__house-type">
          <MyPropertyIcon /> 3 bedroom flat
        </div>
        <div className="property-holder__payment-status">Overdue: -3 days </div>
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

    <div className="button-container mt-4 d-block d-md-none">
      <Link to="/user/portfolio/1">
        <span className={`btn btn-${color} btn-block`}>
          Details <RightArrowIcon />
        </span>
      </Link>
    </div>
  </Card>
);

export const RecommendedPropertyCard = () => (
  <section className="mb-3">
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
          <h5 className="font-weight-500 mt-3 mt-md-0">Blissville Condos</h5>
          <div className="property-holder__location">
            Location: <strong>Ikate, Lagos state</strong>
          </div>
          <div className="property-holder__house-type">
            House Type: <strong>3 bedroom flat</strong>
          </div>

          <h5 className="mt-2">N 23,000,000</h5>
          <div className="property-holder__separator"></div>

          <span className={`badge badge-secondary property-holder__details`}>
            Mortgage
          </span>
          <span className={`badge badge-secondary property-holder__details`}>
            Mortgage 2
          </span>

          <span className="text-uppercase small float-right">
            Details{' '}
            <div className="small-icon">
              <RightArrowIcon />
            </div>
          </span>
        </div>
      </div>
    </Card>
  </section>
);

export default { OwnedPropertyCard, RecommendedPropertyCard };
