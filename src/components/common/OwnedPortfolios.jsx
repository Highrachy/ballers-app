import React from 'react';
import PropTypes from 'prop-types';
import { Card, ProgressBar } from 'react-bootstrap';
import { Link } from '@reach/router';
import { RightArrowIcon } from 'components/utils/Icons';
import PropertyPlaceholderImage from 'assets/img/placeholder/property-holder.jpg';
import { MapPinIcon, MyPropertyIcon } from 'components/utils/Icons';
import { getError, moneyFormatInNaira } from 'utils/helpers';
import { BASE_API_URL } from 'utils/constants';
import Axios from 'axios';
import { getTokenFromStore } from 'utils/localStorage';
import LoadItems from 'components/utils/LoadingItems';
import NoContent from 'components/utils/NoContent';
import { Loading } from 'components/utils/LoadingItems';

export const PortfolioPaymentProgress = ({ now }) => (
  <div className="row">
    <div className="col-sm-12 mt-3">
      <div className="small" style={{ paddingLeft: `${now - 5}%` }}>
        {now}%
      </div>
      <ProgressBar variant="success" now={now} label={`${now}%`} srOnly />
      <div className="small">
        Amount Contributed: <strong>N 18,000 </strong>
        <span className="float-right text-green">Goal</span>
      </div>
    </div>
  </div>
);

export const PortfolioCard = ({ _id, property }) => (
  <Card className="card-container h-100 portfolio-holder">
    <img
      src={property.mainImage || PropertyPlaceholderImage}
      alt="Property"
      className="img-fluid portfolio-holder__img"
    />
    <div className="row portfolio-holder__content">
      <div className="col-md-12 portfolio-holder__icon">
        <h5>
          {property.name}{' '}
          <Link to={`/user/portfolio/assigned/${_id}`}>
            <span
              className={`badge badge-success property-holder__details float-right`}
            >
              Details <RightArrowIcon />
            </span>
          </Link>
        </h5>
        <div className="">
          <span className="portfolio-holder__location">
            <MapPinIcon /> {property.address.city}, {property.address.state}
          </span>{' '}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span className="portfolio-holder__house-type">
            <MyPropertyIcon /> {property.houseType}
          </span>
        </div>
      </div>
    </div>

    <div className="button-container mt-4 d-block d-md-none">
      <Link to="/user/portfolio/5f5d262a98f1dc00171a6b17/assigned">
        <span className={`btn btn-success btn-block`}>
          Details <RightArrowIcon />
        </span>
      </Link>
    </div>
  </Card>
);

const OwnedPortfolios = ({ setToast, isSinglePortfolio }) => {
  const [portfolios, setPortfolios] = React.useState(null);
  React.useEffect(() => {
    Axios.get(`${BASE_API_URL}/property/assigned`, {
      headers: {
        Authorization: getTokenFromStore(),
      },
    })
      .then(function (response) {
        const { status, data } = response;
        if (status === 200) {
          setPortfolios(data.properties);
        }
      })
      .catch(function (error) {
        setToast({
          message: getError(error),
        });
      });
  }, [setToast]);

  if (isSinglePortfolio) {
    if (portfolios === null) {
      return (
        <div className="col-sm-6">
          <Card className="card-container d-block text-center h-100">
            <Loading Icon={<MyPropertyIcon />} text="Loading Your Portfolios" />
          </Card>
        </div>
      );
    }
    if (portfolios.length === 0) {
      return (
        <div className="col-sm-6">
          <Card className="card-container d-block text-center h-100">
            <div className="no-content text-muted my-4">
              <MyPropertyIcon />
              <h5 className="pt-3">You have no assigned Portfolios</h5>
            </div>
          </Card>
        </div>
      );
    }
  }

  return (
    <LoadItems
      Icon={<MyPropertyIcon />}
      items={portfolios}
      loadingText={'Loading your Portfolios'}
      noContent={
        <NoContent
          Icon={<MyPropertyIcon />}
          isButton
          text="You have no assigned portfolio"
        />
      }
    >
      {portfolios &&
        portfolios.map((portfolio) => (
          <div className="col-sm-6">
            <PortfolioCard {...portfolio} />
          </div>
        ))}
    </LoadItems>
  );
};

OwnedPortfolios.propTypes = {
  setToast: PropTypes.func,
};
OwnedPortfolios.defaultProps = {
  setToast: () => {},
};

export default OwnedPortfolios;
