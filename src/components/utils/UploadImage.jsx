import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { getTokenFromStore } from 'utils/localStorage';
import BallersSpinner from 'components/utils/BallersSpinner';
import { BASE_API_URL } from 'utils/constants';
import Toast, { useToast } from 'components/utils/Toast';
import { getError } from 'utils/helpers';

const UploadImage = ({ defaultImage, uploadText, afterUpload }) => {
  const MAX_IMG_SIZE = 1000000; //1MB

  // HOOKS
  const [toast, setToast] = useToast();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const onChangeHandler = (event) => {
    setLoading(true);
    setToast({ message: null });
    const file = event.target.files[0];
    if (file.size > MAX_IMG_SIZE) {
      setToast({
        message: `'${
          file.name
        }' is too large, please pick a file smaller than ${
          MAX_IMG_SIZE / 1000
        }kb`,
      });
      setLoading(false);
    } else if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      setToast({
        message:
          "Unsupported format. Only '.png' and '.jpg' files are supported",
      });
      setLoading(false);
    } else {
      const data = new FormData();
      data.append('image', file);
      console.log('data', data);

      Axios.post(`${BASE_API_URL}/user/upload-image`, data, {
        headers: { Authorization: getTokenFromStore() },
      })
        .then(function (response) {
          const { status, data } = response;
          console.log('response', response);
          if (status === 200) {
            console.log('data', data);
            setImage(data.file.path);
            afterUpload(data.file.path);
            setLoading(false);
          }
        })
        .catch(function (error) {
          setToast({
            message: getError(error),
          });
          setLoading(false);
        });
    }
  };

  return (
    <>
      <div className="mb-5">
        <Toast {...toast} showToastOnly />
        <div className="custom-file">
          <input
            id="image"
            type="file"
            className="custom-file-input"
            onChange={onChangeHandler}
          />
          <label className="custom-file-label" for="image">
            {loading ? (
              <>
                <BallersSpinner small /> &nbsp; &nbsp; Uploading Image
              </>
            ) : image || defaultImage ? (
              'Change Image'
            ) : (
              uploadText || 'Upload New Image'
            )}
          </label>
        </div>
      </div>
    </>
  );
};

UploadImage.propTypes = {
  afterUpload: PropTypes.func,
  uploadText: PropTypes.string,
  defaultImage: PropTypes.string,
};

UploadImage.defaultProps = {
  afterUpload: () => {},
  uploadText: null,
  defaultImage: null,
};

export default UploadImage;
