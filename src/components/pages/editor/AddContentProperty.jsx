import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { Card } from 'react-bootstrap';
import Toast, { useToast } from 'components/utils/Toast';
import Axios from 'axios';
import Input from 'components/forms/Input';
import {
  setInitialValues,
  DisplayFormikState,
} from 'components/forms/form-helper';
import Button from 'components/forms/Button';
import { Formik, Form } from 'formik';
import {
  createSchema,
  addressSchema,
} from 'components/forms/schemas/schema-helpers';
import { BASE_API_URL } from 'utils/constants';
import { getTokenFromStore } from 'utils/localStorage';
import { addContentPropertySchema } from 'components/forms/schemas/propertySchema';
import InputFormat from 'components/forms/InputFormat';
import { getError, valuesToOptions } from 'utils/helpers';
import Select from 'components/forms/Select';

const AddContentProperty = () => (
  <BackendPage>
    <div className="container-fluid">
      <AddContentPropertyForm />
    </div>
  </BackendPage>
);

const AddContentPropertyForm = () => {
  const [toast, setToast] = useToast();

  return (
    <Formik
      enableReinitialize={true}
      initialValues={setInitialValues(addContentPropertySchema)}
      onSubmit={(values, actions) => {
        Axios.post(`${BASE_API_URL}/content-property/add`, values, {
          headers: { Authorization: getTokenFromStore() },
        })
          .then(function (response) {
            const { status } = response;
            if (status === 201) {
              setToast({
                type: 'success',
                message: `Your property has been successfully added`,
              });
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
      validationSchema={createSchema({
        ...addContentPropertySchema,
        address: createSchema(addressSchema),
      })}
    >
      {({ isSubmitting, handleSubmit, ...props }) => (
        <Form>
          <Toast {...toast} />
          <PropertyInfoForm {...props} />
          <Button
            className="btn-secondary mt-4"
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            Add New Content Property
          </Button>
          <DisplayFormikState {...props} showAll />
        </Form>
      )}
    </Formik>
  );
};

const PropertyInfoForm = () => {
  return (
    <Card className="card-container">
      <section className="row">
        <div className="col-md-10 px-4">
          <h5 className="mb-4">Property Information</h5>
          <div className="form-row">
            <Select
              formGroupClassName="col-md-6"
              label="State"
              name="state"
              options={valuesToOptions(['For Sale', 'For Rent'])}
              placeholder="Select Bedrooms"
            />
            <Select
              formGroupClassName="col-md-6"
              label="Area"
              name="area"
              options={valuesToOptions(['For Sale', 'For Rent'])}
              placeholder="Select Bedrooms"
            />
          </div>

          <div className="form-row">
            <Select
              formGroupClassName="col-md-6"
              label="Category"
              name="category"
              options={valuesToOptions(['For Sale', 'For Rent'])}
              placeholder="Select Bedrooms"
            />
            <Select
              formGroupClassName="col-md-6"
              label="House Type"
              name="houseType"
              options={valuesToOptions(['For Sale', 'For Rent'])}
              placeholder="Select Bedrooms"
            />
          </div>

          <div className="form-row">
            <InputFormat
              formGroupClassName="col-md-12"
              label="Price"
              name="price"
              placeholder="Price"
            />
          </div>

          <Input
            label="Website Name"
            name="website"
            optional
            placeholder="Website Name"
          />

          <Input label="Link" name="link" optional placeholder="Property URL" />
        </div>
      </section>
    </Card>
  );
};

export default AddContentProperty;
