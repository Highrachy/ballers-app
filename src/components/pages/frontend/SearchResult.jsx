import React from 'react';
import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';
import SearchPropertyForm from 'components/common/SearchPropertyForm';
import classNames from 'classnames';
import Map from 'components/common/Map';
import { ReactComponent as ApartmentIcon } from 'assets/img/icons/house-gray.svg';
import { ReactComponent as LocationIcon } from 'assets/img/icons/location-gray.svg';
import { ReactComponent as RangeLine } from 'assets/img/dashed-line.svg';
import Slider from 'react-rangeslider';
import { commaNumber, nearestMillion } from 'utils/helpers';
import {
  Tabs,
  Tab,
  OverlayTrigger,
  Popover,
  Accordion,
  Card,
} from 'react-bootstrap';
import { QuestionMarkIcon } from 'components/utils/Icons';
import { ArrowLeftIcon, ArrowDownIcon } from 'components/utils/Icons';
import NumberFormat from 'react-number-format';
import {
  recommendBallersPlan,
  FREQUENCY_IN_WORDS,
} from 'utils/search-result-helpers';
import { ContextAwareToggle } from 'components/common/FAQsAccordion';
import Axios from 'axios';
import useWindowSize from 'hooks/useWindowSize';
import * as queryString from 'query-string';

const SearchResult = ({ location }) => {
  const queryParams = queryString.parse(location.search);
  const { state, area, houseType } = queryParams;
  const [result, setResult] = React.useState(null);
  React.useEffect(() => {
    Axios.post('http://staging.ballers.ng/includes/find-house.php', {
      search: 'true',
      state,
      area,
      type: houseType,
    })
      .then(function (response) {
        const { status, data } = response;
        if (status === 200) {
          console.log('data', data);
          setResult(data);
        }
      })
      .catch(function (error) {
        console.log('error', error.response);
      });
  }, [area, houseType, state]);
  return (
    <>
      <Header />
      <SearchForm />
      {result ? <SearchResultContent result={result} /> : <h2>Loading...</h2>}
      <Footer />
    </>
  );
};
const SearchForm = () => (
  <section className="container-fluid property-search-holder">
    <div className="row">
      <section className="property-search__page  offset-lg-2 col-lg-8 my-3">
        <SearchPropertyForm />
      </section>
    </div>
  </section>
);

// {type: "3 bedroom", price: "27000000", area_name: "Lekki Phase 1", latitude: "6.4698", longitude: "3.5852", …}

const SearchResultContent = ({ result }) => {
  // const testObject = {
  //   averagePropertyCost: 20000000,
  //   frequency: 1,
  //   initial: 10000000,
  //   output: [
  //     {
  //       title: `Rent-to-own`,
  //       advice: `Build equity to start rent to own`,
  //     },
  //     {
  //       title: `Hybrid`,
  //       advice: `A whole new solution that combines solutions to make owning your home a whole lot easier`,
  //     },
  //     { title: 'Ineligible', advice: "You're almost there, keep contributing" },
  //   ],
  //   periodic: 10000,
  // };
  const [showResultCard, setshowResultCard] = React.useState(false);
  const [output, setOutput] = React.useState({});

  const findEligibilityResult = ({ initial, frequency, periodic }) => {
    const averagePropertyCost = 20000000;
    const recommendations = recommendBallersPlan({
      initial,
      frequency,
      periodic,
      averagePropertyCost,
    });
    setOutput(recommendations);

    setshowResultCard(true);
    console.log('result', recommendations);
  };

  return (
    <div className="container-fluid search-result-section">
      <div className="row">
        <div className="col-lg-8 text-center">
          <section className="search-result__card">
            <h6 className="font-weight-normal">ⓘ Average property price</h6>
            <h2>{nearestMillion(result.price)}</h2>
            <ul className="list-inline">
              <li className="list-inline-item px-2">
                <LocationIcon /> {result.area_name}, {result.state}
              </li>
              <li className="list-inline-item px-2">
                <ApartmentIcon /> {result.type}
              </li>
            </ul>
            <div className="search-result-price-range">
              <RangeLine />
              <div className="row">
                <div className="col-lg-3 text-left pl-4 font-weight-bold">
                  {nearestMillion(result.minimum_price)}
                </div>
                <div className="col-lg-6 text-center text-secondary">
                  ⓘ Property price range of the selected location
                </div>
                <div className="col-lg-3 text-right font-weight-bold">
                  {nearestMillion(result.maximum_price)}
                </div>
              </div>
            </div>
          </section>
          {showResultCard ? (
            <ResultCard result={output} />
          ) : (
            <DefineYourEligibility
              findEligibilityResult={findEligibilityResult}
              result={result}
            />
          )}
        </div>
        <div className="col-lg-4 search-result-map">
          {result && (
            <Map
              coordinates={{
                lng: result.longitude,
                lat: result.latitude,
              }}
              pinColor="red"
            />
          )}
        </div>
      </div>
    </div>
  );
};

