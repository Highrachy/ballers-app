import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { Card, ProgressBar } from 'react-bootstrap';
import { Link } from '@reach/router';
import { RightArrowIcon } from 'components/utils/Icons';
import PropertyPlaceholderImage from 'assets/img/placeholder/property-holder.jpg';
import { MapPinIcon } from 'components/utils/Icons';
import Map from 'components/common/Map';
import { OFFICE_LOCATION } from 'utils/constants';
import { CheckIcon, DownloadIcon } from 'components/utils/Icons';

const SinglePortfolio = () => (
  <BackendPage>
    <PropertyHolder />
  </BackendPage>
);

const NOW = 50;

const PropertyHolder = () => (
  <div className="container-fluid">
    <Card className="card-container h-100 property-holder__big">
      <div className="row">
        <div className="col-sm-10">
          <h3 className={`property-holder__big-title border-success`}>
            <span
              className={`badge badge-success property-holder__details float-right`}
            >
              Details <RightArrowIcon />
            </span>
            Property A
          </h3>
        </div>
      </div>
      <PropertyImage />
      <div className="row mt-5">
        <PropertyDescription />

        {/* Side Card */}
        <div className="col-sm-5">
          <aside className="ml-5">
            {<PropertySidebar /> || <AssignedPropertySidebar />}
          </aside>
        </div>
      </div>
      <Neighborhood />
    </Card>
    <PropertyMap />
  </div>
);

const PropertyImage = () => (
  <div className="row">
    <div className="col-sm-10">
      <img
        src={PropertyPlaceholderImage}
        alt="Property"
        className="img-fluid gallery-main-image"
      />
    </div>
    <div className="col-sm-2">
      <div className="gallery-holder-vertical">
        <img
          src={PropertyPlaceholderImage}
          alt="Property"
          className="img-fluid gallery-thumbnails"
        />
      </div>
      <div className="gallery-holder-vertical">
        <img
          src={PropertyPlaceholderImage}
          alt="Property"
          className="img-fluid gallery-thumbnails"
        />
      </div>
      <div className="gallery-holder-vertical">
        <img
          src={PropertyPlaceholderImage}
          alt="Property"
          className="img-fluid gallery-thumbnails"
        />
      </div>
      <div className="gallery-holder-vertical">
        <img
          src={PropertyPlaceholderImage}
          alt="Property"
          className="img-fluid gallery-thumbnails"
        />
      </div>
    </div>
  </div>
);

const PropertyDescription = () => (
  <div className="col-sm-7">
    <h5 className="mb-4">
      <span className="text-secondary">
        <MapPinIcon />
      </span>{' '}
      Off dreamworlds africana , at Km 20
    </h5>
    <div className="row">
      <div className="col-sm-4">
        <small>Property Value</small>
        <h5>N35,000,000</h5>
      </div>
      <div className="col-sm-4">
        <small>House Type</small>
        <h5>Apartment</h5>
      </div>
      <div className="col-sm-2">
        <small>Bedroom</small>
        <h5>3</h5>
      </div>
      <div className="col-sm-2">
        <small>Bathroom</small>
        <h5>4</h5>
      </div>
    </div>

    <h5 className="mt-5">About Property</h5>
    <p className="">
      You can now experience true tranquility with our elevated apartment units
      and penthouses. Each unit is a 3 bedroom 185MSq with maids room, four
      bathrooms and five toilets, living room, dining space, kitchen, pantry,
      guest toilet and dedicated parking lots. The standard apartments sit on
      the 2nd floor while the penthouses are on the 3rd floor. They are similar
      in design with three bedrooms each and an adjoining staff room. Owners of
      the apartments enjoy all the benefits that come with leaving in
      Blissville.
    </p>

    <div className="mt-5">
      <a href="/" className="btn-link icon-box">
        Download floor plans (PDF){' '}
        <span>
          <DownloadIcon />
        </span>
      </a>
    </div>
  </div>
);

const AssignedPropertySidebar = () => (
  <Card className="card-container property-holder">
    <table class="table table-sm table-borderless">
      <tbody>
        <tr>
          <td>
            <small className="ml-n1">Amount Contributed</small>{' '}
          </td>
          <td>
            <h5>N35,000,000</h5>
          </td>
        </tr>
        <tr>
          <td>
            <small className="ml-n1">Equity Contributed</small>{' '}
          </td>
          <td>
            <h5>N35,000,000</h5>
          </td>
        </tr>
      </tbody>
    </table>

    <small className="">Contribution Progress</small>

    <div className="row">
      <div className="col-sm-12">
        <small style={{ paddingLeft: `${NOW - 5}%` }}>{NOW}%</small>
        <ProgressBar variant="success" now={NOW} label={`${NOW}%`} srOnly />
      </div>
    </div>

    <hr className="my-4" />

    <small className="">Next Payment</small>
    <h5 className="text-center my-3">14th September 2020</h5>

    <button className="btn btn-block btn-secondary">Make Payment</button>
    <Link to="/users/transaction" className="small text-center mt-3">
      View Transaction History
    </Link>
  </Card>
);

const PropertySidebar = () => (
  <>
    <Card className="card-container property-holder bg-gray">
      <h5>Interested in this property?</h5>

      <p className="">Kindly proceed with property acquisition</p>
      <button className="btn btn-block btn-secondary my-3">Proceed</button>
    </Card>

    <h5 className="text-smaller">Schedule a tour</h5>
    <Card className="card-container property-holder bg-gray">
      <p className="mr-4">
        Want to come check the property?
        <br /> Request a visit.
      </p>
      <div className="circle-icon">
        <RightArrowIcon />
      </div>
    </Card>

    <h5 className="text-smaller">Request title document</h5>
    <Card className="card-container property-holder bg-gray">
      <p className="mr-4">Request a copy of the property document.</p>
      <div className="circle-icon bg-green">
        <RightArrowIcon />
      </div>
    </Card>
  </>
);

const Neighborhood = () => (
  <>
    <h5 className="mt-5">The neighbourhood</h5>
    <div className="row">
      <div className="col-sm-4">
        <NeighborhoodCheck name="Schools" color="blue" />
      </div>
      <div className="col-sm-4">
        <NeighborhoodCheck name="Hospitals" color="orange" />
      </div>
      <div className="col-sm-4">
        <NeighborhoodCheck name="Shopping Mall" color="purple" />
      </div>
      <div className="col-sm-4">
        <NeighborhoodCheck name="Entertainment" color="green" />
      </div>
      <div className="col-sm-4">
        <NeighborhoodCheck name="Restaurant & Bars" color="blue" />
      </div>
      <div className="col-sm-4">
        <NeighborhoodCheck name="Parks" color="pink" />
      </div>
    </div>
  </>
);

const NeighborhoodCheck = ({ name, color }) => (
  <div className="neighborhood-check icon-box">
    <span className={color}>
      <CheckIcon />
    </span>
    {name}
  </div>
);

const PropertyMap = () => (
  <div style={{ height: '15rem', marginTop: '-2px' }}>
    <Map coordinates={OFFICE_LOCATION} />
  </div>
);

export default SinglePortfolio;
