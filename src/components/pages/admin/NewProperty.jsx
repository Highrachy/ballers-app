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
  const { userDispatch } = React.useContext(UserContext);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={setInitialValues(newPropertySchema)}
      onSubmit={(values, actions) => {
        !values.titleDocument && delete values.titleDocument;
        !values.floorPlans && delete values.floorPlans;

        Axios.post(`${BASE_API_URL}/property/add`, values, {
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
              message: error.response.data.error || error.response.data.message,
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
          <PropertyTitleDocument />
          <PropertyFloorPlan />
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

const PropertyTitleDocument = () => (
  <Card className="card-container mt-5">
    <section className="row">
      <div className="col-md-10 px-4">
        <h5 className="mb-4">Property Title Document</h5>
        <Input
          label="Property Title Document"
          name="titleDocument"
          placeholder="Property Title Document"
        />
      </div>
    </section>
  </Card>
);

const PropertyFloorPlan = () => (
  <Card className="card-container mt-5">
    <section className="row">
      <div className="col-md-10 px-4">
        <h5 className="mb-4">Property Floor Plans</h5>
        <Input
          label="Property Floor Plan"
          name="floorPlans"
          placeholder="Property Floor Plan"
        />
      </div>
    </section>
  </Card>
);

export default NewProperty;
