import React from 'react';
import { Card } from 'react-bootstrap';
import {
  moneyFormatInNaira,
  numToWords,
  numToOrdinal,
  moneyFormat,
  getFormattedAddress,
  getLocationFromAddress,
  isValidURL,
} from 'utils/helpers';
import HighrachyLogo from 'assets/img/logo/highrachy-logo.png';
import { getDate } from 'utils/date-helpers';
import Image from './Image';
import DirectorSignature from 'assets/img/placeholder/signature.png';

const OfferLetterTemplate = ({
  enquiryInfo,
  offerInfo,
  propertyInfo,
  signature,
  showSignaturePad,
}) => {
  const { totalAmountPayable, initialPayment, monthlyPayment } = offerInfo;
  const rangePrice = totalAmountPayable - initialPayment;
  const noOfMonths =
    rangePrice / monthlyPayment > 1
      ? Math.floor(rangePrice / monthlyPayment)
      : 1;
  const lastPayment = rangePrice - monthlyPayment * noOfMonths;
  const initialPercentage = moneyFormat(
    (initialPayment / totalAmountPayable) * 100
  );
  const buyerName = `${enquiryInfo.title} ${enquiryInfo.firstName} ${enquiryInfo.lastName} ${enquiryInfo.otherName}`;
  const houseType = propertyInfo.houseType.toUpperCase();
  const propertyName = propertyInfo.name;
  return (
    <Card className="mt-4 p-5">
      <img
        src={HighrachyLogo}
        width="150"
        className="img-fluid"
        alt="Highrachy Logo"
      />
      <p className="mt-4">
        Our Ref: BVC01/OLAXXXX2019
        <span className="float-right">{getDate(Date.now())}</span>
      </p>

      <strong>
        {buyerName}
        <br />
      </strong>
      {getFormattedAddress(enquiryInfo.address)}

      <p className="">Dear Sir/Ma,</p>

      <strong>
        RE: {propertyInfo.name} - LETTER OF OFFER FOR {houseType}
      </strong>

      <p className="">
        We refer to your application to purchase a unit in {propertyName} on{' '}
        {getLocationFromAddress(enquiryInfo.address)} and are pleased to offer
        you a {houseType} on the following terms and conditions:
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
                <strong>{buyerName}</strong>
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
              <td>{offerInfo.title}</td>
            </tr>
            <tr>
              <td>
                <strong>5. SELLING PRICE:</strong>{' '}
              </td>
              <td>
                {`${moneyFormatInNaira(
                  offerInfo.totalAmountPayable
                )} (${numToWords(
                  offerInfo.totalAmountPayable
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
              <td>{offerInfo.deliveryState}</td>
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
              <td>
                Due after the {offerInfo.allocationInPercentage}% of payment
                received.
              </td>
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
            days after the due date, the sale shall be deemed rescinded and the
            deposit already made shall be refunded to the Buyer. An
            administrative charge of 5% will be deducted from the amount
            received from the buyer and the balance will be refunded in line
            with the terms and conditions. The Buyer shall execute or facilitate
            the execution of the Deed of Assignment of the property ONLY upon
            full payment of the consideration.
          </p>
        </li>
        <li>
          <p>
            Where the subject unit is not completed within the said{' '}
            {`${numToWords(noOfMonths)} (${noOfMonths}`}
            months’ time frame, due to the negligence or fault of the Vendor, a
            grace period of two (2) months will be granted to complete all works
            after which the Vendor shall pay to the Buyer, an amount to be
            determined by 50% of the average annual rental value of similar
            types of units within the area for the unit, this is subject to the
            Buyer meeting up the monthly payment as at when due and completing
            payment within six (6) Months. The determined amount shall be paid
            by the Vendor at a pro-rated monthly rate for each month of delay
            after the agreed seven (7) months plus the grace period and shall
            become due and payable within the first ten (10) working days of the
            month.
          </p>
        </li>
        <li>
          <p>
            The Vendor shall ensure the execution of a Deed of Assignment for
            the subject unit of Blissville on the land covered by Governors
            consented Deed of Assignment dated the 20th day of May, 2016 and
            registered as No. 87 on page 87 in volume 2547v at the office of the
            Lagos State Land Registry, Ikeja, in favour of the Buyer.
          </p>
        </li>
        <li>
          <p>
            The vendor shall support the buyer within her power to undertake the
            survey and perfection of title including obtaining the Governor’s
            consent thereto. The Buyer shall bear all costs and expenses of
            survey and title perfection.
          </p>
        </li>
        <li>
          <p>
            The Vendor shall be responsible to handle the maintenance of the
            common facilities within “Blissville” including plant and machinery
            provided by the vendor and the cost of such services shall be borne
            proportionately by all property owners/ residents of “Blissville”
            benefiting from the services. The cost of replacement of major
            facilities shall also be borne by all Property owners /residents.
          </p>
        </li>
        <li>
          <p>
            The Buyer shall perform and observe the covenants, terms and
            conditions of Lagos State imposed on the property including payment
            of Land Use Charge, tenement rates and any other charges imposed on
            the property by the Local, State or Federal Government of Nigeria
            and any increment thereto. The Buyer shall also pay and discharge
            any service charge including electricity bill and any other charges
            set out in the Deed of Assignment and/or service management
            agreement and any increment thereto.
          </p>
        </li>
        <li>
          <p>
            The Buyer shall enter into a service Management Agreement with the
            Vendor’s nominated Facility Managers on agreed terms and conditions
            for management of common facilities provided in “Blissville
            buildings”, which the property forms part of.
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
            subject to any refund. In exceptional cases where the Vendor in its
            sole discretion accepts to refund the purchase price or any part
            thereof, the property shall first be offered to another buyer and
            the refund shall be made from the purchase price received from the
            subsequent buyer less administrative fees in line with terms and
            conditions captured herein.
          </p>
        </li>
      </ol>

      <p className="">
        If the above terms and conditions are acceptable to you, kindly send in
        your Bank draft or evidence of payment of the sum of{' '}
        {` ${moneyFormatInNaira(offerInfo.initialPayment)} (${numToWords(
          offerInfo.initialPayment
        )} Naira only)`}
        , being {initialPercentage}% of the purchase price to Highrachy
        Investment and Technology Ltd within 5 working days (Details of bank
        account in clause 11). We are delighted that you have decided to access
        this opportunity being offered. Welcome to BLISSVILLE.
      </p>

      <p className="mb-5">
        Yours faithfully,
        <br /> For: Highrachy Investment and Technology Ltd
      </p>

      <Image
        className="director-signature"
        name="Signature"
        src={DirectorSignature}
      />

      <h6>Director</h6>

      {showSignaturePad && (
        <section className="signature mt-5">
          <h6>MEMORANDUM OF ACCEPTANCE</h6>
          <strong className="text-muted">
            I, <span className="memo-border">Haruna Popoola</span> hereby
            accepts the above terms and conditions on{' '}
            <span className="memo-border">{getDate(Date.now())}</span>.
          </strong>

          <h6 className="mt-5 mb-2">Signature</h6>
          {signature && (
            <>
              <h3 className="signature-pad">
                {isValidURL(signature) ? (
                  <Image
                    className="signature-image uploaded-image mb-3"
                    name="Signature"
                    src={signature}
                  />
                ) : (
                  signature
                )}
              </h3>
            </>
          )}
        </section>
      )}
    </Card>
  );
};

export default OfferLetterTemplate;
