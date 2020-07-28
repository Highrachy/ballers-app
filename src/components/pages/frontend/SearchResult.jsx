import React from 'react';
import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';
import SearchPropertyForm from 'components/common/SearchPropertyForm';
import classNames from 'classnames';
import Map from 'components/common/Map';
import { OFFICE_LOCATION } from 'utils/constants';
import { ReactComponent as ApartmentIcon } from 'assets/img/icons/house-gray.svg';
import { ReactComponent as LocationIcon } from 'assets/img/icons/location-gray.svg';
import { ReactComponent as RangeLine } from 'assets/img/dashed-line.svg';
import Slider from 'react-rangeslider';
import { getNairaSymbol, commaNumber } from 'utils/helpers';
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

const SearchResult = ({ state, area, houseType }) => {
  console.log('state, area, houseType', state, area, houseType);
  return (
    <>
      <Header />
      <SearchForm />
      <SearchResultContent />
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

const SearchResultContent = () => {
  const testObject = {
    averagePropertyCost: 20000000,
    frequency: 1,
    initial: 10000000,
    output: [
      {
        title: `Rent-to-own`,
        advice: `Build equity to start rent to own`,
      },
      {
        title: `Hybrid`,
        advice: `A whole new solution that combines solutions to make owning your home a whole lot easier`,
      },
      { title: 'Ineligible', advice: "You're almost there, keep contributing" },
    ],
    periodic: 10000,
  };
  const [showResultCard, setshowResultCard] = React.useState(false);
  const [result, setResult] = React.useState(testObject);

  const findEligibilityResult = ({ initial, frequency, periodic }) => {
    const averagePropertyCost = 20000000;
    const recommendations = recommendBallersPlan({
      initial,
      frequency,
      periodic,
      averagePropertyCost,
    });
    setResult(recommendations);

    setshowResultCard(true);
    console.log('result', recommendations);
  };

  return (
    <div className="container-fluid search-result-section">
      <div className="row">
        <div className="col-lg-8 text-center">
          <section className="search-result__card">
            <h6 className="font-weight-normal">ⓘ Average property price</h6>
            <h2>{getNairaSymbol()}35,000,000</h2>
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
                <div className="col-lg-3 text-left pl-4 font-weight-bold">
                  {getNairaSymbol()} 35,000,000
                </div>
                <div className="col-lg-6 text-center text-secondary">
                  ⓘ Property price range of the selected location
                </div>
                <div className="col-lg-3 text-right font-weight-bold">
                  {getNairaSymbol()} 35,000,000
                </div>
              </div>
            </div>
          </section>
          {showResultCard ? (
            <ResultCard result={result} />
          ) : (
            <DefineYourEligibility
              findEligibilityResult={findEligibilityResult}
            />
          )}
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
};

const RangeInput = ({ name, min, max, step, title, handleChange, inputs }) => (
  <>
    <h5>{title}</h5>
    <p>Use the scroll bar or type in the desired amount</p>
    <div className="row">
      <div className="col-sm-6 col-12">
        <label htmlFor="initial-investment">
          NGN {!!inputs[name] && commaNumber(inputs[name])}
        </label>
        <Slider
          min={min}
          max={max}
          step={step}
          tooltip={false}
          value={inputs[name] || max / 2}
          onChange={(value) => handleChange(name, value)}
        />
      </div>
      <div className="input-group col-sm-6 col-12">
        <div className="input-group-prepend">
          <span className="input-group-text" id="initial-investment">
            NGN
          </span>
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

const DefineYourEligibility = ({ findEligibilityResult }) => {
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

  // const OptionButton = ({ name, value }) => (
  //   <label
  //     className={classNames('btn btn-sm option-btn', {
  //       active: value === inputs.frequency,
  //     })}
  //   >
  //     <input
  //       type="radio"
  //       name="frequency"
  //       value={value}
  //       onClick={() =>
  //         setInputs({
  //           ...inputs,
  //           frequency: value,
  //         })
  //       }
  //     />{' '}
  //     {name}
  //   </label>
  // );

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
            min={100}
            max={500000}
            name="initial"
            title="Initial investment amount"
            step={1}
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
            min={100}
            max={10000}
            name="periodic"
            title="Periodic investment amount"
            step={1}
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
          <Tabs defaultActiveKey={0}>
            {result.output.map(({ title, advice }, index) => (
              <Tab
                key={index}
                eventKey={index}
                title={<TabTitle title={`${title} Package`} content={advice} />}
              >
                <div className="search-result-tab-content">{advice}</div>
              </Tab>
            ))}
          </Tabs>

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
          <Popover.Title as="h6">{title}</Popover.Title>
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
