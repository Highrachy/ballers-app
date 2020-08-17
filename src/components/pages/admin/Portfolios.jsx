import React from 'react';
import PropTypes from 'prop-types';
import BackendPage from 'components/layout/BackendPage';
import { Card } from 'react-bootstrap';
import Axios from 'axios';
import { BASE_API_URL } from 'utils/constants';
import Toast, { useToast } from 'components/utils/Toast';
import { getTokenFromStore } from 'utils/localStorage';
import LoadItems from 'components/utils/LoadingItems';
import NoContent from 'components/utils/NoContent';
import { Link } from '@reach/router';

const Portfolios = () => {
  const [toast, setToast] = useToast();
  const [portfolios, setPortfolios] = React.useState(null);
  React.useEffect(() => {
    Axios.get(`${BASE_API_URL}/property/all`, {
      headers: {
        Authorization: getTokenFromStore(),
      },
    })
      .then(function (response) {
        const { status, data } = response;
        // handle success
        if (status === 200) {
          setPortfolios(data.properties);
        }
      })
      .catch(function (error) {
        setToast({
          message: error.response.data.message,
        });
      });
  }, [setToast]);
  return (
    <BackendPage>
      <AllPortfolios portfolios={portfolios} toast={toast} />
    </BackendPage>
  );
};

const AllPortfolios = ({ portfolios, toast }) => (
  <LoadItems
    items={portfolios}
    loadingText="Loading your Portfolios"
    noContent={<NoContent isButton text="No Portfolios found" />}
  >
    <PortfoliosRowList toast={toast} portfolios={portfolios || []} />
  </LoadItems>
);

const PortfoliosRowList = ({ portfolios, toast }) => (
  <div className="container-fluid">
    <div className="text-right">
      <Link to="/admin/portfolios/new" className="btn btn-secondary btn-wide">
        Add Property
      </Link>
    </div>
    <Toast {...toast} />
    <Card className="mt-4">
      <div className="table-responsive">
        <table className="table table-borderless table-hover">
          <thead>
            <tr>
              <td>S/N</td>
              <td>Image</td>
              <td>Name</td>
              <td>Location</td>
              <td>Price</td>
            </tr>
          </thead>
          <tbody>
            {portfolios.map((portfolio, index) => (
              <PortfoliosRow key={index} number={index + 1} {...portfolio} />
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

PortfoliosRowList.propTypes = {
  portfolios: PropTypes.array.isRequired,
};

const PortfoliosRow = ({ _id, name, location, price, number, mainImage }) => (
  <tr>
    <td>{number}</td>
    <td>
      <Link to={`/admin/portfolio/${_id}`}>
        <img src={mainImage} width="80" alt="property" />
      </Link>
    </td>
    <td>{name}</td>

    <td>
      <strong>{location}</strong>
    </td>
    <td>
      <strong>{price}</strong>
    </td>
  </tr>
);

export default Portfolios;
