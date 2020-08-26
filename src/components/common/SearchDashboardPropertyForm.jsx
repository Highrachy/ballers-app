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
  const houseTypePlaceholder = 'House Type';

  console.log('defaultInputValue', defaultInputValue);

  const [formValue, setFormValue] = React.useState({
    state: defaultInputValue.state || '',
    houseType: defaultInputValue.houseType || '',
  });

  const [placeholder, setPlaceholder] = React.useState({
    state: statePlaceholder,
    houseType: houseTypePlaceholder,
  });

  const [data, setData] = React.useState({
    state: [],
    houseType: [],
  });

  React.useEffect(() => {
    const defaults = placeholder;

    if (defaultInputValue.state) {
      defaults['state'] = defaultInputValue.state;
    }
    if (defaultInputValue.houseType) {
      defaults['houseType'] = defaultInputValue.houseType;
    }

    setPlaceholder(defaults);
  }, [defaultInputValue, placeholder]);

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
            states: valuesToOptions(data.availableFields.states, 'Any State'),
            houseTypes: valuesToOptions(
              data.availableFields.houseTypes,
              'Any House Type'
            ),
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
    const params = [];
    if (formValue.state) {
      params.push([`state=${formValue.state}`]);
    }
    if (formValue.houseType) {
      params.push([`houseType=${formValue.houseType}`]);
    }

    console.log('params', params);
    const query = params.length > 0 ? `?${params.join('&')}` : '';
    navigate(`/user/just-for-you${query}`, true);
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
    houseType: '',
  },
};

export default SearchPropertyForm;
