import React from 'react';
import Axios from 'axios';
import Select from 'react-select';
import { customStyles } from 'components/forms/Select';
import { navigate } from '@reach/router';

const SearchForProperty = () => {
  const LOADING = 'Loading...';

  const [formValue, setFormValue] = React.useState({
    state: '',
    area: '',
    houseType: '',
  });

  // State
  const [state, setState] = React.useState([{ label: 'Lagos', value: '1' }]);
  React.useEffect(() => {
    Axios.post('http://staging.ballers.ng/includes/find-house.php', {
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
        console.log('error', error.response);
      });
  }, []);

  // Area
  const initialAreaPlaceholder = 'Select Area...';
  const [disableArea, setDisableArea] = React.useState(true);
  const [areaPlaceholder, setAreaPlaceholder] = React.useState(
    initialAreaPlaceholder
  );
  const [area, setArea] = React.useState({});
  const getArea = ({ value }) => {
    if (value) {
      setFormValue({ ...formValue, state: value, houseType: '' });
      setAreaPlaceholder(LOADING);
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

            setAreaPlaceholder(initialAreaPlaceholder);
            setArea(output);
            setDisableArea(false);
          }
        })
        .catch(function (error) {
          console.log('error', error.response);
        });
    } else {
      setDisableArea(true);
      setAreaPlaceholder(initialAreaPlaceholder);
    }
  };

  // House Type
  const initialHouseTypePlaceholder = 'House Type...';
  const [disableHouseType, setDisableHouseType] = React.useState(true);
  const [houseTypePlaceholder, setHouseTypePlaceholder] = React.useState(
    initialHouseTypePlaceholder
  );
  const [houseType, setHouseType] = React.useState({});

  const getHouseType = ({ value }) => {
    setHouseType(null);
    setDisableHouseType(true);
    if (value) {
      setFormValue({ ...formValue, area: value });
      setHouseTypePlaceholder(LOADING);
      Axios.post('http://staging.ballers.ng/includes/find-house.php', {
        state_id: '1',
        area_id: value,
      })
        .then(function (response) {
          const { status, data } = response;
          console.log('response', response);
          if (status === 200) {
            const output = data.map(({ type }) => ({
              label: type,
              value: type,
            }));

            setHouseTypePlaceholder(initialAreaPlaceholder);
            setHouseType(output);
            setDisableHouseType(false);
          }
        })
        .catch(function (error) {
          console.log('error', error.response);
        });
    }
  };

  const getHouseValue = ({ value }) => {
    setFormValue({ ...formValue, houseType: value });
  };

  const handleSearch = () => {
    navigate(`search/${state}/${area}/${houseType}`);
  };

  // Button
  const enableButton = formValue.state && formValue.area && formValue.houseType;

  return (
    <div className="input-group">
      <div className="select-holder">
        <Select
          options={state}
          styles={customStyles}
          placeholder="Select State..."
          onChange={getArea}
        />
      </div>
      <div className="select-holder">
        <Select
          placeholder={areaPlaceholder}
          options={area}
          styles={customStyles}
          isDisabled={disableArea}
          onChange={getHouseType}
        />
      </div>
      <div className="select-holder">
        <Select
          key={`select_key__${formValue.area}`}
          placeholder={houseTypePlaceholder}
          options={houseType}
          styles={customStyles}
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
        Search
      </button>
    </div>
  );
};

export default SearchForProperty;
