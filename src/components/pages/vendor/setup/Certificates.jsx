import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { Card } from 'react-bootstrap';
import Toast, { useToast } from 'components/utils/Toast';
import Axios from 'axios';
import Button from 'components/forms/Button';
import {
  BASE_API_URL,
  INDIVIDUAL_IDENTIFICATION_TYPE,
  VENDOR_IDENTIFICATION_TYPE,
} from 'utils/constants';
import { getTokenFromStore } from 'utils/localStorage';
import { UserContext } from 'context/UserContext';
import { getError, statusIsSuccessful, valuesToOptions } from 'utils/helpers';
import UploadImage from 'components/utils/UploadImage';
import Image from 'components/utils/Image';
import {
  setInitialValues,
  DisplayFormikState,
} from 'components/forms/form-helper';
import { Formik, Form } from 'formik';
import { createSchema } from 'components/forms/schemas/schema-helpers';
import { certificateSchema } from 'components/forms/schemas/vendorSchema';
import Select from 'components/forms/Select';

const Certificates = () => (
  <BackendPage>
    <div className="container-fluid">
      <CertificatesForm />
    </div>
  </BackendPage>
);

export const CertificatesForm = ({ moveToNextStep, setStepToast }) => {
  const [toast, setToast] = useToast();
  const [taxImage, setTaxImage] = React.useState(null);
  const [certificateImage, setCertificateImage] = React.useState(null);
  const { userDispatch, userState } = React.useContext(UserContext);

  const entity = userState.vendor && userState.vendor.entity;
  const isIndividual =
    entity &&
    VENDOR_IDENTIFICATION_TYPE[entity] &&
    VENDOR_IDENTIFICATION_TYPE[entity] ===
      VENDOR_IDENTIFICATION_TYPE.Individual;
  const type = isIndividual ? '' : VENDOR_IDENTIFICATION_TYPE[entity];

  return (
    <Formik
      enableReinitialize={true}
      initialValues={setInitialValues(certificateSchema, { type })}
      onSubmit={(values, actions) => {
        let payload = {
          vendor: {
            taxCertificate: taxImage || userState.vendor?.taxCertificate,
          },
        };

        if (certificateImage) {
          payload.vendor.identification = [
            {
              type: values.type,
              url: certificateImage,
            },
          ];
        }

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
                message: `Your certificates has been successfully saved`,
              };
              setToast(successMessage);
              setStepToast(successMessage);
              actions.setSubmitting(false);
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
      validationSchema={createSchema(certificateSchema)}
    >
      {({ isSubmitting, handleSubmit, ...props }) => (
        <Form>
          <Toast {...toast} />
          <Card className="card-container">
            <section className="row">
              <div className="col-md-10 px-4">
                <UploadCertificate
                  image={certificateImage}
                  setImage={setCertificateImage}
                  title={`Upload ${type ? type : 'Company Identification'}`}
                >
                  {isIndividual && (
                    <Select
                      label="Identification Type"
                      name="type"
                      options={valuesToOptions(INDIVIDUAL_IDENTIFICATION_TYPE)}
                      placeholder="Select Identfication Type"
                    />
                  )}
                </UploadCertificate>
                <UploadCertificate
                  image={taxImage}
                  setImage={setTaxImage}
                  title="Upload Tax Certificate"
                />

                <DisplayFormikState {...props} showAll />

                <Button
                  className="btn-secondary my-4"
                  loading={isSubmitting}
                  onClick={handleSubmit}
                  diasabled={!(taxImage || certificateImage)}
                >
                  Save Changes
                </Button>
              </div>
            </section>
          </Card>
          <DisplayFormikState {...props} showAll hide />
        </Form>
      )}
    </Formik>
  );
};

const UploadCertificate = ({ children, title, image, setImage }) => (
  <Card className="card-container mt-5">
    <section className="row">
      <div className="col-md-10 px-4">
        <h5 className="mb-4">{title}</h5>
        {image && (
          <Image
            className="uploaded-image mb-3"
            name="property image"
            src={image}
          />
        )}
        {children}
        <UploadImage
          afterUpload={(image) => setImage(image)}
          defaultImage={image}
        />
      </div>
    </section>
  </Card>
);

export default Certificates;
