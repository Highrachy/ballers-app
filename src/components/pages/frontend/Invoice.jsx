import React from 'react';
import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';
import BallersLogo from 'assets/img/logo/ballers-logo.png';
import { getTinyDate } from 'utils/date-helpers';
import { getFormattedAddress, moneyFormat } from 'utils/helpers';
import * as queryString from 'query-string';
import Axios from 'axios';
import { getTokenFromStore } from 'utils/localStorage';
import { getError } from 'utils/helpers';
import Toast, { useToast } from 'components/utils/Toast';
import { BASE_API_URL } from 'utils/constants';
import { Loading } from 'components/utils/LoadingItems';
import { TransactionIcon } from 'components/utils/Icons';

const Invoice = (props) => {
  const queryParams = queryString.parse(props.location.search);
  const { reference } = queryParams;
  const [toast, setToast] = useToast();
  const [payment, setPayment] = React.useState(null);
  const [paystackResponse, setPaystackResponse] = React.useState(null);
  const [offer, setOffer] = React.useState(null);

  React.useEffect(() => {
    Axios.get(`${BASE_API_URL}/payment/process/${reference}`, {
      headers: {
        Authorization: getTokenFromStore(),
      },
    })
      .then(function (response) {
        const { status, data } = response;
        setPayment(data.transaction);
        setPaystackResponse(data.paystackResponse);
        // handle success
        if (status === 200) {
          Axios.get(`${BASE_API_URL}/offer/${data.transaction.offerId}`, {
            headers: {
              Authorization: getTokenFromStore(),
            },
          })
            .then(function (response) {
              const { status, data } = response;
              if (status === 200) {
                setOffer(data.offer);
              }
            })
            .catch(function (error) {
              setToast({
                message: getError(error),
              });
            });
        }
      })
      .catch(function (error) {
        setToast({
          message: getError(error),
        });
      });
  }, [setToast, reference]);

  return (
    <>
      <Toast {...toast} showToastOnly />
      <Header />
      {payment && paystackResponse && offer && offer.propertyInfo ? (
        <InvoiceContent
          paymentInfo={{ ...paystackResponse, ...payment }}
          propertyInfo={offer.propertyInfo}
        />
      ) : (
        <div className="ballers-invoice">
          <div className="mt-8">
            <Loading
              text="Loading Payment Information"
              Icon={<TransactionIcon />}
            />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

const InvoiceContent = ({ paymentInfo, propertyInfo }) => (
  <div className="ballers-invoice">
    <section className="invoice__page">
      <div className="row">
        <div className="col-sm-12 mb-1 mb-sm-4 invoice__content">
          <div className="card-body d-flex flex-column">
            {/* Logo */}
            <div>
              <img alt="Logo" className="invoice__logo" src={BallersLogo} />
            </div>

            {/* Header Details */}
            <div className="invoice__separator">
              <div className="d-flex flex-column">
                <table>
                  <tbody>
                    <tr className="tr-content">
                      <td colSpan={2}>
                        <h6 className="mb-2 mb-sm-3 invoice__email">
                          {paymentInfo.customer.email}
                        </h6>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className="mb-0">
                          Date Issued:{' '}
                          <strong>{getTinyDate(paymentInfo.paidAt)}</strong>
                        </p>
                      </td>
                      <td className="text-right">
                        <p className="mb-0">+234 708 7821 561</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className="mb-0">
                          Receipt No: <strong>2255377XXX</strong>
                        </p>
                      </td>
                      <td className="text-right">
                        <p className="mb-0">info@ballers.ng</p>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <p className="mb-0">
                          Ref. :{' '}
                          <strong className="text-uppercase">
                            {paymentInfo.reference}
                          </strong>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Receipt Details */}
            <table className="invoice__separator invoice__table">
              <thead>
                <tr className="tr-header tr-border-bottom">
                  <th>DESCRIPTION</th>
                  <th className="text-right">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                <tr className="tr-content">
                  <td>
                    <p className="mt-2 mt-sm-3">
                      Payment to <strong>Mr. Haruna Popoola</strong>
                    </p>
                  </td>
                  <td className="text-right text-amount strong">
                    <p className="mt-2 mt-sm-3">
                      {paymentInfo.currency} {moneyFormat(paymentInfo.amount)}
                    </p>
                  </td>
                </tr>
                <tr className="tr-content">
                  <td>
                    <p>
                      <strong>{propertyInfo.name}</strong>
                      <br />
                      <span>{propertyInfo.houseType}</span>
                    </p>
                    {getFormattedAddress(propertyInfo.address)}
                  </td>
                  <td>&nbsp;</td>
                </tr>
              </tbody>
            </table>
            <div className="invoice__separator"></div>
          </div>
        </div>
      </div>
    </section>

    {/* Footer Details */}
    <section className="invoice__page invoice__footer">
      <div className="row">
        <div className="col-sm-12">
          <div className="d-flex flex-column">
            <table className="mt-3 mt-sm-5 invoice__table">
              <thead>
                <tr className="tr-header tr-border-bottom">
                  <th>PAYMENT INFO</th>
                  <th>PAID ON</th>
                  <th className="text-right">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                <tr className="tr-content tr-border-bottom">
                  <td>
                    <small>
                      {paymentInfo.authorization.bank}: (
                      {paymentInfo.authorization.card_type})
                      <br />
                      Card: **** **** **** {paymentInfo.authorization.last4}
                    </small>
                  </td>
                  <td>
                    <h4 className="my-4">{getTinyDate(paymentInfo.paidAt)}</h4>
                  </td>
                  <td className="text-right text-green">
                    <h4 className="text-amount">
                      {' '}
                      {paymentInfo.currency} {moneyFormat(paymentInfo.amount)}
                    </h4>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="row invoice__separator">
              <div className="col-6">
                <h5>Thank You!</h5>
              </div>
              <div className="col-6 text-right">
                <h5 className="text-uppercase invoice__tag-line">
                  Become A Landlord
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Invoice;
