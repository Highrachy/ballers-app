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
  // addressSchema,
} from 'components/forms/schemas/schema-helpers';
import { BASE_API_URL, VENDOR_IDENTIFICATION_TYPE } from 'utils/constants';
import { getTokenFromStore } from 'utils/localStorage';
import { UserContext } from 'context/UserContext';
import { companyInfoSchema } from 'components/forms/schemas/vendorSchema';
import Textarea from 'components/forms/Textarea';
import { getError, valuesToOptions } from 'utils/helpers';
import Select from 'components/forms/Select';
import PhoneNumber from 'components/forms/PhoneNumber';

const CompanyInformation = () => (
  <BackendPage>
    <div className="container-fluid">
      <CompanyInformationForm />
    </div>
  </BackendPage>
);

export const CompanyInformationForm = () => {
  const [toast, setToast] = useToast();
  const { userDispatch } = React.useContext(UserContext);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={
        ({
          ...setInitialValues(companyInfoSchema),
          // address: setInitialValues(addressSchema),
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
        ...companyInfoSchema,
        // address: createSchema(addressSchema),
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
          <DisplayFormikState {...props} hide />
        </Form>
      )}
    </Formik>
  );
};

const CompanyInfoForm = ({ isSubmitting, handleSubmit, ...props }) => {
  console.log('props', props);
  return (
    <Card className="card-container">
      <section className="row">
        <div className="col-md-10 px-4">
          <h5 className="mb-4">Company Information</h5>
          <Input
            label="Company Name"
            name="companyName"
            placeholder="Company Name"
          />
          <Textarea
            label="Company Address"
            name="companyAddress"
            placeholder="Company Address"
          />

          <div className="form-row">
            <Input
              formGroupClassName="col-md-6"
              isValidMessage="Email address seems valid"
              label="Company Email"
              name="email"
              placeholder="Email Address"
            />
            <PhoneNumber
              formGroupClassName="col-md-6"
              isValidMessage="Phone number looks good"
              label="Company Phone"
              name="phoneNumber"
              placeholder="Phone"
            />
          </div>

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
              label={
                props.values.registerAs
                  ? VENDOR_IDENTIFICATION_TYPE[props.values.registerAs]
                  : 'Identification'
              }
              name="identification"
            />
          </div>

          <div className="row">
            <Input
              formGroupClassName="col-md-6"
              isValidMessage="Redan Number"
              label="Redan Number"
              name="Redan Number"
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

export default CompanyInformation;
