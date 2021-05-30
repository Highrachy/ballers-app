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
import { HOUSE_TYPES } from 'utils/constants';
import { useCurrentRole } from 'hooks/useUser';
import { API_ENDPOINT } from 'utils/URL';
import { Spacing } from 'components/common/Helpers';
import { SuccessIcon } from 'components/utils/Icons';
import { WarningIcon } from 'components/utils/Icons';

const Properties = () => {
  const addNewUrl = useCurrentRole().isVendor ? '/vendor/property/new' : '';
  return (
    <BackendPage>
      <PaginatedContent
        addNewUrl={addNewUrl}
        endpoint={API_ENDPOINT.getAllProperties()}
        initialFilter={{ sortBy: 'createdAt', sortDirection: 'desc' }}
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
    <Card>
      <div className="table-responsive">
        <table className="table table-border table-hover">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Price</th>
              <th></th>
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
    {useCurrentRole().isAdmin && (
      <div className="my-5 text-right">
        <Link className="btn btn-wide btn-dark" to="/admin/reported-properties">
          View Reported Properties
        </Link>
      </div>
    )}
  </div>
);

const PropertiesRow = ({
  _id,
  name,
  address,
  price,
  number,
  mainImage,
  approved,
  flagged,
}) => {
  const userType = useCurrentRole().name;
  return (
    <tr className={flagged?.status ? 'text-danger' : ''}>
      <td>{number}</td>
      <td>
        <div
          className={`${
            flagged?.status ? 'overlay overlay__danger' : ''
          } d-inline-block`}
        >
          <Link to={`/${userType}/property/${_id}`}>
            <Image
              src={mainImage}
              name={`property ${_id}`}
              width="80"
              alt="property"
              defaultImage={PropertyPlaceholderImage}
            />

            {flagged?.status && (
              <span className="overlay__content">Reported</span>
            )}
          </Link>
        </div>
      </td>
      <td>
        {name}{' '}
        {!useCurrentRole().isUser &&
          (approved?.status ? (
            <small className="text-success">
              <Spacing />
              <SuccessIcon />
            </small>
          ) : (
            <small className="text-warning">
              <Spacing />
              <WarningIcon />
            </small>
          ))}
      </td>
      <td>
        <strong>
          {address?.city}, {address?.state}
        </strong>
      </td>
      <td>{moneyFormatInNaira(price)}</td>
      <td>
        <Link
          className="btn btn-xs btn-secondary"
          to={`/${userType}/property/${_id}`}
        >
          View
        </Link>
        {useCurrentRole().isVendor && (
          <>
            <Spacing />
            <Spacing />
            <Link
              className="btn btn-xs btn-info"
              to={`/${userType}/property/edit/${_id}`}
            >
              Edit
            </Link>
          </>
        )}
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
          <section>
            <Input label="Property Name" name="name" />
            <Input label="Price" name="price" />
            <Select
              label="Toilets"
              name="toilets"
              options={generateNumOptions(9, 'Toilet')}
              placeholder="Select Toilets"
            />
            <Select
              label="House Type"
              name="houseType"
              options={valuesToOptions(HOUSE_TYPES)}
              placeholder="House Type"
            />
          </section>
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
