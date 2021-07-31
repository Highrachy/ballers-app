import React from 'react';
import { Card } from 'react-bootstrap';
import {
  setInitialValues,
  DisplayFormikState,
} from 'components/forms/form-helper';
import Axios from 'axios';
import { BASE_API_URL, PAYMENT_FREQUENCY } from 'utils/constants';
import Toast, { useToast } from 'components/utils/Toast';
import { getTokenFromStore } from 'utils/localStorage';
import Button from 'components/forms/Button';
import { Formik, Form } from 'formik';
import { createSchema } from 'components/forms/schemas/schema-helpers';
import Select from 'components/forms/Select';
import Textarea from 'components/forms/Textarea';
import { generateNumOptions, getError, objectToOptions } from 'utils/helpers';
import {
  offerLetterSchema,
  otherPaymentsSchema,
  otherTermsSchema,
} from 'components/forms/schemas/offerSchema';
import InputFormat from 'components/forms/InputFormat';
import Input from 'components/forms/Input';
import { addDays, addMonths } from 'date-fns';
import Modal from 'components/common/Modal';
import OfferLetterTemplate from 'components/utils/OfferLetterTemplate';
import DatePicker from 'components/forms/DatePicker';

const CreateOfferLetter = ({ enquiry }) => {
  const defaultValue = {
    totalAmountPayable: enquiry.propertyInfo.price,
    allocationInPercentage: 100,
    initialPayment: enquiry.initialInvestmentAmount,
    initialPaymentDate: enquiry.investmentStartDate,
    periodicPayment: enquiry.periodicInvestmentAmount,
    paymentFrequency: enquiry.investmentFrequency,
    expires: '7',
    title: enquiry.propertyInfo.titleDocument,
    deliveryState: 'testing 123',
    otherPayments: {
      agencyFee: 0,
      deedOfAssignmentExecution: 0,
      infrastructureDevelopment: 0,
      legalFee: 0,
      powerConnectionFee: 0,
      surveyPlan: 0,
    },
    otherTerms: {
      administrativeCharge: 0,
      bankDraftDue: 0,
      dateDue: 0,
      deductibleRefundPercentage: 0,
      gracePeriod: 0,
      terminationInterest: 0,
      terminationPeriod: 0,
    },
  };
  const [value, setValue] = React.useState(defaultValue);
  const [showOfferLetter, setShowOfferLetter] = React.useState(false);

  return (
    <>
      {showOfferLetter ? (
        <SubmitOfferLetter
          enquiry={enquiry}
          handleHideOfferLetter={() => setShowOfferLetter(false)}
          value={value}
        />
      ) : (
        <CreateOfferLetterForm
          enquiry={enquiry}
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
      <Formik
        enableReinitialize={true}
        initialValues={{
          ...setInitialValues(offerLetterSchema, { ...value }),
          otherPayments: setInitialValues(
            otherPaymentsSchema,
            value?.otherPayments
          ),
          otherTerms: setInitialValues(otherTermsSchema),
        }}
        onSubmit={(values) => {
          handleValue({
            ...values,
            initialPaymentDate:
              values.initialPaymentDate.date || values.initialPaymentdate,
          });
          handleShowOfferLetter();
        }}
        validationSchema={createSchema({
          ...offerLetterSchema,
          otherPayments: createSchema(otherPaymentsSchema),
          otherTerms: createSchema(otherTermsSchema),
        })}
      >
        {({ isSubmitting, handleSubmit, ...props }) => (
          <Form>
            <Toast {...toast} />

            <OfferFormContainer title="Create Offer Letter">
              <OfferLetterForm />
            </OfferFormContainer>

            <OfferFormContainer title="Other Payments">
              <OtherPaymentsForm />
            </OfferFormContainer>

            <OfferFormContainer title="Terms and Condition">
              <OtherTermsForm />
            </OfferFormContainer>

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
  );
};

const OfferFormContainer = ({ title, children }) => (
  <Card className="mt-4">
    <section className="row">
      <div className="col-md-10 p-5">
        <h5>{title}</h5>
        {children}
      </div>
    </section>
  </Card>
);

const OfferLetterForm = () => {
  return (
    <>
      <InputFormat
        label="Total Amount Payable"
        name="totalAmountPayable"
        placeholder="Total Amount Payable"
      />
      <div className="form-row">
        <InputFormat
          formGroupClassName="col-md-6"
          label="Initial Payment"
          name="initialPayment"
          placeholder="Initial Payment"
        />
        <DatePicker
          formGroupClassName="col-md-6"
          label="Initial Payment Due Date"
          name="initialPaymentDate"
          minDate={new Date()}
        />
      </div>
      <div className="form-row">
        <InputFormat
          formGroupClassName="col-md-6"
          label="Periodic Payment"
          name="periodicPayment"
          placeholder="Periodic Payment"
        />
        <Select
          formGroupClassName="col-md-6"
          label="Payment Frequency"
          name="paymentFrequency"
          placeholder="Payment Frequency"
          options={objectToOptions(PAYMENT_FREQUENCY, null, true)}
        />
      </div>
      <div className="form-row">
        <Select
          formGroupClassName="col-md-6"
          label="Offer Expires in"
          name="expires"
          options={generateNumOptions(11, 'Day', { startFrom: 5 })}
          placeholder="Allocation Month"
        />
        <Input
          formGroupClassName="col-md-6"
          label="Allocation In Percentage"
          name="allocationInPercentage"
          type="number"
          max={100}
          min={0}
          placeholder="Allocation"
          tooltipText="The number of deposits to be made before prpoerty is allocated"
        />
      </div>

      <Textarea label="Title Document" name="title" rows="2" />

      <Textarea
        label="Delivery State"
        name="deliveryState"
        rows="3"
        tooltipText="The state the property would be delivered to the user"
      />
    </>
  );
};
const OtherPaymentsForm = () => {
  return (
    <>
      <div className="form-row">
        <Input
          formGroupClassName="col-md-6"
          label="Legal Fee"
          name="otherPayments.legalFee"
          type="number"
          max={20}
          min={0}
        />
        <Input
          formGroupClassName="col-md-6"
          label="Agency Fee"
          name="otherPayments.agencyFee"
          type="number"
          max={20}
          min={0}
        />
      </div>

      <div className="form-row">
        <InputFormat
          formGroupClassName="col-md-6"
          label="Infrastructure Development"
          name="otherPayments.infrastructureDevelopment"
        />

        <InputFormat
          formGroupClassName="col-md-6"
          label="Deed of Assignment Execution"
          name="otherPayments.deedOfAssignmentExecution"
        />
      </div>

      <div className="form-row">
        <InputFormat
          formGroupClassName="col-md-6"
          label="Power Connection Fee"
          name="otherPayments.powerConnectionFee"
        />
        <InputFormat
          formGroupClassName="col-md-6"
          label="Survey Plan"
          name="otherPayments.surveyPlan"
        />
      </div>
    </>
  );
};

const OtherTermsForm = () => {
  return (
    <>
      <div className="form-row">
        <Input
          formGroupClassName="col-md-6"
          label="Administrative Charge"
          name="otherTerms.administrativeCharge"
          type="number"
          max={20}
          min={0}
        />
        <Input
          formGroupClassName="col-md-6"
          label="Bank Draft Due"
          name="otherTerms.bankDraftDue"
          type="number"
          max={20}
          min={0}
        />
      </div>
      <div className="form-row">
        <Input
          formGroupClassName="col-md-6"
          label="Date Due"
          name="otherTerms.dateDue"
          type="number"
          max={20}
          min={0}
        />
        <Input
          formGroupClassName="col-md-6"
          label="Deductible Refund Percentage"
          name="otherTerms.deductibleRefundPercentage"
          type="number"
          max={20}
          min={0}
        />
      </div>
      <div className="form-row">
        <Input
          formGroupClassName="col-md-6"
          label="Grace Period"
          name="otherTerms.gracePeriod"
          type="number"
          max={20}
          min={0}
        />
        <Input
          formGroupClassName="col-md-6"
          label="Termination Interest"
          name="otherTerms.terminationInterest"
          type="number"
          max={20}
          min={0}
        />
      </div>
      <div className="form-row">
        <Input
          formGroupClassName="col-md-6"
          label="Termination Period"
          name="otherTerms.terminationPeriod"
          type="number"
          max={20}
          min={0}
        />
      </div>
    </>
  );
};

const SubmitOfferLetter = ({ enquiry, handleHideOfferLetter, value }) => {
  const [toast, setToast] = useToast();
  const { totalAmountPayable, initialPayment, periodicPayment } = value;
  const rangePrice = totalAmountPayable - initialPayment;
  const noOfMonths =
    rangePrice / periodicPayment > 1
      ? Math.floor(rangePrice / periodicPayment)
      : 1;
  const [showSubmitOfferModal, setShowSubmitOfferModal] = React.useState(false);

  const submitOfferLetter = () => {
    const handOverDate = addMonths(new Date(), noOfMonths);
    const expires = addDays(new Date(), value.expires);
    const enquiryId = enquiry._id;
    const payload = { ...value, enquiryId, expires, handOverDate };

    Axios.post(`${BASE_API_URL}/offer/create`, payload, {
      headers: { Authorization: getTokenFromStore() },
    })
      .then(function (response) {
        const { status } = response;
        if (status === 201) {
          setShowSubmitOfferModal(false);
          setToast({
            message: 'Your offer letter has been created',
            type: 'success',
          });
        }
      })
      .catch(function (error) {
        setToast({
          message: getError(error),
        });
      });
  };

  const SubmitOfferModal = () => (
    <Modal
      title="Submit Offer"
      show={showSubmitOfferModal}
      onHide={() => setShowSubmitOfferModal(false)}
      showFooter={false}
    >
      <section className="row">
        <div className="col-md-10">
          <p className="mb-5">
            Are you sure you wish to submit the offer letter. Ensure you have
            confirm all the offer information as this process is irreversible.
          </p>

          <button className="btn btn-danger mb-3" onClick={submitOfferLetter}>
            Submit Offer Letter
          </button>
        </div>
      </section>
    </Modal>
  );

  return (
    <div className="container-fluid">
      <Toast {...toast} />
      <h5 className="mb-3 text-center">
        Offer Letter (Expires in {value.expires} days)
      </h5>
      <OfferLetterTemplate
        enquiryInfo={enquiry}
        offerInfo={value}
        propertyInfo={enquiry.propertyInfo}
        vendorInfo={enquiry.vendorInfo}
      />
      <button
        className="btn btn-danger btn-wide mt-5"
        onClick={() => setShowSubmitOfferModal(true)}
      >
        Submit Offer Letter
      </button>
      &nbsp;&nbsp;
      <button
        onClick={handleHideOfferLetter}
        className="btn btn-secondary btn-wide mt-5"
      >
        Back to Form
      </button>
      <SubmitOfferModal />
    </div>
  );
};

export default CreateOfferLetter;
