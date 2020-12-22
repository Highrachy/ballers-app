import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import { Card } from 'react-bootstrap';
import Toast, { useToast } from 'components/utils/Toast';
import Axios from 'axios';
import Button from 'components/forms/Button';
import { BASE_API_URL } from 'utils/constants';
import { getTokenFromStore } from 'utils/localStorage';
import { UserContext } from 'context/UserContext';
import { getError, statusIsSuccessful } from 'utils/helpers';
import UploadImage from 'components/utils/UploadImage';
import Image from 'components/utils/Image';

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
  const [loading, setLoading] = React.useState(false);
  const { userDispatch, userState } = React.useContext(UserContext);

  console.log('userState', userState);

  const handleSubmit = () => {
    const payload = { identification: [{ type: 'tax', url: 'test' }] };
    setLoading(true);
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
          setLoading(false);
          moveToNextStep();
        }
      })
      .catch(function (error) {
        setToast({
          message: getError(error),
        });
        setLoading(false);
      });
  };

  return (
    <>
      <Toast {...toast} />
      <Card className="card-container">
        <section className="row">
          <div className="col-md-10 px-4">
            <UploadCertificate
              image={certificateImage}
              setImage={setCertificateImage}
              title="Upload Company Certificate"
            />
            <UploadCertificate
              image={taxImage}
              setImage={setTaxImage}
              title="Upload Tax Certificate"
            />

            <Button
              className="btn-secondary my-4"
              loading={loading}
              onClick={handleSubmit}
            >
              Save Changes
            </Button>
          </div>
        </section>
      </Card>
    </>
  );
};

const UploadCertificate = ({ title, image, setImage }) => (
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
        <UploadImage
          afterUpload={(image) => setImage(image)}
          defaultImage={image}
        />
      </div>
    </section>
  </Card>
);

export default Certificates;
