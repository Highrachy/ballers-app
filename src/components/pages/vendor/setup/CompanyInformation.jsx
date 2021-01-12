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
import {
  companyInfoSchema,
  phoneNumbersSchema,
} from 'components/forms/schemas/vendorSchema';
import { getError, statusIsSuccessful, valuesToOptions } from 'utils/helpers';
import Address from 'components/utils/Address';
import Select from 'components/forms/Select';
import UploadImage from 'components/utils/UploadImage';
import Image from 'components/utils/Image';

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
  const [logo, setLogo] = React.useState(null);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        ...setInitialValues(phoneNumbersSchema, userState),
        vendor: setInitialValues(companyInfoSchema, userState.vendor),
        address: setInitialValues(addressSchema, userState.address),
      }}
      onSubmit={(values, actions) => {
        let payload = {
          ...values,
          address: { ...values.address, country: 'Nigeria' },
        };

        if (!values.redanNumber) delete payload.vendor.redanNumber;
        if (!values.phone2) delete payload.phone2;
        if (!values.address.street2) delete payload.address.street2;
        if (logo) {
          payload.vendor.companyLogo = logo;
        }

        console.log('payload', payload);

        Axios.put(`${BASE_API_URL}/user/vendor/update`, payload, {
          headers: { Authorization: getTokenFromStore() },
        })
          .then(function (response) {
            const { status, data } = response;
            if (statusIsSuccessful(status)) {
              userDispatch({
                type: 'user-profile-update',
                user: data.user,
              });

              const successMessage = {
                type: 'success',
                message: `Company Information has been successfully saved`,
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
        ...phoneNumbersSchema,
        vendor: createSchema(companyInfoSchema),
        address: createSchema(addressSchema),
      })}
    >
      {({ isSubmitting, handleSubmit, ...props }) => (
        <Form>
          <Toast {...toast} />
          <CompanyLogo
            image={logo || userState.vendor?.companyLogo}
            setImage={setLogo}
          />
          <CompanyInfoForm {...props} />
          <CompanyAddress />
          <Button
            className="btn-secondary my-4"
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            Save Changes
          </Button>

          <DisplayFormikState {...props} />
        </Form>
      )}
    </Formik>
  );
};

const CompanyInfoForm = ({ values }) => {
  console.log('vendor', values.vendor);
  return (
    <Card className="card-container">
      <section className="row">
        <div className="col-md-10 px-4">
          <h5 className="mb-4">Company Information</h5>

          <Input
            label="Company Name"
            name="vendor.companyName"
            placeholder="Company Name"
          />

          <div className="form-row">
            <Input
              formGroupClassName="col-md-6"
              label="Phone Number"
              name="phone"
            />
            <Input
              formGroupClassName="col-md-6"
              label="Phone Number 2"
              name="phone2"
              optional
            />
          </div>

          <div className="form-row">
            <Select
              formGroupClassName="col-md-6"
              label="Entity"
              name="vendor.entity"
              options={valuesToOptions(Object.keys(VENDOR_IDENTIFICATION_TYPE))}
              placeholder="Select Entity Type"
            />

            <Input
              formGroupClassName="col-md-6"
              label="Redan Number"
              name="vendor.redanNumber"
              optional
            />
          </div>
        </div>
      </section>
    </Card>
  );
};

const CompanyLogo = ({ image, setImage }) => (
  <Card className="card-container my-5">
    <section className="row">
      <div className="col-md-10 px-4">
        <h5 className="mt-2 mb-4">Company Logo</h5>
        {image && (
          <Image className="uploaded-image mb-3" name="logo" src={image} />
        )}
        <UploadImage
          afterUpload={(image) => setImage(image)}
          defaultImage={image}
        />
      </div>
    </section>
  </Card>
);

const CompanyAddress = () => (
  <Card className="card-container mt-5">
    <section className="row">
      <div className="col-md-10 px-4">
        <h5 className="mt-2 mb-4">Company Address (Head Office)</h5>

        <Address showCountry={false} />
      </div>
    </section>
  </Card>
);

export default CompanyInformation;