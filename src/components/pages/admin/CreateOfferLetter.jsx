import React from 'react';
import { Card } from 'react-bootstrap';
import {
  setInitialValues,
  DisplayFormikState,
} from 'components/forms/form-helper';
import Button from 'components/forms/Button';
import { Formik, Form } from 'formik';
import { createSchema } from 'components/forms/schemas/schema-helpers';
import Select from 'components/forms/Select';
import Toast, { useToast } from 'components/utils/Toast';
import Textarea from 'components/forms/Textarea';
import {
  generateNumOptions,
  moneyFormatInNaira,
  numToWords,
  numToOrdinal,
  moneyFormat,
} from 'utils/helpers';
import { offerLetterSchema } from 'components/forms/schemas/propertySchema';
import InputFormat from 'components/forms/InputFormat';
import HighrachyLogo from 'assets/img/logo/highrachy-logo.png';
import Input from 'components/forms/Input';

const CreateOfferLetter = ({ enquiry }) => {
  console.log('enquiry', enquiry);
  const defaultValue = {
    totalAmountPayable: enquiry.propertyInfo[0].price,
    allocation: 50,
    initialPayment: enquiry.initialInvestmentAmount,
    monthlyPayment: '5000000',
    paymentFrequency: enquiry.investmentFrequency,
    offerExpires: '7',
    titleDocument:
      'Deed of Assignment for one unit of 3 bedroom apartment within the buildings sited on land covered by duly registered, Governor Consented deed of assignment dated the 20th day of May, 2016 and registered as No. 87 at page 87 in volume 2547v at the office of the Lagos State Land Registry, Ikeja.',
    deliveryState:
      'The subject property will be delivered as a finished unit inclusive of Wall painting, floor tiling, and POP ceilings, joinery, internal and external doors, electrical and mechanical fittings and fixtures as prescribed by the project drawings and specification documents. The externals walls will also be finished in line with standard Blissville specifications.',
  };
  const [value, setValue] = React.useState(defaultValue);
  const [showOfferLetter, setShowOfferLetter] = React.useState(false);
  console.log('value', value);

  return (
    <>
      {showOfferLetter ? (
        <OfferLetterTemplate
          handleHideOfferLetter={() => setShowOfferLetter(false)}
          value={value}
        />
      ) : (
        <CreateOfferLetterForm
          handleShowOfferLetter={() => setShowOfferLetter(true)}
          handleValue={(value) => setValue(value)}
          value={value}
        />
      )}
    </>
  );
};

