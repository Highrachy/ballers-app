import React from 'react';
import { Card } from 'react-bootstrap';
import {
  setInitialValues,
  DisplayFormikState,
} from 'components/forms/form-helper';
import Axios from 'axios';
import { BASE_API_URL } from 'utils/constants';
import Toast, { useToast } from 'components/utils/Toast';
import { getTokenFromStore } from 'utils/localStorage';
import Button from 'components/forms/Button';
import { Formik, Form } from 'formik';
import { createSchema } from 'components/forms/schemas/schema-helpers';
import Select from 'components/forms/Select';
import Textarea from 'components/forms/Textarea';
import { generateNumOptions, getError } from 'utils/helpers';
import { offerLetterSchema } from 'components/forms/schemas/propertySchema';
import InputFormat from 'components/forms/InputFormat';
import Input from 'components/forms/Input';
import { addDays, addMonths } from 'date-fns';
import Modal from 'components/common/Modal';
import OfferLetterTemplate from 'components/utils/OfferLetterTemplate';

const CreateOfferLetter = ({ enquiry }) => {
  const defaultValue = {
    totalAmountPayable: enquiry.propertyInfo[0].price,
    allocationInPercentage: 100,
    initialPayment: enquiry.initialInvestmentAmount,
    monthlyPayment: '1000000',
    paymentFrequency: enquiry.investmentFrequency,
    expires: '7',
    title:
      'Deed of Assignment for one unit of 3 bedroom apartment within the buildings sited on land covered by duly registered, Governor Consented deed of assignment dated the 20th day of May, 2016 and registered as No. 87 at page 87 in volume 2547v at the office of the Lagos State Land Registry, Ikeja.',
    deliveryState:
      'The subject property will be delivered as a finished unit inclusive of Wall painting, floor tiling, and POP ceilings, joinery, internal and external doors, electrical and mechanical fittings and fixtures as prescribed by the project drawings and specification documents. The externals walls will also be finished in line with standard Blissville specifications.',
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
                      name="allocationInPercentage"
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
                        { value: '0.5', label: 'Bi-Weekly' },
                        { value: '1', label: 'Monthly' },
                        { value: '3', label: 'Quarterly' },
                      ]}
                    />
                    <Select
                      formGroupClassName="col-md-6"
                      label="Offer Expires in"
                      name="expires"
                      options={generateNumOptions(11, 'Day', { startFrom: 5 })}
                      placeholder="Allocation Month"
                    />
                  </div>

                  <Textarea
                    label="Title Document"
                    name="title"
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

const SubmitOfferLetter = ({ enquiry, handleHideOfferLetter, value }) => {
  const [toast, setToast] = useToast();
  const { totalAmountPayable, initialPayment, monthlyPayment } = value;
  const rangePrice = totalAmountPayable - initialPayment;
  const noOfMonths =
    rangePrice / monthlyPayment > 1
      ? Math.floor(rangePrice / monthlyPayment)
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
            Are you sure you wish to submit the offer letter. This process is
            irreversible.
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
        propertyInfo={enquiry.propertyInfo[0]}
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
