import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from '@reach/router';
import PaginatedContent from 'components/common/PaginatedContent';
import { Form, Formik } from 'formik';
import {
  DisplayFormikState,
  setInitialValues,
} from 'components/forms/form-helper';
import Select from 'components/forms/Select';
import { generateNumOptions, valuesToOptions } from 'utils/helpers';
import Input from 'components/forms/Input';
import Button from 'components/forms/Button';
import BackendPage from 'components/layout/BackendPage';
import { PortfolioIcon } from 'components/utils/Icons';
import { moneyFormatInNaira } from 'utils/helpers';
import Humanize from 'humanize-plus';
import Image from 'components/utils/Image';
import PortfolioPlaceholderImage from 'assets/img/placeholder/property.png';
import { HOUSE_TYPES } from 'utils/constants';
import { useCurrentRole } from 'hooks/useUser';
import { API_ENDPOINT } from 'utils/URL';
import { Spacing } from 'components/common/Helpers';
import { FileIcon } from 'components/utils/Icons';

const Portfolios = () => {
  return (
    <BackendPage>
      <PaginatedContent
        endpoint={API_ENDPOINT.getAllPortfolios()}
        pageName="Portfolio"
        pluralPageName="Portfolios"
        DataComponent={PortfoliosRowList}
        FilterComponent={FilterForm}
        PageIcon={<PortfolioIcon />}
        queryName="portfolio"
      />
    </BackendPage>
  );
};

const PortfoliosRowList = ({ results, offset }) => (
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
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {results.map((portfolio, index) => (
              <PortfoliosRow
                key={index}
                number={offset + index + 1}
                {...portfolio}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

const PortfoliosRow = ({ _id, number, propertyInfo, totalAmountPayable }) => {
  const userType = useCurrentRole().name;
  return (
    <tr>
      <td>{number}</td>
      <td>
        <Link to={`/${userType}/portfolio/${_id}`}>
          <Image
            src={propertyInfo.mainImage}
            name={`portfolio ${_id}`}
            width="80"
            alt="portfolio"
            defaultImage={PortfolioPlaceholderImage}
          />
        </Link>
      </td>
      <td>{propertyInfo.name}</td>
      <td>
        <strong>
          {propertyInfo.address.city}, {propertyInfo.address.state}
        </strong>
      </td>
      <td>{moneyFormatInNaira(totalAmountPayable)}</td>
      <td>
        <Link
          className="btn  btn-xs btn-secondary"
          to={`/${useCurrentRole().name}/offer/${_id}`}
        >
          <FileIcon /> View Offer
        </Link>
        <Spacing />
        <Spacing />
        <Link
          className="btn btn-wide btn-info"
          to={`/${userType}/portfolio/${_id}`}
        >
          View portfolio
        </Link>
      </td>
    </tr>
  );
};

const FilterForm = ({ setFilterTerms }) => {
  return (
    <Formik
      initialValues={setInitialValues({})}
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
                <h5 className="mb-4">Filter Portfolios</h5>
                <div className="form-row">
                  <Input
                    formGroupClassName="col-md-6"
                    label="Portfolio Name"
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

export default Portfolios;
