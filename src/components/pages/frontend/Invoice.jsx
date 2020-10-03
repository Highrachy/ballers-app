import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/layout/Header';
import Footer from 'components/layout/Footer';
import BallersLogo from 'assets/img/logo/ballers-logo.png';
import { getTinyDate } from 'utils/date-helpers';
import { moneyFormat } from 'utils/helpers';
import { LoveIcon } from 'components/utils/Icons';

const paymentInfo = {
  id: 834126615,
  domain: 'test',
  status: 'success',
  reference: 'qmyuyxtl2j',
  amount: 10000000,
  message: null,
  gateway_response: 'Successful',
  paid_at: '2020-10-03T12:03:18.000Z',
  created_at: '2020-10-03T12:02:46.000Z',
  channel: 'card',
  currency: 'NGN',
  ip_address: '41.58.98.175',
  metadata: {
    custom_fields: [
      {
        display_name: 'Property Id',
        variable_name: 'propertyId',
        value: '5f660daee0c9ed08f8e4a298',
      },
      {
        display_name: 'User Id',
        variable_name: 'userId',
        value: '5f6bb4ee7a40d3698668a679',
      },
    ],
  },
  log: {
    start_time: 1601726590,
    time_spent: 9,
    attempts: 1,
    errors: 0,
    success: true,
    mobile: false,
    input: [],
    history: [
      {
        type: 'action',
        message: 'Attempted to pay with card',
        time: 8,
      },
      {
        type: 'success',
        message: 'Successfully paid with card',
        time: 9,
      },
    ],
  },
  fees: 160000,
  fees_split: null,
  authorization: {
    authorization_code: 'AUTH_1fvxqg8v9q',
    bin: '408408',
    last4: '4081',
    exp_month: '12',
    exp_year: '2020',
    channel: 'card',
    card_type: 'visa ',
    bank: 'TEST BANK',
    country_code: 'NG',
    brand: 'visa',
    reusable: true,
    signature: 'SIG_u3O0hP1pbv6KEVPNoGtY',
    account_name: null,
    receiver_bank_account_number: null,
    receiver_bank: null,
  },
  customer: {
    id: 23979013,
    first_name: null,
    last_name: null,
    email: 'user1@gmail.com',
    customer_code: 'CUS_zrqtui4b4m8dvwl',
    phone: null,
    metadata: null,
    risk_action: 'default',
    international_format_phone: null,
  },
  plan: null,
  split: {},
  order_id: null,
  paidAt: '2020-10-03T12:03:18.000Z',
  createdAt: '2020-10-03T12:02:46.000Z',
  requested_amount: 10000000,
  transaction_date: '2020-10-03T12:02:46.000Z',
  plan_object: {},
  subaccount: {},
};

const propertyInfo = {};

const Invoice = () => (
  <>
    <Header />
    <InvoiceContent paymentInfo={paymentInfo} propertyInfo={propertyInfo} />

    <Footer />
  </>
);

const InvoiceContent = ({ paymentInfo }) => (
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
                    <p className="mt-3 mt-sm-5">
                      Payment to <strong>Mr. Haruna Popoola</strong>
                    </p>
                  </td>
                  <td className="text-right text-amount strong">
                    {paymentInfo.currency}{' '}
                    {moneyFormat(paymentInfo.amount / 100)}
                  </td>
                </tr>
                <tr className="tr-content">
                  <td>
                    <p>
                      Property Name: {propertyInfo.name}
                      <br />
                    </p>
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
                      {paymentInfo.currency}{' '}
                      {moneyFormat(paymentInfo.amount / 100)}
                    </h4>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="row invoice__separator">
              <div className="col-6">
                <h5>
                  <span className="svg-love">
                    <LoveIcon /> &nbsp;
                  </span>
                  Thank You!
                </h5>
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

Invoice.propTypes = {
  application: PropTypes.object.isRequired,
  paymentInfo: PropTypes.object.isRequired,
};

export default Invoice;
