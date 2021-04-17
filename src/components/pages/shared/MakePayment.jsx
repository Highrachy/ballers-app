import Axios from 'axios';
import Modal from 'components/common/Modal';
import Button from 'components/forms/Button';
import React from 'react';
import { BALLERS_BANK_ACCOUNTS, BASE_API_URL } from 'utils/constants';
import { getTokenFromStore } from 'utils/localStorage';
import { Formik, Form } from 'formik';
import { createSchema } from 'components/forms/schemas/schema-helpers';
import {
  onlinePaymentSchema,
  offlinePaymentSchema,
} from 'components/forms/schemas/transactionSchema';
import InputFormat from 'components/forms/InputFormat';
import { Card } from 'react-bootstrap';
import {
  setInitialValues,
  DisplayFormikState,
} from 'components/forms/form-helper';
import { getError, statusIsSuccessful, valuesToOptions } from 'utils/helpers';
import DatePicker from 'components/forms/DatePicker';
import Select from 'components/forms/Select';
import Upload from 'components/utils/Upload';
import ImagePlaceholder from 'assets/img/placeholder/image.png';
import Label from 'components/forms/Label';

const KEY = {
  ONLINE: 'online',
  OFFLINE: 'offline',
};

const PAYMENT_TYPE = {
  [KEY.ONLINE]: 'Pay Online',
  [KEY.OFFLINE]: 'Bank Deposit/Transfer',
};

const MakePayment = ({ setToast, portfolio }) => {
  const [showPaymentModal, setShowPaymentModal] = React.useState(false);
  const [paymentType, setPaymentType] = React.useState(KEY.ONLINE);

  return (
    <>
      <Modal
        show={showPaymentModal}
        onHide={() => setShowPaymentModal(false)}
        showFooter={false}
      >
        <h5 className="my-3">How would you like to pay: </h5>

        {Object.entries(PAYMENT_TYPE).map(([key, value]) => (
          <>
            <Button
              color={key === paymentType ? 'primary' : 'light'}
              onClick={() => setPaymentType(key)}
              className="mr-4"
            >
              {value}
            </Button>
          </>
        ))}
        <hr className="my-4" />

        {paymentType === KEY.ONLINE ? (
          <OnlinePayment
            hideForm={() => setShowPaymentModal(false)}
            portfolio={portfolio}
            setPaymentType={setPaymentType}
            setToast={setToast}
          />
        ) : (
          <OfflinePayment
            hideForm={() => setShowPaymentModal(false)}
            portfolio={portfolio}
            setPaymentType={setPaymentType}
            setToast={setToast}
          />
        )}
      </Modal>

      <button
        className="btn btn-block btn-secondary"
        onClick={() => setShowPaymentModal(true)}
      >
        Make Payment
      </button>
    </>
  );
};

const OnlinePayment = ({ setPaymentType, setToast, portfolio }) => {
  return (
    <div className="mt-5">
      <h5 className="header-small">Online Payment</h5>
      <Formik
        enableReinitialize={true}
        initialValues={setInitialValues(onlinePaymentSchema, {
          amount: Math.min(
            1_000_000,
            portfolio?.nextPaymentInfo[0]?.expectedAmount || 10_000
          ),
        })}
        onSubmit={({ amount }, actions) => {
          const payload = {
            amount: amount.toString(),
            propertyId: portfolio.propertyInfo._id,
            offerId: portfolio._id,
          };

          Axios.post(`${BASE_API_URL}/payment/initiate`, payload, {
            headers: {
              Authorization: getTokenFromStore(),
            },
          })
            .then(function (response) {
              const { status, data } = response;
              if (statusIsSuccessful(status)) {
                window.location.href = data.payment.authorization_url;
              }
            })
            .catch(function (error) {
              setToast({
                message: getError(error),
              });
              actions.setSubmitting(false);
            });
        }}
        validationSchema={createSchema(onlinePaymentSchema)}
      >
        {({ isSubmitting, handleSubmit, ...props }) => (
          <Form>
            <PaystackPaymentForm
              {...props}
              isSubmitting={isSubmitting}
              handleSubmit={handleSubmit}
            />

            <div
              className="text-link text-muted text-center text-small my-4"
              onClick={() => setPaymentType(KEY.OFFLINE)}
            >
              Need to pay into our bank account directly <br />
              Pay via Bank Deposit / Transfer
            </div>

            <DisplayFormikState {...props} showAll />
          </Form>
        )}
      </Formik>
    </div>
  );
};

