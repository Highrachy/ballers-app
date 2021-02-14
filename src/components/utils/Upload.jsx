import Axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';
import { BASE_API_URL } from 'utils/constants';
import { getTokenFromStore } from 'utils/localStorage';
import { useToast } from './Toast';
import { getError } from 'utils/helpers';
import Toast from './Toast';
import BallersSpinner from './BallersSpinner';
import { UploadIcon } from './Icons';
import Image from './Image';

const Upload = ({
  defaultImage,
  uploadText,
  changeText,
  afterUpload,
  maxFileSize,
}) => {
  const [toast, setToast] = useToast();
  const [loading, setLoading] = React.useState(false);
  const [uploadedFile, setUploadedFile] = React.useState(null);

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

  const currentImage = uploadedFile || defaultImage;
  const inputHasAnImage = !!currentImage;
  return (
    <>
      <Toast {...toast} showToastOnly />
      {currentImage && <Image src={currentImage} alt="upload" />}
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
