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
import { BASE_API_URL, HOUSE_TYPES } from 'utils/constants';
import {
  getTokenFromStore,
  storePropertyImage,
  getPropertyImage,
} from 'utils/localStorage';
import { UserContext } from 'context/UserContext';
import { newPropertySchema } from 'components/forms/schemas/propertySchema';
import Textarea from 'components/forms/Textarea';
import InputFormat from 'components/forms/InputFormat';
import MapPicker from 'components/utils/MapPicker';
import useMapGeocoder from 'hooks/useMapGeocoder';
import {
  getError,
  getLocationFromAddress,
  valuesToOptions,
  generateNumOptions,
} from 'utils/helpers';
import Address from 'components/utils/Address';
import Select from 'components/forms/Select';
import UploadImage from 'components/utils/UploadImage';
import Image from 'components/utils/Image';
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
  const [image, setImage] = React.useState(getPropertyImage());
  const { userDispatch } = React.useContext(UserContext);
  const saveImage = (image) => {
    setImage(image);
    storePropertyImage(image);
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={
        ({
          ...setInitialValues(newPropertySchema),
          address: setInitialValues(addressSchema),
        },
        { address: { country: 'Nigeria' } })
      }
      onSubmit={(values, actions) => {
        let payload;
        const payloadData = { ...values, mainImage: image };

        payload = location
          ? {
              ...payloadData,
              mapLocation: {
                longitude: location.latLng.lng.toString(),
                latitude: location.latLng.lat.toString(),
              },
            }
          : payloadData;

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
      validationSchema={createSchema({
        ...newPropertySchema,
        address: createSchema(addressSchema),
      })}
    >
      {({ isSubmitting, handleSubmit, ...props }) => (
        <Form>
          <Toast {...toast} />
          <PropertyInfoForm {...props} />
          <PropertyAddress />
          <PropertyImage image={image} setImage={saveImage} />
          <MapLocation
            setLocation={setLocation}
            mapAddress={getLocationFromAddress(props.values.address)}
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
  const [displayForm, setDisplayForm] = React.useState({ eventType: false });
  const toggleForm = (value) => {
    setDisplayForm({ [value]: !displayForm[value] });
  };
  return (
    <Card className="card-container">
      <section className="row">
        <div className="col-md-10 px-4">
          <h5 className="mb-4">Property Information</h5>
          <div className="form-row">
            <Input
              formGroupClassName="col-md-6"
              label="Property Name"
              name="name"
              placeholder="Property Name"
            />

            {displayForm.houseType ? (
              <Input
                formGroupClassName="col-md-6"
                label="House Type"
                name="houseType"
                placeholder="House Type"
                labelLink={{
                  onClick: () => toggleForm('houseType'),
                  text: 'Select House Type',
                  to: '',
                }}
              />
            ) : (
              <Select
                placeholder="Select House Type"
                formGroupClassName="col-md-6"
                label="House Type"
                labelLink={{
                  onClick: () => toggleForm('houseType'),
                  text: 'Type Manually',
                  to: '',
                }}
                name="houseType"
                options={valuesToOptions(HOUSE_TYPES)}
              />
            )}
          </div>

          <div className="form-row">
            <InputFormat
              formGroupClassName="col-md-6"
              label="Price"
              name="price"
              placeholder="Price"
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
            <Select
              formGroupClassName="col-md-6"
              label="Bedrooms"
              name="bedrooms"
              options={generateNumOptions(9, 'Bedroom')}
              placeholder="Select Bedrooms"
            />
            <Select
              formGroupClassName="col-md-6"
              label="Toilets"
              name="toilets"
              options={generateNumOptions(9, 'Toilet')}
              placeholder="Select Toilets"
            />
          </div>

          <Textarea
            label="Description"
            name="description"
            placeholder="A detailed description of the property"
          />

          <Textarea
            label="Title Document"
            name="titleDocument"
            optional
            placeholder="Title Document"
          />
        </div>
      </section>
    </Card>
  );
};

const PropertyImage = ({ image, setImage }) => (
  <Card className="card-container mt-5">
    <section className="row">
      <div className="col-md-10 px-4">
        <h5 className="mb-4">Property Image</h5>
        {image && (
          <Image
            className="uploaded-image mb-3"
            name="property image"
            src={image}
          />
        )}
        <UploadImage
          afterUpload={(image) => setImage(image)}
          defaultImage={image}
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

        <Address showCountry={false} />
      </div>
    </section>
  </Card>
);

const MapLocation = ({ mapAddress, setLocation }) => {
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
