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
import { getError, isValidURL } from 'utils/helpers';
import Select from 'components/forms/Select';
import {
  DigitalSignaturePad,
  UploadSignature,
} from 'components/pages/user/OfferLetter';
import Image from 'components/utils/Image';

const Signatories = () => (
  <BackendPage>
    <div className="container-fluid">
      <SignatoriesForm />
    </div>
  </BackendPage>
);

export const SignatoriesForm = () => {
  const [toast, setToast] = useToast();
  const { userDispatch } = React.useContext(UserContext);
  const [image, setImage] = React.useState(null);
  const [signature, setSignature] = React.useState(null);

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
        let payload = { ...values, mainImage: image };

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
          <PropertyInfoForm
            {...props}
            image={image}
            setImage={setImage}
            signature={signature}
            setSignature={setSignature}
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
          />
          <DisplayFormikState {...props} showAll hide />
        </Form>
      )}
    </Formik>
  );
};

const PropertyInfoForm = ({
  image,
  setImage,
  signature,
  setSignature,
  isSubmitting,
  handleSubmit,
}) => {
  return (
    <Card className="card-container">
      <section className="row">
        <div className="col-md-10 px-4">
          <h5 className="mb-4"> Directors &amp; Signatories</h5>
          <div className="form-row">
            <Input
              formGroupClassName="col-md-6"
              label="Director Name"
              name="name"
            />
            <Input
              formGroupClassName="col-md-6"
              label="Phone Number"
              name="phoneNumber"
            />
          </div>

          <div className="row">
            <Select
              formGroupClassName="col-md-6"
              label="Director is A Signature"
              name="isSignatory"
              options={[
                { value: 'true', label: 'Yes, Director is a Signatory' },
                { value: 'false', label: 'No, Director is not a Signatory' },
              ]}
            />
          </div>

          <div className="mt-5">
            {signature && (
              <h3 className="signature-pad">
                <>
                  {isValidURL(signature) ? (
                    <Image
                      className="signature-image uploaded-image mb-3"
                      name="Signature"
                      src={signature}
                    />
                  ) : (
                    signature
                  )}
                </>
              </h3>
            )}
            <DigitalSignaturePad setSignature={setSignature} />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <UploadSignature
              image={image}
              setImage={setImage}
              setSignature={setSignature}
            />
          </div>

          <Button
            className="btn-secondary mt-4"
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            Add New Property
          </Button>
        </div>
      </section>
    </Card>
  );
};

export default Signatories;
