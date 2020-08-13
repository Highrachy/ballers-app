import React from 'react';
import Input from 'components/forms/Input';

const Address = () => {
  return (
    <>
      <Input
        label="Street Line 1"
        name="address.streetLine1"
        placeholder="Street Line 1"
      />
      <Input
        label="Street Line 2"
        name="address.streetLine2"
        optional
        placeholder="Street Line 2"
      />
      <div className="form-row">
        <Input
          formGroupClassName="col-md-6"
          label="State"
          name="address.state"
          placeholder="State"
        />
        <Input
          formGroupClassName="col-md-6"
          label="City"
          name="address.city"
          placeholder="City"
        />
      </div>
      <div className="form-row">
        <Input
          formGroupClassName="col-md-6 ml-n2"
          label="Country"
          name="address.country"
          placeholder="Country"
        />
      </div>
    </>
  );
};

export default Address;
