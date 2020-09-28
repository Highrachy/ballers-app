import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { Card } from 'react-bootstrap';
import { BASE_API_URL } from 'utils/constants';
import Toast, { useToast } from 'components/utils/Toast';
import Axios from 'axios';
import { getTokenFromStore } from 'utils/localStorage';
import NoContent from 'components/utils/NoContent';
import {
  moneyFormatInNaira,
  getError,
  getFormattedAddress,
} from 'utils/helpers';
import { getDateTime, getShortDate } from 'utils/date-helpers';
import { MessageIcon } from 'components/utils/Icons';
import CreateOfferLetter from './CreateOfferLetter';

const ViewEnquiry = ({ id }) => {
  const [toast, setToast] = useToast();
  const [enquiry, setEnquiry] = React.useState(null);
  const [showEnquiry, setShowEnquiry] = React.useState(true);

  React.useEffect(() => {
    Axios.get(`${BASE_API_URL}/enquiry/${id}`, {
      headers: {
        Authorization: getTokenFromStore(),
      },
    })
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setEnquiry(data.enquiry);
          console.log('data.enquiry', data.enquiry);
        }
      })
      .catch(function (error) {
        console.log('error.response', error.response);
        setToast({
          message: getError(error),
        });
      });
  }, [setToast, id]);

  return (
    <BackendPage>
      {enquiry ? (
        showEnquiry ? (
          <EnquiryDetail
            enquiry={enquiry}
            toast={toast}
            showOfferLetter={() => setShowEnquiry(false)}
          />
        ) : (
          <CreateOfferLetter enquiry={enquiry} />
        )
      ) : (
        <NoContent text="No Enquiry Found" Icon={<MessageIcon />} />
      )}
    </BackendPage>
  );
};

const EnquiryDetail = ({ enquiry, showOfferLetter, toast }) => (
  <div className="container-fluid">
    <Toast {...toast} />
    <div className="mt-5 mb-3">
      <h3>
        {enquiry.title} {enquiry.firstName} Enquiry Form
      </h3>
    </div>
    <CardTableSection name="Client Details">
      <tr>
        <td>
          <strong>Name</strong>
        </td>
        <td>
          {enquiry.title} {enquiry.firstName} {enquiry.lastName}{' '}
          {enquiry.otherName}
        </td>
      </tr>
      <tr>
        <td>
          <strong>Email</strong>
        </td>
        <td>{enquiry.email}</td>
      </tr>
      <tr>
        <td>
          <strong>Phone</strong>
        </td>
        <td>{enquiry.phone}</td>
      </tr>
      <tr>
        <td>
          <strong>Occupation</strong>
        </td>
        <td>{enquiry.occupation}</td>
      </tr>
      <tr>
        <td>
          <strong>Address</strong>
        </td>
        <td>{getFormattedAddress(enquiry.address)}</td>
      </tr>
    </CardTableSection>
    <CardTableSection name="Name on Title Document">
      <tr>
        <td>
          <h4>{enquiry.nameOnTitleDocument}</h4>
        </td>
      </tr>
    </CardTableSection>
    <CardTableSection name="Property details">
      <tr>
        <td>
          <strong>Property Name</strong>
        </td>
        <td>{enquiry.propertyInfo[0].name}</td>
      </tr>
      <tr>
        <td>
          <strong>House Type</strong>
        </td>
        <td>{enquiry.propertyInfo[0].houseType}</td>
      </tr>
      <tr>
        <td>
          <strong>Price</strong>
        </td>
        <td>{moneyFormatInNaira(enquiry.propertyInfo[0].price)}</td>
      </tr>
      <tr>
        <td>
          <strong>Units</strong>
        </td>
        <td>{enquiry.propertyInfo[0].units}</td>
      </tr>
      <tr>
        <td>
          <strong>Bedrooms</strong>
        </td>
        <td>{enquiry.propertyInfo[0].bedrooms}</td>
      </tr>
      <tr>
        <td>
          <strong>Toilets</strong>
        </td>
        <td>{enquiry.propertyInfo[0].toilets}</td>
      </tr>
      <tr>
        <td>
          <strong>Address</strong>
        </td>
        <td>{getFormattedAddress(enquiry.propertyInfo[0].address)}</td>
      </tr>
    </CardTableSection>
    <CardTableSection name="Investment details">
      <tr>
        <td>
          <strong>Initial Investment Amount</strong>
        </td>
        <td>{moneyFormatInNaira(enquiry.initialInvestmentAmount)}</td>
      </tr>
      <tr>
        <td>
          <strong>Investment Frequency</strong>
        </td>
        <td>{enquiry.investmentFrequency}</td>
      </tr>
      <tr>
        <td>
          <strong>Investment Start Date</strong>
        </td>
        <td>{getShortDate(enquiry.investmentStartDate)}</td>
      </tr>
      <tr>
        <td>
          <strong>Periodic Investment Amount</strong>
        </td>
        <td>{moneyFormatInNaira(enquiry.periodicInvestmentAmount)}</td>
      </tr>
    </CardTableSection>
    <CardTableSection name="Admin Details">
      <tr>
        <td>
          <strong>Created At</strong>
        </td>
        <td>{getDateTime(enquiry.createdAt)}</td>
      </tr>
      <tr>
        <td>
          <strong>Updated At</strong>
        </td>
        <td>{getDateTime(enquiry.updatedAt)}</td>
      </tr>
    </CardTableSection>

    <button
      className="btn btn-secondary btn-wide mt-5"
      onClick={() => showOfferLetter()}
    >
      Create Offer Letter
    </button>
  </div>
);

const CardTableSection = ({ name, className, children }) => (
  <Card className={`card-container mb-5 ${className}`}>
    <div className="row mt-3">
      <div className="col-sm-12">
        {name && <h5>{name}</h5>}

        <div className="table-responsive">
          <table className="table table-border">
            <tbody>{children}</tbody>
          </table>
        </div>
      </div>
    </div>
  </Card>
);

export default ViewEnquiry;
