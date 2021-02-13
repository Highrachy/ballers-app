import Axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';
import { BASE_API_URL } from 'utils/constants';
import { getTokenFromStore } from 'utils/localStorage';
// import ReactImageProcess from 'react-image-process';
// import BallersLogo from 'assets/img/logo/ballers-logo.png';
import { useToast } from './Toast';
import { getError } from 'utils/helpers';
import Toast from './Toast';
import BallersSpinner from './BallersSpinner';
import { UploadIcon } from './Icons';

// import PropertyPlaceholderImage from 'assets/img/placeholder/property-holder.jpg';

const Upload = ({
  defaultImage,
  uploadText,
  changeText,
  afterUpload,
  maxFileSize,
}) => {
  // HOOKS
  const [toast, setToast] = useToast();
  const [loading, setLoading] = React.useState(false);

  const [uploadedFile, setUploadedFile] = React.useState(null);
  // const [image, setImage] = React.useState(
  //   '//images.weserv.nl/?url=https://ballers-staging.s3.amazonaws.com/5fa0f991628a153738eb43c2/36b9ff40-6bf9-11eb-ae8f-6d3c95e3643e.pdf&trim=10'
  // );

  // access
  const onFileChange = async (event) => {
    const fileToUpload = event?.target?.files?.[0];

    setLoading(true);
    setToast({ message: null });
    if (!fileToUpload) {
      setToast({
        message: 'Invalid file / No file selected',
      });
      setLoading(false);
      return null;
    }

    if (fileToUpload.size > maxFileSize) {
      setToast({
        message: `'${
          fileToUpload.name
        }' is too large, please pick a file smaller than ${
          maxFileSize / 1000
        }kb`,
      });
      setLoading(false);
      return null;
    }

    if (fileToUpload) {
      const type = fileToUpload.type;
      const extension = fileToUpload.name.split('.').pop() || 'jpeg';
      const allowedFormats = ['jpg', 'jpeg', 'gif', 'png', 'pdf'];
      if (!allowedFormats.includes(extension)) return null;

      const uploadConfig = await Axios.get(`${BASE_API_URL}/user/upload`, {
        params: {
          extension,
          type,
        },
        headers: {
          Authorization: getTokenFromStore(),
        },
      }).catch(function (error) {
        console.log('error', error);
        setToast({
          message: getError(error),
        });
        setLoading(false);
      });

      if (uploadConfig) {
        Axios.put(uploadConfig.data.url, fileToUpload, {
          headers: { 'Content-Type': type },
        })
          .then(() => {
            const AWS_BUCKET =
              process.env.REACT_APP_AWS_S3_BUCKET || 'ballers-staging';
            const fileURL = `https://${AWS_BUCKET}.s3.amazonaws.com/${uploadConfig.data.key}`;
            setUploadedFile(fileURL);
            afterUpload(fileURL);
            setLoading(false);
          })
          .catch(function (error) {
            setToast({
              message: getError(error),
            });
            setLoading(false);
          });
      } else {
        setToast({
          message: 'Unable to upload file',
        });
        setLoading(false);
      }
    }
  };

  const inputHasAnImage = !!(uploadedFile || defaultImage);

  // https://github.com/lijinke666/react-image-process/blob/abf8db4b81a22cab2a12c2786718ce0029696401/example/example.js
  return (
    <>
      <Toast {...toast} showToastOnly />
      {uploadedFile && <img src={uploadedFile} alt="test" />}
      <div className="custom-file-upload mt-3">
        <input
          type="file"
          id="upload-file"
          name="myfile"
          accept="image/*,.pdf"
          onChange={onFileChange}
        />
        <label htmlFor="upload-file">
          {loading ? (
            <>
              <BallersSpinner small /> Uploading File
            </>
          ) : (
            <>
              <UploadIcon />{' '}
              {inputHasAnImage ? (
                <>{changeText || 'Change File'}</>
              ) : (
                <>{uploadText || 'Upload New File'}</>
              )}
            </>
          )}
        </label>
      </div>
    </>
  );
};

/* <ReactImageProcess
mode="waterMark"
waterMarkType="image"
waterMark={BallersLogo}
width={60}
height={40}
opacity={0.3}
coordinate={[30, 30]}
>
<img
  alt="test"
  src="//images.weserv.nl/?url=https://ballers-staging.s3.amazonaws.com/5fa0f991628a153738eb43c2/f4334660-6bf6-11eb-9b40-2d2a78a6bf71.jpeg"
/>
</ReactImageProcess> */

Upload.propTypes = {
  afterUpload: PropTypes.func,
  changeText: PropTypes.string,
  uploadText: PropTypes.string,
  defaultImage: PropTypes.string,
  maxFileSize: PropTypes.number,
};

Upload.defaultProps = {
  afterUpload: () => {},
  uploadText: null,
  defaultImage: null,
  changeText: null,
  maxFileSize: 1000000, // 1 MB
};

export default Upload;