const CreateOfferLetterForm = ({
  handleShowOfferLetter,
  handleValue,
  value,
}) => {
  const [toast] = useToast();

  return (
    <div className="container-fluid">
      <Card className="mt-4">
        <section className="row">
          <div className="col-md-10 p-5">
            <h5>Create Offer Letter</h5>

            <Formik
              enableReinitialize={true}
              initialValues={setInitialValues(offerLetterSchema, { ...value })}
              onSubmit={(values, actions) => {
                handleValue(values);
                handleShowOfferLetter();
                // Axios.put(`${BASE_API_URL}/user/update`, values, {
                //   headers: { Authorization: getTokenFromStore() },
                // })
                //   .then(function (response) {
                //     const { status, data } = response;
                //     if (status === 200) {
                //       // userDispatch({
                //       //   type: 'user-profile-update',
                //       //   user: data.updatedUser,
                //       // });
                //       // setToast({
                //       //   type: 'success',
                //       //   message: `Your profile has been successfully updated`,
                //       // });
                //       actions.setSubmitting(false);
                //     }
                //   })
                //   .catch(function (error) {
                //     setToast({
                //       message: getError(error),
                //     });
                //     actions.setSubmitting(false);
                //   });
              }}
              validationSchema={createSchema(offerLetterSchema)}
            >
              {({ isSubmitting, handleSubmit, ...props }) => (
                <Form>
                  <Toast {...toast} />
                  <div className="form-row">
                    <InputFormat
                      formGroupClassName="col-md-6"
                      label="Total Amount Payable"
                      name="totalAmountPayable"
                      placeholder="Total Amount Payable"
                    />
                    <Input
                      formGroupClassName="col-md-6"
                      label="Allocation In Percentage"
                      name="allocation"
                      type="number"
                      max={100}
                      min={0}
                      placeholder="Allocation"
                      tooltipText="The number of deposits to be made before prpoerty is allocated"
                    />
                  </div>
                  <div className="form-row">
                    <InputFormat
                      formGroupClassName="col-md-6"
                      label="Initial Payment"
                      name="initialPayment"
                      placeholder="Initial Payment"
                    />
                    <InputFormat
                      formGroupClassName="col-md-6"
                      label="Monthly Payment"
                      name="monthlyPayment"
                      placeholder="Monthly Payment"
                    />
                  </div>
                  <div className="form-row">
                    <Select
                      formGroupClassName="col-md-6"
                      label="Payment Frequency"
                      name="paymentFrequency"
                      placeholder="Payment Frequency"
                      options={[
                        { value: 0.5, label: 'Bi-Weekly' },
                        { value: 1, label: 'Monthly' },
                        { value: 3, label: 'Quarterly' },
                      ]}
                    />
                    <Select
                      formGroupClassName="col-md-6"
                      label="Offer Expires in"
                      name="offerExpires"
                      options={generateNumOptions(11, 'Day', { startFrom: 5 })}
                      placeholder="Allocation Month"
                    />
                  </div>

                  <Textarea
                    label="Title Document"
                    name="titleDocument"
                    placeholder="A detailed description of the property"
                    rows="5"
                  />

                  <Textarea
                    label="Delivery State"
                    name="deliveryState"
                    placeholder="A detailed description of the property"
                    rows="4"
                  />

                  <Button
                    className="btn-secondary mt-4"
                    loading={isSubmitting}
                    onClick={handleSubmit}
                  >
                    View Offer Letter
                  </Button>
                  <DisplayFormikState {...props} showAll />
                </Form>
              )}
            </Formik>
          </div>
        </section>
      </Card>
    </div>
  );
};

