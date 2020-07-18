import React from 'react';
import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';
import SearchPropertyForm from 'components/common/SearchPropertyForm';
import Map from 'components/common/Map';
import { OFFICE_LOCATION } from 'helpers/constants';
import { ReactComponent as ApartmentIcon } from 'assets/img/icons/house-gray.svg';
import { ReactComponent as LocationIcon } from 'assets/img/icons/location-gray.svg';
import { ReactComponent as RangeLine } from 'assets/img/dashed-line.svg';
import Slider from 'react-rangeslider';

const SearchResult = () => (
  <>
    <Header />
    <SearchForm />
    <SearchResultContent />
    <Footer />
  </>
);

const SearchForm = () => (
  <section className="container-fluid property-search-holder">
    <div className="row">
      <section className="property-search__page  offset-lg-2 col-lg-8 my-3">
        <SearchPropertyForm />
      </section>
    </div>
  </section>
);

const SearchResultContent = () => (
  <div className="container-fluid search-result-section">
    <div className="row">
      <div className="col-lg-8 text-center">
        <h6 className="font-weight-normal mt-6">ⓘ Average property price</h6>
        <h2>NGN 35,000,000</h2>
        <ul className="list-inline">
          <li className="list-inline-item px-2">
            <LocationIcon /> Orchid Road Hotel, Lagos
          </li>
          <li className="list-inline-item px-2">
            <ApartmentIcon /> 3 bedroom
          </li>
        </ul>
        <div className="search-result-price-range">
          <RangeLine />
          <div className="row">
            <div className="col-lg-3 text-left pl-4">NGN 35,000,000</div>
            <div className="col-lg-6 text-center">
              ⓘ Property price range of the selected location
            </div>
            <div className="col-lg-3 text-right">NGN 35,000,000</div>
          </div>
        </div>
        <DefineYourEligibility />
      </div>
      <div
        className="col-lg-4 fixed-map"
        style={{ height: '33rem', position: 'fixed' }}
      >
        <Map coordinates={OFFICE_LOCATION} />
      </div>
    </div>
  </div>
);

const DefineYourEligibility = () => {
  const [value, setValue] = React.useState(0);
  return (
    <section className="eligibility-section">
      <div className="text-center">
        <h3>Define your eligibility</h3>
        <p>
          Fill in the details below to define your eligibility to owning this
          property
        </p>
      </div>

      <div className="row text-left eligibility-form mt-5">
        <section className="col-lg-8 offset-lg-2 bg-orange">
          <h5>Initial investment amount</h5>
          <p>
            Use the scroll bar or type in <br /> the desired amount
          </p>
          <div className="row">
            <div className="col-sm-6 col-12">
              <label htmlFor="initial-investment">NGN 500,000</label>
              <Slider
                min={0}
                max={100}
                value={value}
                onChange={(value) => setValue(value)}
              />
            </div>
            <div className="input-group col-sm-6 col-12">
              <div className="input-group-prepend">
                <span className="input-group-text" id="initial-investment">
                  NGN
                </span>
              </div>
              <input
                type="text"
                className="form-control investment-value-input initial-investment-input"
                name="initial-investment"
                placeholder="500,000"
                data-max-amount="35,000,000"
              />
            </div>
          </div>
        </section>

        <section className="col-lg-8 offset-lg-2 bg-blue">
          <h5>Investment Frequency</h5>
          <p>Select one of the options below</p>
          <div
            className="btn-group-toggle investment-options investment-options-quaterly"
            data-toggle="buttons"
          >
            <label className="col-sm-3 col-12 btn btn-sm option-btn">
              <input
                type="radio"
                className="investment-frequency"
                name="investment-frequency"
                defaultValue={1}
                id="option1"
                autoComplete="off"
              />{' '}
              Monthly
            </label>
            <label className="col-sm-1 col-12" />
            <label className="col-sm-3 col-12 btn btn-sm option-btn active">
              <input
                type="radio"
                className="investment-frequency"
                name="investment-frequency"
                defaultValue={4}
                id="option2"
                autoComplete="off"
                defaultChecked
              />{' '}
              Quarterly
            </label>
            <label className="col-sm-1 col-12" />
            <label className="col-sm-3 col-12 btn btn-sm option-btn">
              <input
                type="radio"
                className="investment-frequency"
                name="investment-frequency"
                defaultValue="0.5"
                id="option3"
                autoComplete="off"
              />{' '}
              Voluntarily
            </label>
            <label className="col-sm-1 col-12" />
          </div>
        </section>

        <section className="col-lg-8 offset-lg-2 bg-green">
          <h5>Periodic investment amount</h5>
          <p>
            Use the scroll bar or type in <br /> your desired amount
          </p>
          <div className="row custom-range-div">
            <div className="col-sm-6 col-12">
              <label htmlFor="periodic-investment">NGN 100,000</label>
              <Slider
                min={0}
                max={100}
                value={value}
                onChange={(value) => setValue(value)}
              />
            </div>
            <div className="input-group col-sm-6 col-12">
              <div className="input-group-prepend">
                <span className="input-group-text">NGN</span>
              </div>
              <input
                type="text"
                className="form-control investment-value-input periodic-investment-input"
                name="periodic-investment"
                placeholder="100,000"
                data-max-amount="35,000,000"
              />
            </div>
          </div>
        </section>
        <div className="col-lg-2" />
      </div>
      <div className="row search-calculate">
        <div className="col-lg-4 mx-auto">
          <button
            className="btn btn-secondary"
            name="calculate-investment"
            disabled
          >
            Calculate
          </button>
        </div>
      </div>
      {/* </form> */}
      <div
        className="row search-ready-investments search-ready-awesome-div"
        style={{ display: 'none' }}
      >
        <div className="col-lg-2" />
        <div className="col-lg-8 search-ready-awesome">
          <h3 className="search-ready-heading">Awesome!</h3>
          <p className="search-ready-text">
            You’re just one plan away from owning your home. <br /> Consider one
            of the plans below.
          </p>
          <div className="row">
            <div className="col-sm-1 col-12" />
            <div className="search-ready-awesome-recommendation col-sm-10 col-12" />
            <div className="col-sm-1 col-12" />
          </div>
          <br />
          <button className="btn search-ready-awesome-eligibility">
            <span>←</span> Redefine your eligibility status
          </button>
          <button className="btn search-ready-awesome-create">
            Create free account
          </button>
          <p className="search-ready-text-small">
            Open a free account and own your dream home
          </p>
        </div>
        <div className="col-lg-2" />
      </div>
    </section>
  );
};

export default SearchResult;