const RangeInput = ({ name, min, max, step, title, handleChange, inputs }) => (
  <>
    <h5>{title}</h5>
    <p>Use the scroll bar or type in the desired amount</p>
    <div className="row search-result-range">
      <div className="col-sm-6 col-12 search-result-range-label">
        <label htmlFor="initial-investment">
          NGN {!!inputs[name] && commaNumber(inputs[name])}
        </label>
        <Slider
          min={parseInt(min, 10)}
          max={parseInt(max, 10)}
          step={step}
          tooltip={false}
          value={inputs[name] || max / 2}
          onChange={(value) => handleChange(name, value)}
        />
      </div>
      <div className="input-group col-sm-6 col-12 ">
        <div className="input-group-prepend">
          <span className="input-group-text">NGN</span>
        </div>
        <NumberFormat
          type="text"
          className="form-control investment-value-input initial-investment-input"
          name={name}
          value={!!inputs[name] && `NGN ${commaNumber(inputs[name])}`}
          onValueChange={({ value }) => handleChange(name, value)}
          placeholder="500,000"
          thousandSeparator={true}
          prefix=""
        />
      </div>
    </div>
  </>
);

const DefineYourEligibility = ({ findEligibilityResult, result }) => {
  const [inputs, setInputs] = React.useState({
    initial: 0,
    periodic: 0,
    frequency: 1,
  });

  const handleChange = (name, value) => {
    setInputs({
      ...inputs,
      [name]: parseInt(value, 10),
    });
  };

  const OptionButton = ({ name, value }) => (
    <button
      className={classNames('col-sm-3 btn btn-sm option-btn', {
        active: value === inputs.frequency,
      })}
      onClick={() =>
        setInputs({
          ...inputs,
          frequency: value,
        })
      }
    >
      {name}
    </button>
  );

  const enableCalculateButton = !!inputs['initial'] && !!inputs['periodic'];

  return (
    <section className="eligibility-section search-result__card">
      <div className="text-center">
        <h3>Define your eligibility</h3>
        <p className="lead-header">
          Fill in the details below to define your eligibility to owning this
          property
        </p>
      </div>

      <div className="row text-left eligibility-form mt-5">
        <section className="col-12 bg-orange">
          <RangeInput
            min={10000}
            max={result.price}
            name="initial"
            title="Initial investment amount"
            step={100000}
            handleChange={handleChange}
            inputs={inputs}
          />
        </section>

        <section className="col-12 bg-blue">
          <h5>Investment Frequency</h5>
          <p>Select one of the options below</p>
          <div className="btn-group-toggle row" data-toggle="buttons">
            <OptionButton name="Bi-Weekly" value={0.5} />
            <OptionButton name="Monthly" value={1} />
            <OptionButton name="Quarterly" value={4} />
          </div>
        </section>

        <section className="col-12 bg-green">
          <RangeInput
            min={10000}
            max={result.price}
            name="periodic"
            title="Periodic investment amount"
            step={10000}
            handleChange={handleChange}
            inputs={inputs}
          />
        </section>
      </div>
      <div className="row search-calculate">
        <div className="col-lg-4 mx-auto">
          <button
            className="btn btn-secondary"
            name="calculate-investment"
            disabled={!enableCalculateButton}
            onClick={() => findEligibilityResult(inputs)}
          >
            Calculate
          </button>
        </div>
      </div>
    </section>
  );
};

const ResultCard = ({ result }) => {
  const MOBILE_VIEW = 576;
  const WINDOW_SIZE = useWindowSize();
  return (
    <div className="search-result__card result-card">
      <h3>Awesome!</h3>
      <section className="text-center awesome-text mb-5">
        With an initial investment off{' '}
        <span>NGN {commaNumber(result.initial)}</span>
        <br />
        and a <span>{FREQUENCY_IN_WORDS[result.frequency]}</span> contribution
        of <span>NGN {commaNumber(result.periodic)}</span>
        <br />
        You’re a plan away from owning your home.
      </section>

      <div className="row">
        <div className="offset-lg-1 col-lg-10">
          {WINDOW_SIZE.width <= MOBILE_VIEW ? (
            <Accordion
              className="search-result-tab-accordion"
              defaultActiveKey={0}
            >
              {result.output.map(({ title, advice }, index) => (
                <Card key={index}>
                  <Accordion.Toggle
                    as={Card.Header}
                    variant="link"
                    eventKey={index}
                  >
                    <ContextAwareToggle
                      iconOpen={<ArrowDownIcon />}
                      iconClose={<ArrowDownIcon />}
                      eventKey={index}
                    >
                      <TabTitle title={title} content={advice} />
                    </ContextAwareToggle>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={index}>
                    <Card.Body>{advice}</Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))}
            </Accordion>
          ) : (
            <Tabs defaultActiveKey={0}>
              {result.output.map(({ title, advice }, index) => (
                <Tab
                  key={index}
                  eventKey={index}
                  title={<TabTitle title={title} content={advice} />}
                >
                  <div className="search-result-tab-content">{advice}</div>
                </Tab>
              ))}
            </Tabs>
          )}
        </div>
      </div>

      <div className="button-container mt-5 mb-3">
        <button className="btn btn-link">
          <ArrowLeftIcon /> Redefine your Eligibility status
        </button>

        <a href="./" className="btn btn-success">
          Create a free account
        </a>
      </div>
      <small className="text-primary">
        Open a free account and own your dream home
      </small>
    </div>
  );
};

const TabTitle = ({ title, content }) => (
  <>
    {title}
    <OverlayTrigger
      trigger={['hover', 'focus']}
      placement="right"
      overlay={
        <Popover>
          <Popover.Title as="h6">{title} Package</Popover.Title>
          <Popover.Content>{content}</Popover.Content>
        </Popover>
      }
    >
      <span>
        &nbsp;
        <QuestionMarkIcon />
      </span>
    </OverlayTrigger>
  </>
);

export default SearchResult;