const OfferLetterTemplate = ({ handleHideOfferLetter, value }) => {
  const {
    totalAmountPayable,
    initialPayment,
    monthlyPayment,
    // paymentFrequency,
  } = value;
  const rangePrice = totalAmountPayable - initialPayment;
  const noOfMonths = Math.floor(rangePrice / monthlyPayment) || 1;
  const lastPayment = rangePrice - monthlyPayment * noOfMonths;
  console.log('noOfMonths', noOfMonths);
  return (
    <div className="container-fluid">
      <h4 className="text-center">
        Offer Letter (Expires in {value.offerExpires} days)
      </h4>
      <Card className="mt-4 p-5">
        <img
          src={HighrachyLogo}
          width="150"
          className="img-fluid"
          alt="Highrachy Logo"
        />
        <p className="mt-4">
          Our Ref: BVC01/OLAXXXX2019
          <span className="float-right">15th August, 2020</span>
        </p>

        <strong>
          Mr. Oladele Ademola <br />
        </strong>
        <address>
          15, Sebiotimo Street,
          <br /> Lekki Phase 1,
          <br /> Lagos.
        </address>

        <p className="">Dear Sir/Ma,</p>

        <strong>
          RE: BLISSVILLE, LEKKI LAGOS - LETTER OF OFFER FOR 3 BEDROOM APARTMENT
        </strong>

        <p className="">
          We refer to your application to purchase a unit in Blissville
          residential estate on Elder Nwuba Street, Off Dreamworld Africana Way,
          KM 20 Lekki – Epe expressway, Lekki, Lagoss and are pleased to offer
          you a 3 BEDROOM APARTMENT on the following terms and conditions:
        </p>
        <div className="table-responsive">
          <table className="table table-md table-borderless">
            <tbody>
              <tr>
                <td width="30%">
                  <strong>1. VENDOR:</strong>
                </td>
                <td>
                  <strong>Highrachy Investment and Technology Ltd</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>2. BUYER:</strong>
                </td>
                <td>
                  <strong>Mr. Oladele Ademola </strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>3. PROPERTY DESCRIPTION:</strong>
                </td>
                <td>
                  1 Unit of a 3 bedroom Apartment in a “condominium style” with
                  adjoining room situate on Elder Nwuba Street, off Dreamworld
                  Africana way, KM 20, Lekki /Epe expressway, Lekki, Lagos.
                </td>
              </tr>
              <tr>
                <td>
                  <strong>4. TITLE:</strong>{' '}
                </td>
                <td>{value.titleDocument}</td>
              </tr>
              <tr>
                <td>
                  <strong>5. SELLING PRICE:</strong>{' '}
                </td>
                <td>
                  {`${moneyFormatInNaira(
                    value.totalAmountPayable
                  )} (${numToWords(
                    value.totalAmountPayable
                  )} Naira only), payable as
                  provided in clause 6 below.`}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>6. PAYMENT TERMS</strong>{' '}
                </td>
                <td>Spread payment, see breakdown below;</td>
              </tr>
              <tr>
                <td colSpan="2">
                  <div className="table-responsive table-sm">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>DEPOSIT</th>
                          {/* <td>Payment Date</td> */}
                          <th>SUM DUE (N)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Initial Deposit</td>
                          {/* <td>Immediate</td> */}
                          <td>{moneyFormat(initialPayment)}</td>
                        </tr>
                        {noOfMonths > 0 &&
                          [...Array(noOfMonths).keys()].map((value, index) => (
                            <tr key={index}>
                              <td>{numToOrdinal(index + 2)} Deposit</td>
                              {/* <td>April 2019</td> */}
                              <td>{moneyFormat(monthlyPayment)}</td>
                            </tr>
                          ))}
                        {lastPayment > 0 && (
                          <tr>
                            <td>Last Deposit</td>
                            {/* <td>May 2019</td> */}
                            <td>{moneyFormat(lastPayment)}</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>7. FACILITIES / SERVICES PROVIDED:</strong>
                </td>
                <td>
                  <ul>
                    <li>Grid Power supply</li>
                    <li>Borehole and Water treatment plant</li>
                    <li> Dedicated parking for 2 cars </li>
                    <li>Intercom system </li>
                    <li>Alternative power supply</li>
                    <li> Perimeter fence</li>
                  </ul>
                </td>
              </tr>

              <tr>
                <td>
                  <strong>8. DELIVERY STATE:</strong>{' '}
                </td>
                <td>{value.deliveryState}</td>
              </tr>
              <tr>
                <td>
                  <strong>9. PAYMENT ACCOUNT:</strong>
                </td>
                <td>
                  Highrachy Investment and Technology Ltd <br />
                  Bank: FIRST BANK OF NIGERIA PLC
                  <br />
                  Account Number: 2032997125
                </td>
              </tr>
              <tr>
                <td>
                  <strong>10. ALLOCATION:</strong>
                </td>
                <td>Due after the {value.allocation}% of payment received.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <strong>11. OTHER TERMS AND CONDITIONS: </strong>
        <ol type="a">
          <li>
            <p>
              If the Buyer fails, refuses or neglects to pay any installment
              within 21 days after the due date, the Buyer shall pay interest on
              the amount due at the prevailing bank interest rate. If the Buyer
              fails to pay the amount due (plus applicable interest) within 45
              days after the due date, the sale shall be deemed rescinded and
              the deposit already made shall be refunded to the Buyer. An
              administrative charge of 5% will be deducted from the amount
              received from the buyer and the balance will be refunded in line
              with the terms and conditions. The Buyer shall execute or
              facilitate the execution of the Deed of Assignment of the property
              ONLY upon full payment of the consideration.
            </p>
          </li>
          <li>
            <p>
              Where the subject unit is not completed within the said seven (7)
              months’ time frame, due to the negligence or fault of the Vendor,
              a grace period of two (2) months will be granted to complete all
              works after which the Vendor shall pay to the Buyer, an amount to
              be determined by 50% of the average annual rental value of similar
              types of units within the area for the unit, this is subject to
              the Buyer meeting up the monthly payment as at when due and
              completing payment within six (6) Months. The determined amount
              shall be paid by the Vendor at a pro-rated monthly rate for each
              month of delay after the agreed seven (7) months plus the grace
              period and shall become due and payable within the first ten (10)
              working days of the month.
            </p>
          </li>
          <li>
            <p>
              The Vendor shall ensure the execution of a Deed of Assignment for
              the subject unit of Blissville on the land covered by Governors
              consented Deed of Assignment dated the 20th day of May, 2016 and
              registered as No. 87 on page 87 in volume 2547v at the office of
              the Lagos State Land Registry, Ikeja, in favour of the Buyer.
            </p>
          </li>
          <li>
            <p>
              The vendor shall support the buyer within her power to undertake
              the survey and perfection of title including obtaining the
              Governor’s consent thereto. The Buyer shall bear all costs and
              expenses of survey and title perfection.
            </p>
          </li>
          <li>
            <p>
              The Vendor shall be responsible to handle the maintenance of the
              common facilities within “Blissville” including plant and
              machinery provided by the vendor and the cost of such services
              shall be borne proportionately by all property owners/ residents
              of “Blissville” benefiting from the services. The cost of
              replacement of major facilities shall also be borne by all
              Property owners /residents.
            </p>
          </li>
          <li>
            <p>
              The Buyer shall perform and observe the covenants, terms and
              conditions of Lagos State imposed on the property including
              payment of Land Use Charge, tenement rates and any other charges
              imposed on the property by the Local, State or Federal Government
              of Nigeria and any increment thereto. The Buyer shall also pay and
              discharge any service charge including electricity bill and any
              other charges set out in the Deed of Assignment and/or service
              management agreement and any increment thereto.
            </p>
          </li>
          <li>
            <p>
              The Buyer shall enter into a service Management Agreement with the
              Vendor’s nominated Facility Managers on agreed terms and
              conditions for management of common facilities provided in
              “Blissville buildings”, which the property forms part of.
            </p>
          </li>
          <li>
            <p>
              The Buyer shall make and rely upon its own inquiries and shall
              satisfy itself in all respects in relation to the title details
              including all related documentation;
            </p>
          </li>
          <li>
            <p>
              Purchase price or any other part thereof once received is not
              subject to any refund. In exceptional cases where the Vendor in
              its sole discretion accepts to refund the purchase price or any
              part thereof, the property shall first be offered to another buyer
              and the refund shall be made from the purchase price received from
              the subsequent buyer less administrative fees in line with terms
              and conditions captured herein.
            </p>
          </li>
        </ol>

        <p className="">
          If the above terms and conditions are acceptable to you, kindly send
          in your Bank draft or evidence of payment of the sum of{' '}
          {` ${moneyFormatInNaira(value.initialPayment)} (${numToWords(
            value.initialPayment
          )} Naira only)`}
          , being 31.25% of the purchase price to Highrachy Investment and
          Technology Ltd within 5 working days (Details of bank account in
          clause 11). We are delighted that you have decided to access this
          opportunity being offered. Welcome to BLISSVILLE.
        </p>

        <p>
          Yours faithfully,
          <br /> For: Highrachy Investment and Technology Ltd
        </p>
      </Card>
      <button
        className="btn btn-secondary btn-wide mt-5"
        onClick={handleHideOfferLetter}
      >
        Back to Offer Letter Form
      </button>
    </div>
  );
};

export default CreateOfferLetter;
