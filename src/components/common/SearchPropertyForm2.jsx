import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { customStyles } from 'components/forms/Select';
import { navigate } from '@reach/router';
import Toast, { useToast } from 'components/utils/Toast';
import { valuesToOptions } from 'utils/helpers';

const SearchPropertyForm2 = ({ defaultInputValue }) => {
  const [toast, setToast] = useToast();

  const [formValue, setFormValue] = React.useState({
    area: '',
    houseType: '',
  });

  const areaPlaceholder = '1. Select Area';
  const houseTypePlaceholder = '2. Select House Type';

  const [placeholder, setPlaceholder] = React.useState({
    area: areaPlaceholder,
    houseType: houseTypePlaceholder,
  });

  React.useEffect(() => {
    (defaultInputValue.area || defaultInputValue.houseType) &&
      setPlaceholder(defaultInputValue);
  }, [defaultInputValue]);

  const area = valuesToOptions([
    'Lekki, Lagos',
    'Igbo Efon, Lagos',
    'Maitama, Abuja',
  ]);

  // House Type
  const [disableHouseType, setDisableHouseType] = React.useState(true);
  const [houseType, setHouseType] = React.useState({});

  const getHouseType = ({ value, label }) => {
    setHouseType(null);
    setDisableHouseType(true);
    if (value) {
      setFormValue({ ...formValue, area: label });
      setPlaceholder({ ...placeholder, houseType: 'Select House Type' });
      setHouseType(valuesToOptions(['Bungalow', 'Flat']));
      setDisableHouseType(false);
    }
  };

  const getHouseValue = ({ value }) => {
    setFormValue({ ...formValue, houseType: value });
  };

  const handleSearch = () => {
    navigate(
      `/search?area=${formValue.area}&houseType=${formValue.houseType}`,
      true
    );
  };

  // Button
  const enableButton = formValue.area && formValue.houseType;

  return (
    <div className="input-group">
      <Toast {...toast} showToastOnly />
      <div className="select-holder">
        <Select
          options={area}
          key={JSON.stringify(defaultInputValue.area)}
          styles={customStyles}
          placeholder={placeholder.area}
          onChange={getHouseType}
        />
      </div>
      <div
        className="select-holder"
        onClick={() =>
          disableHouseType &&
          setToast({
            message:
              'You need to select your `Preferred Area` to load the HouseType',
          })
        }
      >
        <Select
          key={JSON.stringify(
            `${defaultInputValue.houseType} ${formValue.area}`
          )}
          placeholder={placeholder.houseType}
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

SearchPropertyForm2.propTypes = {
  defaultInputValue: PropTypes.object,
};

SearchPropertyForm2.defaultProps = {
  defaultInputValue: {
    area: '',
    houseType: '',
  },
};

export default SearchPropertyForm2;
