import React from 'react';
import PropTypes from 'prop-types';
import Input from 'components/forms/Input';

const Address = ({ showCountry }) => {
  return (
    <>
      <Input
        label="Street Line 1"
        name="address.street1"
        placeholder="Street Line 1"
      />
      <Input
        label="Street Line 2"
        name="address.street2"
        optional
        placeholder="Street Line 2"
      />
      <div className="form-row">
        <Input
          formGroupClassName="col-md-6"
          label="City"
          name="address.city"
          placeholder="City"
        />
        <Input
          formGroupClassName="col-md-6"
          label="State"
          name="address.state"
          placeholder="State"
        />
      </div>
      {showCountry && (
        <div className="form-row">
          <Input
            formGroupClassName="col-md-6 ml-n2"
            label="Country"
            name="address.country"
            placeholder="Country"
          />
        </div>
      )}
    </>
  );
};

Address.propTypes = {
  showCountry: PropTypes.bool,
};

Address.defaultProps = {
  showCountry: true,
};

export default Address;
