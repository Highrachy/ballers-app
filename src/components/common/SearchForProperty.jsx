import React from 'react';
import Select from 'react-select';

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

const customStyles = {
  option: (provided, state) => {
    console.log('provided', provided);
    return {
      ...provided,
      color: state.isSelected ? '#5775FA' : '#161D3F',
      backgroundColor: 'white',
      ':hover': {
        ...provided[':hover'],
        backgroundColor: 'rgba(232, 237, 255, 0.38)',
        color: '#5775fa',
      },
    };
  },
  control: (provided, state) => {
    return {
      ...provided,
      backgroundColor: state.isDisabled
        ? '#f5f5f5'
        : 'rgba(232, 237, 255, 0.38)',
      borderColor: state.isDisabled ? '#dddddd' : 'rgba(87, 117, 250, 0.2)',
      borderRadius: 3,
      cursor: 'default',
      minHeight: 56,
      width: '100%',
      paddingLeft: '0.5rem',
      ':hover': {
        borderColor: '#3256f9',
        boxShadow: 'none',
      },
      ':focus': {
        ...provided[':focus'],
        outline: 'none !important',
      },
    };
  },

  indicatorSeparator: (provided) => {
    return {
      ...provided,
      backgroundColor: 'transparent',
    };
  },

  placeholder: (provided, state) => {
    return {
      ...provided,
      color: state.isDisabled ? '#b4b4b4' : '#979797',
    };
  },

  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition, color: '#5775fa' };
  },
};

export default SearchForProperty;
