import React from 'react';
import Select from 'react-select';
import { customStyles } from 'components/forms/Select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const SearchForProperty = () => {
  return (
    <div className="input-group">
      <div className="select-holder">
        <Select
          options={options}
          styles={customStyles}
          placeholder="Select State..."
        />
      </div>
      <div className="select-holder">
        <Select options={options} styles={customStyles} isDisabled />
      </div>
      <div className="select-holder">
        <Select options={options} styles={customStyles} />
      </div>
      <button className="btn btn-secondary" type="button">
        Search
      </button>
    </div>
  );
};

export default SearchForProperty;
