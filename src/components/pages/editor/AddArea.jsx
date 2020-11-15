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
import { BASE_API_URL, STATES } from 'utils/constants';
import { getTokenFromStore } from 'utils/localStorage';
import { addAreaSchema } from 'components/forms/schemas/propertySchema';
import { getError, valuesToOptions } from 'utils/helpers';
import Select from 'components/forms/Select';
import MapLocation from 'components/utils/MapLocation';

const AddArea = () => (
  <BackendPage>
    <div className="container-fluid">
      <AddAreaForm />
    </div>
  </BackendPage>
);

const AddAreaForm = () => {
  const [toast, setToast] = useToast();
  const [location, setLocation] = React.useState(null);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={setInitialValues(addAreaSchema)}
      onSubmit={(values, actions) => {
        let payload;

        payload = location
          ? {
              ...values,
              longitude: location.latLng.lng.toString(),
              latitude: location.latLng.lat.toString(),
            }
          : values;

        Axios.post(`${BASE_API_URL}/area/add`, payload, {
          headers: { Authorization: getTokenFromStore() },
        })
          .then(function (response) {
            const { status } = response;
            if (status === 201) {
              setToast({
                type: 'success',
                message: `Your area has been successfully added`,
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
      validationSchema={createSchema(addAreaSchema)}
    >
      {({ isSubmitting, handleSubmit, ...props }) => (
        <Form>
          <Toast {...toast} />
          <PropertyInfoForm {...props} />
          <MapLocation
            setLocation={setLocation}
            mapAddress={
              props.values.area
                ? `${props.values.area}, ${props.values.state}`
                : props.values.state
            }
          />
          <Button
            className="btn-secondary mt-4"
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            Add New Property
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
              options={valuesToOptions(STATES)}
              placeholder="Select State"
            />
            <Input
              formGroupClassName="col-md-6"
              label="Area"
              name="area"
              placeholder="Area"
            />
          </div>
        </div>
      </section>
    </Card>
  );
};

export default AddArea;
