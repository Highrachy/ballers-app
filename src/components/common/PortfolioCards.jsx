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

export const PortfolioPaymentProgress = ({ amountPaid, percentage }) => (
  <div className="row">
    <div className="col-sm-12 mt-3">
      <div className="small" style={{ paddingLeft: `${percentage - 5}%` }}>
        {percentage}%
      </div>
      <ProgressBar
        variant="success"
        now={percentage}
        label={`${percentage}%`}
        srOnly
      />
      <div className="small">
        Amount Contributed: <strong>{moneyFormatInNaira(amountPaid)}</strong>
        <span className="float-right text-green">Goal</span>
      </div>
    </div>
  </div>
);

export const PortfolioCard = ({ _id, totalAmountPayable, property }) => (
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
        <h6 className="text-secondary">
          {moneyFormatInNaira(totalAmountPayable)}
        </h6>
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
      <Link to={`/user/portfolio/assigned/${_id}`}>
        <span className={`btn btn-success btn-block`}>
          Details <RightArrowIcon />
        </span>
      </Link>
    </div>
  </Card>
);

const PortfolioCards = ({ setToast, isSinglePortfolio }) => {
  const [portfolios, setPortfolios] = React.useState(null);
  React.useEffect(() => {
    Axios.get(`${BASE_API_URL}/property/assigned`, {
      headers: {
        Authorization: getTokenFromStore(),
      },
    })
      .then(function (response) {
        const { status, data } = response;
        console.log('data', data);
        // handle success
        // save in the state here
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
  const NO_CONTENT = (
    <NoContent
      className="w-100 text-center"
      size="small"
      Icon={<MyPropertyIcon />}
      text="You have no active property"
    />
  );

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
          <Card className="card-container d-block text-center py-5 h-100">
            <div className="no-content text-muted my-4">{NO_CONTENT}</div>
          </Card>
        </div>
      );
    }
  }

  return (
    <LoadItems
      Icon={<MyPropertyIcon />}
      items={portfolios}
      size="small"
      loadingText={'Loading your Portfolios'}
      noContent={NO_CONTENT}
    >
      {portfolios &&
        portfolios.map((portfolio, index) => (
          <div className="col-sm-6" key={index}>
            <PortfolioCard {...portfolio} />
          </div>
        ))}
    </LoadItems>
  );
};

PortfolioCards.propTypes = {
  setToast: PropTypes.func,
  isSinglePortfolio: PropTypes.bool,
};
PortfolioCards.defaultProps = {
  setToast: () => {},
  isSinglePortfolio: false,
};

export default PortfolioCards;
