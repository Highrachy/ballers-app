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
import { newPropertySchema } from 'components/forms/schemas/propertySchema';
import Textarea from 'components/forms/Textarea';
import InputFormat from 'components/forms/InputFormat';
import {
  getError,
  getLocationFromAddress,
  valuesToOptions,
  generateNumOptions,
  statusIsSuccessful,
} from 'utils/helpers';
import Address from 'components/utils/Address';
import Select from 'components/forms/Select';
import MapLocation from 'components/utils/MapLocation';
import Upload from 'components/utils/Upload';
import PropertyPlaceholderImage from 'assets/img/placeholder/property.png';
import FloorPlanPlaceholderImage from 'assets/img/placeholder/floor-plan.png';
import { navigate } from '@reach/router';
// import Converter from 'number-to-words';
// import Humanize from 'humanize-plus';

const NewProperty = ({ id }) => {
  const [toast, setToast] = useToast();
  const [property, setProperty] = React.useState(null);

  React.useEffect(() => {
    id &&
      Axios.get(`${BASE_API_URL}/property/${id}`, {
        headers: {
          Authorization: getTokenFromStore(),
        },
      })
        .then(function (response) {
          const { status, data } = response;
          // handle success
          if (status === 200) {
            setProperty(data.property);
            console.log('data.property', data.property);
          }
        })
        .catch(function (error) {
          setToast({
            message: getError(error),
          });
        });
  }, [setToast, id]);
  return (
    <BackendPage>
      <div className="container-fluid">
        <NewPropertyForm
          toast={toast}
          setToast={setToast}
          property={property}
        />
      </div>
    </BackendPage>
  );
};

const NewPropertyForm = ({ property, toast, setToast }) => {
  const [location, setLocation] = React.useState(null);
  const [image, setImage] = React.useState(
    property?.mainImage || getPropertyImage()
  );
  const [floorPlans, setFloorPlans] = React.useState(null);
  const saveImage = (image) => {
    setImage(image);
    storePropertyImage(image);
  };
  console.log('floorPlans', floorPlans);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        ...setInitialValues(newPropertySchema, { ...property }),
        address: setInitialValues(addressSchema, {
          ...property?.address,
          country: 'Nigeria',
        }),
      }}
      onSubmit={(values, actions) => {
        let payload;
        const payloadData = {
          ...values,
          mainImage: image || property?.mainImage,
          floorPlans: [],
        };

        payload = location
          ? {
              ...payloadData,
              mapLocation: {
                longitude: location.latLng.lng.toString(),
                latitude: location.latLng.lat.toString(),
              },
            }
          : payloadData;

        Axios({
          method: property?._id ? 'put' : 'post',
          url: property?._id
            ? `${BASE_API_URL}/property/update`
            : `${BASE_API_URL}/property/add`,
          data: property?._id ? { ...payload, id: property?._id } : payload,
          headers: { Authorization: getTokenFromStore() },
        })
          .then(function (response) {
            const { status } = response;
            if (statusIsSuccessful(status)) {
              if (property?._id) {
                navigate(`/vendor/portfolio/${property?._id}`);
                return;
              }
              setToast({
                type: 'success',
                message: `Your property has been successfully ${
                  property?._id ? 'updated' : 'added'
                }`,
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
          <PropertyInfoForm image={image} setImage={saveImage} {...props} />
          <PropertyAddress />
          <PropertyImage
            image={image}
            setImage={saveImage}
            oldImage={property?.mainImage}
          />
          <PropertyFloorPlans setFloorPlans={setFloorPlans} />
          <MapLocation
            setLocation={setLocation}
            mapAddress={getLocationFromAddress(props.values.address)}
          />
          <Button
            className="btn-secondary mt-4"
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            {property?._id ? 'Update' : 'Add New'} Property
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
          <Input
            label="Property Name"
            name="name"
            placeholder="Property Name"
          />

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
            <Select
              formGroupClassName="col-md-6"
              label="Bedrooms"
              name="bedrooms"
              options={generateNumOptions(9, 'Bedroom')}
              placeholder="Select Bedrooms"
            />
          </div>

          <div className="form-row">
            <Select
              formGroupClassName="col-md-6"
              label="Bathrooms"
              name="bathrooms"
              options={generateNumOptions(9, 'Bathroom')}
              placeholder="Select Bathrooms"
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

const PropertyImage = ({ setImage, oldImage }) => (
  <Card className="card-container mt-5">
    <section className="row">
      <div className="col-md-10 px-4">
        <h5 className="mb-4">Property Image</h5>
        <div className="my-4">
          <Upload
            afterUpload={(image) => setImage(image)}
            changeText={`Update Property Image`}
            defaultImage={PropertyPlaceholderImage}
            imgOptions={{ className: 'mb-3', watermark: true }}
            name="property-image"
            oldImage={oldImage}
            uploadText={`Upload Property Image`}
          />
        </div>
      </div>
    </section>
  </Card>
);

const PropertyFloorPlans = ({ setFloorPlans }) => (
  <Card className="card-container mt-5">
    <section className="row">
      <div className="col-md-10 px-4">
        <h5 className="mb-4">Property Floor Plan</h5>
        <div className="my-4">
          <Upload
            afterUpload={(image) => setFloorPlans(image)}
            changeText={`Update Floor Plan`}
            defaultImage={FloorPlanPlaceholderImage}
            imgOptions={{
              className: 'mb-3 img-md',
              bordered: true,
            }}
            allowPdf
            name="floor-plans"
            uploadText={`Upload Floor Plan`}
          />
        </div>
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

export default NewProperty;
