import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Select from 'react-select';
import {
  customStylesJustForYou,
  customStylesDashboard,
} from 'components/forms/Select';
import { navigate } from '@reach/router';
import { SearchIcon } from 'components/utils/Icons';
import { BASE_API_URL } from 'utils/constants';

const SearchPropertyForm = ({ defaultInputValue, useDashboardStyles }) => {
  const LOADING = 'Loading...';

  const [formValue, setFormValue] = React.useState({
    state: '',
    area: '',
    houseType: '',
  });

  const statePlaceholder = 'State.';
  const areaPlaceholder = 'Area';
  const houseTypePlaceholder = 'House Type';

  const [placeholder, setPlaceholder] = React.useState({
    state: statePlaceholder,
    area: areaPlaceholder,
    houseType: houseTypePlaceholder,
  });

  React.useEffect(() => {
    (defaultInputValue.state ||
      defaultInputValue.area ||
      defaultInputValue.houseType) &&
      setPlaceholder(defaultInputValue);
  }, [defaultInputValue]);

  // State
  const [state, setState] = React.useState([{ label: 'Lagos', value: '1' }]);
  React.useEffect(() => {
    Axios.post(`${BASE_API_URL}/property/search`, {
      load_state: 'test',
    })
      .then(function (response) {
        const { status, data } = response;
        if (status === 200) {
          const output = data.map(({ state_name, state_id }) => ({
            label: state_name,
            value: state_id,
          }));
          setState(output);
        }
      })
      .catch(function (error) {
        // console.log('error', error.response);
      });
  }, []);

  // Area
  const [disableArea, setDisableArea] = React.useState(true);
  const [area, setArea] = React.useState({});
  const getArea = ({ value }) => {
    if (value) {
      setFormValue({ ...formValue, state: value, houseType: '' });
      setPlaceholder({ ...placeholder, area: LOADING });
      Axios.post('http://staging.ballers.ng/includes/find-house.php', {
        state_id: value,
        area_id: '',
      })
        .then(function (response) {
          const { status, data } = response;
          if (status === 200) {
            const output = data.map(({ area_name, area_id }) => ({
              label: area_name,
              value: area_id,
            }));

            setPlaceholder({ ...placeholder, houseType: houseTypePlaceholder });
            setArea(output);
            setDisableArea(false);
          }
        })
        .catch(function (error) {
          // console.log('error', error.response);
        });
    } else {
      setDisableArea(true);
      setPlaceholder({ ...placeholder, area: areaPlaceholder });
    }
  };

  // House Type
  const [disableHouseType, setDisableHouseType] = React.useState(true);
  const [houseType, setHouseType] = React.useState({});

  const getHouseType = ({ value }) => {
    setHouseType(null);
    setDisableHouseType(true);
    if (value) {
      setFormValue({ ...formValue, area: value });
      setPlaceholder({ ...placeholder, houseType: LOADING });
      Axios.post('http://staging.ballers.ng/includes/find-house.php', {
        state_id: formValue.state,
        area_id: value,
      })
        .then(function (response) {
          const { status, data } = response;
          if (status === 200) {
            const output = data.map(({ type }) => ({
              label: type,
              value: type,
            }));

            setPlaceholder({ ...placeholder, houseType: houseTypePlaceholder });
            setHouseType(output);
            setDisableHouseType(false);
          }
        })
        .catch(function (error) {
          setDisableHouseType(true);
          setPlaceholder({ ...placeholder, houseType: houseTypePlaceholder });
        });
    }
  };

  const getHouseValue = ({ value }) => {
    setFormValue({ ...formValue, houseType: value });
  };

  const handleSearch = () => {
    navigate(
      `/search?state=${formValue.state}&area=${formValue.area}&houseType=${formValue.houseType}`,
      true
    );
  };

  // Button
  const enableButton = formValue.state && formValue.area && formValue.houseType;

  // Styles to use
  const styles = useDashboardStyles
    ? customStylesDashboard
    : customStylesJustForYou;

  return (
    <div className="input-group">
      <div className="select-holder">
        <Select
          options={state}
          key={JSON.stringify(defaultInputValue.state)}
          styles={styles}
          placeholder={placeholder.state}
          onChange={getArea}
        />
      </div>
      <div className="select-holder">
        <Select
          placeholder={placeholder.area}
          options={area}
          styles={styles}
          isDisabled={disableArea}
          onChange={getHouseType}
          key={JSON.stringify(`${defaultInputValue.area} ${formValue.state}`)}
        />
      </div>
      <div className="select-holder">
        <Select
          key={JSON.stringify(
            `${defaultInputValue.houseType} ${formValue.area}`
          )}
          placeholder={placeholder.houseType}
          options={houseType}
          styles={styles}
          isDisabled={disableHouseType}
          onChange={getHouseValue}
        />
      </div>
      <button
        className="btn btn-secondary"
        type="button"
        disabled={!enableButton}
        onClick={handleSearch}
      >
        <span className="d-md-block d-none">
          {useDashboardStyles ? <SearchIcon /> : 'Search'}
        </span>
        <span className="d-md-none">Search</span>
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
