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
import { UserContext } from 'context/UserContext';
import { newPropertySchema } from 'components/forms/schemas/propertySchema';
import { getError } from 'utils/helpers';

const BankInformation = () => (
  <BackendPage>
    <div className="container-fluid">
      <BankInformationForm />
    </div>
  </BackendPage>
);

export const BankInformationForm = () => {
  const [toast, setToast] = useToast();
  const { userDispatch } = React.useContext(UserContext);

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
        let payload = { ...values };

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
          <BankInfoForm {...props} />
          <DisplayFormikState {...props} showAll hide />
        </Form>
      )}
    </Formik>
  );
};

const BankInfoForm = ({ isSubmitting, handleSubmit, ...props }) => {
  return (
    <Card className="card-container">
      <section className="row">
        <div className="col-md-10 px-4">
          <h5 className="mb-4">Bank Information</h5>
          <Input
            label="Account Name"
            name="accountName"
            placeholder="Account Name"
          />

          <div className="form-row">
            <Input
              formGroupClassName="col-md-6"
              label="Bank Name"
              name="bankName"
            />
            <Input
              formGroupClassName="col-md-6"
              label="Account Number"
              name="accountNumber"
            />
          </div>

          <Button
            className="btn-secondary my-4"
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            Save Changes
          </Button>
        </div>
      </section>
    </Card>
  );
};

export default BankInformation;
