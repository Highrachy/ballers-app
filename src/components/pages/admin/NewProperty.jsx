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
import { BASE_API_URL } from 'utils/constants';
import { getTokenFromStore } from 'utils/localStorage';
import { UserContext } from 'context/UserContext';
import { newPropertySchema } from 'components/forms/schemas/propertySchema';
import Textarea from 'components/forms/Textarea';
import InputFormat from 'components/forms/InputFormat';
import MapPicker from 'components/utils/MapPicker';
import useMapGeocoder from 'hooks/useMapGeocoder';
import { getError } from 'utils/helpers';
// import Converter from 'number-to-words';
// import Humanize from 'humanize-plus';

const NewProperty = () => (
  <BackendPage>
    <div className="container-fluid">
      <NewPropertyForm />
    </div>
  </BackendPage>
);

const NewPropertyForm = () => {
  const [toast, setToast] = useToast();
  const [location, setLocation] = React.useState(null);
  const { userDispatch } = React.useContext(UserContext);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={setInitialValues(newPropertySchema)}
      onSubmit={(values, actions) => {
        let payload;
        payload = location
          ? {
              ...values,
              mapLocation: {
                longitude: location.latLng.lng.toString(),
                latitude: location.latLng.lat.toString(),
              },
            }
          : values;
        console.log('location', location);
        console.log('payload', payload);

        Axios.post(`${BASE_API_URL}/property/add`, payload, {
          headers: { Authorization: getTokenFromStore() },
        })
          .then(function (response) {
            const { status, data } = response;
            if (status === 201) {
              userDispatch({
                type: 'property-added',
                property: data.updatedUser,
              });
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
      validationSchema={createSchema(newPropertySchema)}
    >
      {({ isSubmitting, handleSubmit, ...props }) => (
        <Form>
          <Toast {...toast} />
          <PropertyInfoForm {...props} />
          <PropertyImage />
          <MapLocation
            setLocation={setLocation}
            mapAddress={props.values.location}
          />
          <Button
            className="btn-secondary mt-4"
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            Add New Property
          </Button>
          <DisplayFormikState {...props} hide showAll />
        </Form>
      )}
    </Formik>
  );
};

const PropertyInfoForm = ({ values }) => (
  <Card className="card-container">
    <section className="row">
      <div className="col-md-10 px-4">
        <h5 className="mb-4">Property Information</h5>
        <Input label="Property Name" name="name" placeholder="Property Name" />

        <Input label="House Type" name="houseType" placeholder="House Type" />

        <Textarea label="Location" name="location" placeholder="Location" />

        <div className="form-row">
          <InputFormat
            formGroupClassName="col-md-6"
            label="Price"
            name="price"
            placeholder="Price"
            // isValidMessage={`${
            //   values.price > 0
            //     ? `${Humanize.titleCase(Converter.toWords(values.price))} Naira`
            //     : ''
            // }`}
          />
          <Input
            type="number"
            formGroupClassName="col-md-6"
            label="Units"
            name="units"
            placeholder="Available Units"
          />
        </div>

        <div className="form-row">
          <Input
            type="number"
            formGroupClassName="col-md-6"
            label="Bedrooms"
            name="bedrooms"
            placeholder="Bedrooms"
          />
          <Input
            type="number"
            formGroupClassName="col-md-6"
            label="Toilets"
            name="toilets"
            placeholder="Toilets"
          />
        </div>

        <Textarea
          label="Description"
          name="description"
          placeholder="A detailed description of the property"
        />
      </div>
    </section>
  </Card>
);

const PropertyImage = () => (
  <Card className="card-container mt-5">
    <section className="row">
      <div className="col-md-10 px-4">
        <h5 className="mb-4">Property Image</h5>
        <Input
          label="Property Image"
          name="mainImage"
          placeholder="Property Image"
        />
      </div>
    </section>
  </Card>
);

const MapLocation = ({ mapAddress, setLocation }) => {
  console.log('mapAddress', mapAddress);
  const { latLngFromAddress } = useMapGeocoder({
    mapAddress,
  });
  return (
    <Card className="card-container mt-5">
      <section className="row">
        <div className="col-md-10 px-4">
          <h5 className="mb-4">Set Map Picker</h5>
          <MapPicker
            mapLocation={latLngFromAddress}
            processLocation={(value) => setLocation(value)}
          />
        </div>
      </section>
    </Card>
  );
};

export default NewProperty;
