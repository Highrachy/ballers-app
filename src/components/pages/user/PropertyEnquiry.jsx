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
import { addEnquirySchema } from 'components/forms/schemas/enquirySchema';
import { Card } from 'react-bootstrap';
import DatePicker from 'components/forms/DatePicker';
import RadioSelect from 'components/forms/RadioSelect';
import { BASE_API_URL } from 'utils/constants';
import Address from 'components/utils/Address';
import {
  createSchema,
  addressSchema,
} from 'components/forms/schemas/schema-helpers';
import { UserContext } from 'context/UserContext';

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
  const { userState } = React.useContext(UserContext);

  return (
    <Formik
      initialValues={{
        ...setInitialValues(addEnquirySchema, userState),
        address: setInitialValues(addressSchema, userState.address),
      }}
      onSubmit={(values, actions) => {
        const address = `${values.address.street1} ${values.address.street2} ${values.address.city}, ${values.address.state}, ${values.address.country}`;
        const payload = { ...values, address };
        Axios.post(`${BASE_API_URL}/enquiry/add`, payload)
          .then(function (response) {
            const { status } = response;
            if (status === 201) {
              setToast({
                type: 'success',
                message: 'Your enquiry has been successfully submitted',
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
      validationSchema={createSchema({
        ...addEnquirySchema,
        address: createSchema(addressSchema),
      })}
    >
      {({ isSubmitting, handleSubmit, ...props }) => (
        <Form>
          <Toast {...toast} />
          <ClientDetailsForm />
          <PropertyAddress />
          <PropertyDetailsForm />
          <InvestmentDetailsForm />
          <Button
            className="btn-secondary mt-4"
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            Submit Form
          </Button>
          <DisplayFormikState {...props} showAll />
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
            label="Title"
            name="title"
            placeholder="Title"
          />
          <Input
            formGroupClassName="col-md-6"
            label="First Name"
            name="firstName"
            placeholder="First Name"
          />
        </div>
        <div className="form-row">
          <Input
            formGroupClassName="col-md-6"
            label="Last Name"
            name="lastName"
            placeholder="Last Name"
          />
          <Input
            formGroupClassName="col-md-6"
            label="Other Names"
            name="otherName"
            placeholder="Other Names"
          />
        </div>

        <div className="form-row">
          <Input
            formGroupClassName="col-md-6"
            label="Email"
            name="email"
            placeholder="Email Address"
          />
          <Input
            formGroupClassName="col-md-6"
            label="Phone"
            name="phone"
            placeholder="Phone"
          />
        </div>

        <Input
          label="Occupation/Nature of Business"
          name="occupation"
          placeholder="Occupation/Nature of Business"
        />
      </div>
    </section>
  </Card>
);

const PropertyAddress = () => (
  <Card className="card-container mt-5">
    <section className="row">
      <div className="col-md-10">
        <h5>Address</h5>

        <Address />
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

        <DatePicker
          label="Start Date"
          name="investmentStartDate"
          placeholder="State Date"
        />

        <Input
          label="Initial Investment Amount"
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
          label="Periodic Investment"
          name="periodicInvestmentAmount"
          placeholder="Periodic Investment"
        />
      </div>
    </section>
  </Card>
);

export default PropertyEnquiry;
