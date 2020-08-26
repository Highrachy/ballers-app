import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Select from 'react-select';
import {
  customStylesJustForYou,
  customStylesDashboard,
} from 'components/forms/Select';
import { navigate } from '@reach/router';
import { BASE_API_URL } from 'utils/constants';
import { getTokenFromStore } from 'utils/localStorage';
import { valuesToOptions } from 'utils/helpers';

const SearchPropertyForm = ({ defaultInputValue, useDashboardStyles }) => {
  const statePlaceholder = 'State';

  const [formValue, setFormValue] = React.useState({
    state: '',
    houseType: '',
  });
  const houseTypePlaceholder = 'House Type';

  const [placeholder, setPlaceholder] = React.useState({
    state: statePlaceholder,
    houseType: houseTypePlaceholder,
  });
  const [data, setData] = React.useState({
    state: [],
    houseType: [],
  });

  React.useEffect(() => {
    (defaultInputValue.state || defaultInputValue.houseType) &&
      setPlaceholder(defaultInputValue);
  }, [defaultInputValue]);

  React.useEffect(() => {
    Axios.get(`${BASE_API_URL}/property/available-options`, {
      headers: {
        Authorization: getTokenFromStore(),
      },
    })
      .then(function (response) {
        const { status, data } = response;
        console.log('data', data);
        // handle success
        if (status === 200) {
          setData({
            states: valuesToOptions(data.availableFields.states),
            houseTypes: valuesToOptions(data.availableFields.houseTypes),
          });
        }
      })
      .catch(function (error) {
        // setToast({
        //   message: getError(error),
        // });
        console.log('error', error);
      });
  }, []);

  const handleSearch = () => {
    navigate(
      `/user/just-for-you?state=${formValue.state}&houseType=${formValue.houseType}`,
      true
    );
  };

  // Styles to use
  const styles = useDashboardStyles
    ? customStylesDashboard
    : customStylesJustForYou;

  return (
    <div className="input-group">
      <div className="select-holder">
        <Select
          options={data.states}
          styles={styles}
          placeholder={placeholder.state}
          onChange={({ value }) => setFormValue({ ...formValue, state: value })}
        />
      </div>
      <div className="select-holder">
        <Select
          placeholder={placeholder.houseType}
          options={data.houseTypes}
          styles={styles}
          onChange={({ value }) =>
            setFormValue({ ...formValue, houseType: value })
          }
        />
      </div>
      <button
        className="btn btn-secondary"
        type="button"
        onClick={handleSearch}
      >
        <span>Search</span>
      </button>
    </div>
  );
};

SearchPropertyForm.propTypes = {
  defaultInputValue: PropTypes.object,
  useDashboardStyles: PropTypes.bool,
};

SearchPropertyForm.defaultProps = {
  useDashboardStyles: true,
  defaultInputValue: {
    state: '',
    area: '',
    houseType: '',
  },
};

export default SearchPropertyForm;
