import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from '@reach/router';
import PaginatedContent from 'components/common/PaginatedContent';
import { Form, Formik } from 'formik';
import {
  DisplayFormikState,
  setInitialValues,
} from 'components/forms/form-helper';
import { propertyFilterSchema } from 'components/forms/schemas/propertySchema';
import Select from 'components/forms/Select';
import { generateNumOptions, valuesToOptions } from 'utils/helpers';
import Input from 'components/forms/Input';
import Button from 'components/forms/Button';
import BackendPage from 'components/layout/BackendPage';
import { PropertyIcon } from 'components/utils/Icons';
import { moneyFormatInNaira } from 'utils/helpers';
import Humanize from 'humanize-plus';
import Image from 'components/utils/Image';
import PropertyPlaceholderImage from 'assets/img/placeholder/property.png';
import { UserContext } from 'context/UserContext';
import { HOUSE_TYPES, USER_TYPES } from 'utils/constants';
import { useCurrentRole } from 'hooks/useUser';
import { API_ENDPOINT } from 'utils/URL';

const Properties = () => {
  const { userState } = React.useContext(UserContext);
  const addNewUrl =
    userState?.role === USER_TYPES.vendor ? '/vendor/properties/new' : '';
  return (
    <BackendPage>
      <PaginatedContent
        addNewUrl={addNewUrl}
        endpoint={API_ENDPOINT.getAllProperties()}
        pageName="Property"
        pluralPageName="Properties"
        DataComponent={PropertiesRowList}
        FilterComponent={FilterForm}
        PageIcon={<PropertyIcon />}
        queryName="property"
      />
    </BackendPage>
  );
};

const PropertiesRowList = ({ results, offset }) => (
  <div className="container-fluid">
    <Card className="mt-2">
      <div className="table-responsive">
        <table className="table table-border table-hover">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {results.map((property, index) => (
              <PropertiesRow
                key={index}
                number={offset + index + 1}
                {...property}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

const PropertiesRow = ({ _id, name, address, price, number, mainImage }) => {
  const userType = useCurrentRole().name;
  return (
    <tr>
      <td>{number}</td>
      <td>
        <Link to={`/${userType}/property/${_id}`}>
          <Image
            src={mainImage}
            name={`property ${_id}`}
            width="80"
            alt="property"
            defaultImage={PropertyPlaceholderImage}
          />
        </Link>
      </td>
      <td>{name}</td>
      <td>
        <strong>
          {address.city}, {address.state}
        </strong>
      </td>
      <td>{moneyFormatInNaira(price)}</td>
      <td>
        <Link
          className="btn btn-sm btn-secondary"
          to={`/${userType}/property/${_id}`}
        >
          View property
        </Link>
      </td>
    </tr>
  );
};

const FilterForm = ({ setFilterTerms }) => {
  return (
    <Formik
      initialValues={setInitialValues(propertyFilterSchema)}
      onSubmit={(values, actions) => {
        setFilterTerms(
          { ...values },
          {
            houseType: `House Type : ${Humanize.titleCase(values.houseType)}`,
          }
        );
      }}
    >
      {({ isSubmitting, handleSubmit, ...props }) => (
        <Form>
          <Card className="card-container">
            <section className="row">
              <div className="col-md-10 px-4">
                <h5 className="mb-4">Filter Properties</h5>
                <div className="form-row">
                  <Input
                    formGroupClassName="col-md-6"
                    label="Property Name"
                    name="name"
                  />
                  <Input
                    formGroupClassName="col-md-6"
                    label="Price"
                    name="price"
                  />
                </div>
                <div className="form-row">
                  <Select
                    formGroupClassName="col-md-6"
                    label="Toilets"
                    name="toilets"
                    options={generateNumOptions(9, 'Toilet')}
                    placeholder="Select Toilets"
                  />
                  <Select
                    formGroupClassName="col-md-6"
                    label="House Type"
                    name="houseType"
                    options={valuesToOptions(HOUSE_TYPES)}
                    placeholder="House Type"
                  />
                </div>
              </div>
            </section>
          </Card>
          <DisplayFormikState {...props} showAll />
          <Button
            className="btn-secondary mt-4"
            loading={isSubmitting}
            onClick={handleSubmit}
          >
            Filter Users
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Properties;
