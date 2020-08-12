import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import Toast, { useToast } from 'components/utils/Toast';
import Axios from 'axios';
import Input from 'components/forms/Input';
import {
  setInitialValues,
  DisplayFormikState,
} from 'components/forms/form-helper';
import Button from 'components/forms/Button';
import { Formik, Form } from 'formik';
// import { createSchema } from 'components/forms/schemas/schema-helpers';
import { registerSchema } from 'components/forms/schemas/userSchema';
import { Card } from 'react-bootstrap';
import Textarea from 'components/forms/Textarea';
import DatePicker from 'components/forms/DatePicker';
import RadioSelect from 'components/forms/RadioSelect';
import { BASE_API_URL } from 'utils/constants';
// import Select from 'components/forms/Select';

const PropertyEnquiry = () => (
  <BackendPage>
    <section className="container-fluid">
      <h4>Property Enquiry</h4>
      <EnquiryForm />
    </section>
  </BackendPage>
);

const EnquiryForm = () => {
  const [toast, setToast] = useToast();
  return (
    <Formik
      initialValues={setInitialValues(registerSchema, {
        agreement: [],
      })}
      onSubmit={(values, actions) => {
        delete values.agreement;

        Axios.post(`${BASE_API_URL}/user/register`, values)
          .then(function (response) {
            const { status } = response;
            if (status === 200) {
              setToast({
                type: 'success',
                message: `Your registration is successful. Kindly activate your account by clicking on the confirmation link sent to your inbox (${values.email}).`,
              });
              actions.setSubmitting(false);
              actions.resetForm();
            }
          })
          .catch(function (error) {
            setToast({
              message: error.response.data.message,
            });
            actions.setSubmitting(false);
          });
      }}
      // validationSchema={createSchema(registerSchema)}
    >
      {({ isSubmitting, handleSubmit, ...props }) => (
        <Form>
          <Toast {...toast} />
          <ClientDetailsForm />
          <PropertyDetailsForm />
          <InvestmentDetailsForm />
          <Button
            className="btn-secondary mt-4"
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            Submit Form
          </Button>
          <DisplayFormikState {...props} hide showAll />
        </Form>
      )}
    </Formik>
  );
};

const ClientDetailsForm = () => (
  <Card className="card-container">
    <section className="row">
      <div className="col-md-10">
        <h5>Client Details</h5>
        <div className="form-row">
          <Input
            formGroupClassName="col-md-6"
            isValidMessage="Titlelooks good"
            label="Title"
            name="title"
            placeholder="Title"
          />
          <Input
            formGroupClassName="col-md-6"
            isValidMessage="First Name looks good"
            label="First Name"
            name="firstName"
            placeholder="First Name"
          />
        </div>
        <div className="form-row">
          <Input
            formGroupClassName="col-md-6"
            isValidMessage="Last Name looks good"
            label="Last Name"
            name="lastName"
            placeholder="Last Name"
          />
          <Input
            formGroupClassName="col-md-6"
            isValidMessage="Other Names looks good"
            label="Other Names"
            name="otherName"
            placeholder="Other Names"
          />
        </div>

        <div className="form-row">
          <Input
            formGroupClassName="col-md-6"
            isValidMessage="Email address seems valid"
            label="Email"
            name="email"
            placeholder="Email Address"
          />
          <Input
            formGroupClassName="col-md-6"
            isValidMessage="Phone number looks good"
            label="Phone"
            name="phone"
            placeholder="Phone"
          />
        </div>

        <Textarea
          isValidMessage="Contact Address seems valid"
          label="Contact Address"
          name="address"
          placeholder="Contact Address"
        />

        <Input
          isValidMessage="Occupation looks good"
          label="Occupation/Nature of Business"
          name="occupation"
          placeholder="Occupation/Nature of Business"
        />
      </div>
    </section>
  </Card>
);

const PropertyDetailsForm = () => (
  <Card className="card-container mt-5">
    <section className="row">
      <div className="col-md-10">
        <h5>Property Details</h5>

        <Input
          isValidMessage="Other Names looks good"
          label="Name on Title Document"
          name="nameOnTitleDocument"
          placeholder="Name on Title Document"
        />
      </div>
    </section>
  </Card>
);

const InvestmentDetailsForm = () => (
  <Card className="card-container mt-5">
    <section className="row">
      <div className="col-md-10">
        <h5>Investment Details</h5>

        <Input
          isValidMessage="Other Names looks good"
          label="Name on Title Document"
          name="nameOnTitleDocument"
          placeholder="Name on Title Document"
        />

        <DatePicker
          isValidMessage="Surname looks good"
          label="Start Date"
          name="investmentStartDate"
          placeholder="State Date"
        />

        <Input
          isValidMessage="Other Names looks good"
          label="Initial Investment"
          name="initialInvestmentAmount"
          placeholder="Initial Investment"
        />
        <RadioSelect
          label="Investment Frequency"
          name="investmentFrequency"
          options={[
            { label: 'Monthly', value: '1' },
            { label: 'Quarterly', value: '4' },
            { label: 'Voluntarily', value: '0' },
          ]}
          labelSizeClassName="col-sm-4"
          radioSizeClassName="col-sm-8"
          inline
          custom
        />
        <Input
          isValidMessage="Other Names looks good"
          label="Periodic Investment"
          name="periodicInvestmentAmount"
          placeholder="Periodic Investment"
        />
      </div>
    </section>
  </Card>
);

export default PropertyEnquiry;
