import React from 'react';
import BackendPage from 'components/layout/BackendPage';
import Toast, { useToast } from 'components/utils/Toast';
import Modal from 'components/common/Modal';
import ReactToPrint from 'react-to-print';
import { BASE_API_URL } from 'utils/constants';
import Axios from 'axios';
import { getTokenFromStore } from 'utils/localStorage';
import { getError } from 'utils/helpers';
import OfferLetterTemplate from 'components/utils/OfferLetterTemplate';
import Image from 'components/utils/Image';
import UploadImage from 'components/utils/UploadImage';

const OfferLetter = ({ id }) => {
  const componentRef = React.useRef();

  return (
    <BackendPage>
      <OfferLetterTemplateContainer offerId={id} ref={componentRef} />
      <ReactToPrint
        trigger={() => (
          <section className="container-fluid mt-5">
            <button className="btn btn-info">Print this out!</button>
          </section>
        )}
        content={() => componentRef.current}
      />
    </BackendPage>
  );
};

const DisplayOfferLetterTemplate = ({ offerId }) => {
  const [toast, setToast] = useToast();
  const [offer, setOffer] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [signature, setSignature] = React.useState(null);

  const acceptOffer = () => {
    const payload = { offerId, signature };

    Axios.put(`${BASE_API_URL}/offer/accept`, payload, {
      headers: { Authorization: getTokenFromStore() },
    })
      .then(function (response) {
        const { status } = response;
        if (status === 200) {
          setToast({
            message: 'Your offer letter has been accepted',
            type: 'success',
          });
        }
      })
      .catch(function (error) {
        setToast({
          message: getError(error),
        });
      });
  };

  React.useEffect(() => {
    offerId &&
      Axios.get(`${BASE_API_URL}/offer/${offerId}`, {
        headers: {
          Authorization: getTokenFromStore(),
        },
      })
        .then(function (response) {
          const { status, data } = response;
          if (status === 200) {
            setOffer(data.offer);
          }
        })
        .catch(function (error) {
          setToast({
            message: getError(error),
          });
        });
  }, [setToast, offerId]);

  return (
    <>
      <Toast {...toast} showToastOnly />
      {offer && (
        <OfferLetterTemplate
          enquiryInfo={offer.enquiryInfo}
          offerInfo={offer}
          propertyInfo={offer.propertyInfo}
          signature={signature}
          showSignaturePad
        >
          <div className="mt-5">
            <DigitalSignaturePad setSignature={setSignature} />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <UploadSignature
              image={image}
              setImage={setImage}
              setSignature={setSignature}
            />
          </div>

          {signature && (
            <div className="mt-5">
              <button
                className="btn btn-success btn-wide hide-print"
                onClick={acceptOffer}
              >
                Accept Offer Letter
              </button>
            </div>
          )}
        </OfferLetterTemplate>
      )}
    </>
  );
};

class OfferLetterTemplateContainer extends React.Component {
  render() {
    const { offerId } = this.props;
    return (
      <div className="container-fluid">
        <DisplayOfferLetterTemplate offerId={offerId} />
      </div>
    );
  }
}

const DigitalSignaturePad = ({ setSignature }) => {
  const [showDigital, setShowDigital] = React.useState(false);
  const [input, setInput] = React.useState('');

  return (
    <>
      <Modal
        title="Sign Digitally"
        show={showDigital}
        onHide={() => setShowDigital(false)}
        showFooter={false}
      >
        <section className="row">
          <div className="col-md-10">
            <h5>Type your Signature here</h5>
            <input
              className="form-control my-3"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <button
              className="btn btn-secondary mb-5"
              onClick={() => {
                setShowDigital(false);
                setSignature(input);
              }}
            >
              Sign Digitally
            </button>

            <h3 className="signature-pad in-dialog">{input}</h3>
          </div>
        </section>
      </Modal>
      <button
        className="btn btn-secondary btn-sm hide-print"
        onClick={() => setShowDigital(true)}
      >
        Sign Digitally
      </button>
    </>
  );
};

const UploadSignature = ({ image, setImage, setSignature }) => {
  const [showDigital, setShowDigital] = React.useState(false);

  return (
    <>
      <Modal
        title="Sign Digitally"
        show={showDigital}
        onHide={() => setShowDigital(false)}
        showFooter={false}
      >
        <div className="row">
          <div className="mt-4">
            <h6 className="mb-3">Upload Your Signature</h6>
            {image && (
              <Image
                className="img-fluid uploaded-image mb-3"
                name="Signature"
                src={image}
              />
            )}
            <UploadImage
              afterUpload={(image) => setImage(image)}
              defaultImage={image}
              uploadText="Upload your Signature"
              changeText="Change Signature"
            />

            {image && (
              <button
                className="btn btn-success mb-5"
                onClick={() => {
                  setShowDigital(false);
                  setSignature(image);
                }}
              >
                Upload Signature
              </button>
            )}
          </div>
        </div>
      </Modal>
      <button
        className="btn btn-secondary btn-sm hide-print"
        onClick={() => setShowDigital(true)}
      >
        Upload Signature
      </button>
    </>
  );
};
export default OfferLetter;
