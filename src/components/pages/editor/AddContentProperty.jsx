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
import { createSchema } from 'components/forms/schemas/schema-helpers';
import { BASE_API_URL, HOUSE_TYPES, STATES } from 'utils/constants';
import { getTokenFromStore } from 'utils/localStorage';
import { addContentPropertySchema } from 'components/forms/schemas/propertySchema';
import InputFormat from 'components/forms/InputFormat';
import { getError, valuesToOptions } from 'utils/helpers';
import Select from 'components/forms/Select';
import { Link } from '@reach/router';

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
        if (!values.website) delete values.website;
        if (!values.link) delete values.link;
        delete values.state;

        Axios.post(`${BASE_API_URL}/content-property/add`, values, {
          headers: { Authorization: getTokenFromStore() },
        })
          .then(function (response) {
            const { status } = response;
            if (status === 201) {
              setToast({
                type: 'success',
                message: `Your content property has been successfully added`,
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
      validationSchema={createSchema(addContentPropertySchema)}
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
          <h5 className="mb-2">Add a new Content Property</h5>
          <p className="text-muted small mb-4">
            If the property state or area is not in the dropdown, you can{' '}
            <Link to="/editor/area/new">add a new one here</Link>
          </p>
          <div className="form-row">
            <Select
              formGroupClassName="col-md-6"
              label="State"
              name="state"
              options={valuesToOptions(STATES)}
              placeholder="Select State"
            />
            <Select
              formGroupClassName="col-md-6"
              label="Area"
              name="areaId"
              options={[
                { label: 'Lekki Phase 1', value: '5fb20c467af2280017a873cf' },
                { label: 'Ajegunle', value: '5fb20c467af2280017a873cf' },
              ]}
              placeholder="Select Area"
            />
          </div>

          <div className="form-row">
            <Select
              formGroupClassName="col-md-6"
              label="Category"
              name="category"
              options={valuesToOptions(['For Sale', 'For Rent'])}
              placeholder="Select Category"
            />
            <Select
              formGroupClassName="col-md-6"
              label="House Type"
              name="houseType"
              options={valuesToOptions(HOUSE_TYPES)}
              placeholder="Select House Type"
            />
          </div>

          <div className="form-row">
            <InputFormat
              formGroupClassName="col-md-6"
              label="Price"
              name="price"
              placeholder="Price"
            />
            <Input
              formGroupClassName="col-md-6"
              label="Website Name"
              name="website"
              optional
              placeholder="Website Name"
            />
          </div>

          <Input
            label="Property Link"
            name="link"
            optional
            placeholder="Property URL"
          />
        </div>
      </section>
    </Card>
  );
};

export default AddContentProperty;