const OfflinePayment = ({ setPaymentType, setToast, portfolio, hideForm }) => {
  // TODO: Change to null
  const [receipt, setReceipt] = React.useState('test');
  const [showPaymentForm, setShowPaymentForm] = React.useState(false);
  return (
    <Formik
      enableReinitialize={true}
      initialValues={setInitialValues(offlinePaymentSchema, {
        amount: portfolio.nextPaymentInfo[0].expectedAmount,
      })}
      onSubmit={(values, actions) => {
        const payload = {
          ...values,
          offerId: portfolio._id,
          receipt,
          dateOfPayment: values.dateOfPayment.date,
        };

        Axios.post(`${BASE_API_URL}/offline-payment`, payload, {
          headers: { Authorization: getTokenFromStore() },
        })
          .then(function (response) {
            const { status } = response;
            if (statusIsSuccessful(status)) {
              setToast({
                type: 'success',
                message: `Your transaction has been successfully added`,
              });
              hideForm();
              actions.setSubmitting(false);
              actions.resetForm();
            }
          })
          .catch(function (error) {
            setToast({
              message: getError(error),
            });
            actions.setSubmitting(false);
          });
      }}
      validationSchema={createSchema(offlinePaymentSchema)}
    >
      {({ isSubmitting, handleSubmit, ...props }) => (
        <Form>
          {showPaymentForm ? (
            <>
              <h5 className="header-small mb-3">Payment Verification</h5>
              <OfflinePaymentForm
                {...props}
                setReceipt={setReceipt}
                oldReceipt={null}
                isSubmitting={isSubmitting}
                handleSubmit={handleSubmit}
              />
              <DisplayFormikState {...props} showAll />
            </>
          ) : (
            <>
              <div className="my-4">
                <h5 className="header-small mb-4">Bank Transfer/ Deposit</h5>
                <p>1. Pay To:</p>
                <h5 className="header-smaller">
                  <span>Highrachy Investment and Technology Ltd</span>
                </h5>
                {BALLERS_BANK_ACCOUNTS.map(({ accountNo, bankName }, index) => (
                  <p key={index}>
                    {bankName} - {accountNo}
                  </p>
                ))}
              </div>

              <p>
                2. After paying, fill the Payment Verification Form to process
                your payment.
              </p>
              <Button
                className="btn-wide btn-sm mt-4"
                onClick={() => setShowPaymentForm(true)}
              >
                Payment Verification Form
              </Button>

              <div
                className="text-link text-muted text-center text-small my-4"
                onClick={() => setPaymentType(KEY.ONLINE)}
              >
                Love to make your payment online? <br />
                Pay via our Secured Online Platform
              </div>
            </>
          )}
        </Form>
      )}
    </Formik>
  );
};

const PaystackPaymentForm = ({ isSubmitting, handleSubmit }) => {
  return (
    <Card className="card-container">
      <section className="row">
        <div className="px-3 col-sm-12">
          <InputFormat
            label="Amount"
            name="amount"
            placeholder="Transaction Amount"
          />
          <Button
            className="btn-secondary mt-4"
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            Make Payment
          </Button>
        </div>
      </section>
    </Card>
  );
};

const OfflinePaymentForm = ({
  setReceipt,
  oldReceipt,
  isSubmitting,
  handleSubmit,
}) => {
  return (
    <Card className="card-container">
      <section className="row">
        <div className="px-3 col-sm-12">
          <InputFormat
            label="Amount Paid"
            name="amount"
            placeholder="Transaction Amount"
          />

          <Select
            label="Bank"
            name="bank"
            options={valuesToOptions(
              BALLERS_BANK_ACCOUNTS.map(
                ({ accountNo, bankName }) => `${bankName} - ${accountNo}`
              )
            )}
            placeholder="Select Payment type"
          />

          <DatePicker
            label="Paid on"
            name="dateOfPayment"
            placeholder="Paid On"
          />

          <Select
            label="Payment Type"
            name="type"
            options={valuesToOptions(['Bank Transfer', 'Bank Deposit'])}
            placeholder="Select Payment type"
          />

          <br />
          <Label name="receipt" text="Receipt" optional />
          <Upload
            afterUpload={(image) => setReceipt(image)}
            changeText={`Update Payment Evidence`}
            defaultImage={ImagePlaceholder}
            imgOptions={{ className: 'mb-3', watermark: true }}
            name="receipt"
            text="Receipt"
            oldImage={oldReceipt}
            uploadText={`Upload Payment Evidence`}
          />

          <Button
            className="btn-secondary mt-4"
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            Verify Payment
          </Button>
        </div>
      </section>
    </Card>
  );
};

export default MakePayment;
