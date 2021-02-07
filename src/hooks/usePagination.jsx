import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { BASE_API_URL } from 'utils/constants';
import { useToast } from 'components/utils/Toast';
import { getTokenFromStore } from 'utils/localStorage';
import { getError } from 'utils/helpers';

export const usePagination = ({ url, limit, page }) => {
  const [toast, setToast] = useToast();
  const [output, setOutput] = React.useState(null);

  React.useEffect(() => {
    setOutput(null);
    Axios.get(`${BASE_API_URL}/${url}`, {
      headers: {
        Authorization: getTokenFromStore(),
      },
      params: { limit, page },
    })
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          console.log('data', data);
          setOutput(data);
        }
      })
      .catch(function (error) {
        setToast({
          message: getError(error),
        });
      });
  }, [limit, page, setToast, url]);

  return [output?.result, output?.pagination, toast];
};

usePagination.propTypes = {
  url: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  limit: PropTypes.number,
};

usePagination.defaultProps = {
  limit: 10,
};
