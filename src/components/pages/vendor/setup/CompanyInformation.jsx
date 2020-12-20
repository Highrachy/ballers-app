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
  addressSchema,
  createSchema,
} from 'components/forms/schemas/schema-helpers';
import { BASE_API_URL, VENDOR_IDENTIFICATION_TYPE } from 'utils/constants';
import { getTokenFromStore } from 'utils/localStorage';
import { UserContext } from 'context/UserContext';
import { companyInfoSchema } from 'components/forms/schemas/vendorSchema';
import { getError, statusIsSuccessful, valuesToOptions } from 'utils/helpers';
import UploadProfileImage from 'components/utils/UploadProfileImage';
import Address from 'components/utils/Address';
import Select from 'components/forms/Select';

const CompanyInformation = () => (
  <BackendPage>
    <div className="container-fluid">
      <CompanyInformationForm />
    </div>
  </BackendPage>
);

export const CompanyInformationForm = ({ moveToNextStep, setStepToast }) => {
  const [toast, setToast] = useToast();
  const { userDispatch, userState } = React.useContext(UserContext);

  const TEST_DATA = {
    ...userState,
    companyName: 'Total',
    registerAs: 'Individual',
    redanNumber: '123456',
    address: {
      street1: '123 Testing Street 1',
      street2: 'yes, street 2',
      city: 'Alimosho',
      state: 'Lagos',
    },
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        ...setInitialValues(companyInfoSchema, TEST_DATA),
        address: setInitialValues(addressSchema, TEST_DATA.address),
      }}
      onSubmit={(values, actions) => {
        let payload = {
          companyAddress: { ...values.address, country: 'Nigeria' },
          companyName: values.companyName,
          redanNumber: values.redanNumber,
          website: values.registerAs,
        };

        if (!values.redanNumber) delete payload.redanNumber;

        Axios.put(`${BASE_API_URL}/user/vendor/update`, payload, {
          headers: { Authorization: getTokenFromStore() },
        })
          .then(function (response) {
            const { status, data } = response;
            if (statusIsSuccessful(status)) {
              userDispatch({
                type: 'user-profile-update',
                property: data.user,
              });

              const successMessage = {
                type: 'success',
                message: `Your information has been successfully added`,
              };
              setToast(successMessage);
              setStepToast(successMessage);
              actions.setSubmitting(false);
              actions.resetForm();
              moveToNextStep();
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
        ...companyInfoSchema,
        address: createSchema(addressSchema),
      })}
    >
      {({ isSubmitting, handleSubmit, ...props }) => (
        <Form>
          <Toast {...toast} />
          <CompanyInfoForm
            {...props}
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
          />
          <DisplayFormikState {...props} />
        </Form>
      )}
    </Formik>
  );
};

const CompanyInfoForm = ({ isSubmitting, handleSubmit, ...props }) => {
  return (
    <Card className="card-container">
      <section className="row">
        <div className="col-md-10 px-4">
          <h5 className="mb-4">Company Information</h5>

          <UploadProfileImage />

          <Input
            label="Company Name"
            name="companyName"
            placeholder="Company Name"
          />

          <div className="form-row">
            <Select
              formGroupClassName="col-md-6"
              label="Register As"
              name="registerAs"
              options={valuesToOptions(Object.keys(VENDOR_IDENTIFICATION_TYPE))}
              placeholder="Select Entity Type"
            />

            <Input
              formGroupClassName="col-md-6"
              isValidMessage="Redan Number"
              label="Redan Number"
              name="redanNumber"
              optional
            />
          </div>

          <h5 className="mt-5 mb-4">Company Address (Head Office)</h5>

          <Address showCountry={false} />

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

export default CompanyInformation;
