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
    <Card className="card-container mt-4 h-100 enquiry-holder__big">
      <div className="row mt-5">
        <div className="col-sm-12">
          <h4>
            Enquiry Form ({enquiry.title} {enquiry.firstName} {enquiry.lastName}
            )
          </h4>

          <div className="table-responsive">
            <table className="table table-border table-hover">
              <tbody>
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
                    <strong>Address</strong>
                  </td>
                  <td>{getFormattedAddress(enquiry.address)}</td>
                </tr>
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
                  <td>
                    {moneyFormatInNaira(enquiry.periodicInvestmentAmount)}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Name On TitleDocument</strong>
                  </td>
                  <td>{enquiry.nameOnTitleDocument}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Occupation</strong>
                  </td>
                  <td>{enquiry.occupation}</td>
                </tr>
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
                  <td>
                    {getFormattedAddress(enquiry.propertyInfo[0].address)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Card>

    <button
      className="btn btn-secondary btn-wide mt-5"
      onClick={() => showOfferLetter()}
    >
      Create Offer Letter
    </button>
  </div>
);

export default ViewEnquiry;
