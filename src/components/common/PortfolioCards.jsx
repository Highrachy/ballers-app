import React from 'react';
import PropTypes from 'prop-types';
import { Card, ProgressBar } from 'react-bootstrap';
import { Link } from '@reach/router';
import PropertyPlaceholderImage from 'assets/img/placeholder/property-holder.jpg';
import { MapPinIcon, MyPropertyIcon } from 'components/utils/Icons';
import { getError, moneyFormatInNaira } from 'utils/helpers';
import { BASE_API_URL } from 'utils/constants';
import Axios from 'axios';
import { getTokenFromStore } from 'utils/localStorage';
import LoadItems from 'components/utils/LoadingItems';
import NoContent from 'components/utils/NoContent';
import { Loading } from 'components/utils/LoadingItems';
import { PropertyIcon } from 'components/utils/Icons';

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

export const PortfolioCard = ({ _id, totalAmountPayable, propertyInfo }) => (
  <Card className="card-container h-100 portfolio-holder property-card">
    <Link to={`/user/portfolio/${_id}`}>
      <article>
        <div className="content-image">
          <img
            src={propertyInfo.mainImage || PropertyPlaceholderImage}
            alt="Property"
            className="img-fluid property-holder__img"
          />
        </div>
        <div className="property-item">
          <h5 className="property-name mb-0">{propertyInfo.name}</h5>
          {/* Details */}
          <div className="property-details property-spacing">
            <span className="property-holder__house-type">
              <strong>
                <PropertyIcon /> {propertyInfo.houseType}
              </strong>
            </span>{' '}
            &nbsp; | &nbsp;
            <span className="property-holder__location">
              <strong>
                <MapPinIcon /> {propertyInfo.address?.city},{' '}
                {propertyInfo.address?.state}
              </strong>
            </span>
          </div>
          {/* Price */}
          <h5 className="property-price property-spacing">
            {moneyFormatInNaira(totalAmountPayable)}
          </h5>
        </div>
      </article>
    </Link>
  </Card>
);

const PortfolioCards = ({ setToast, isSinglePortfolio }) => {
  const [portfolios, setPortfolios] = React.useState(null);
  React.useEffect(() => {
    Axios.get(`${BASE_API_URL}/property/portfolio/all`, {
      headers: {
        Authorization: getTokenFromStore(),
      },
    })
      .then(function (response) {
        const { status, data } = response;
        if (status === 200) {
          setPortfolios(data.result);
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
    if (portfolios?.length === 0) {
      return (
        <div className="col-sm-6">
          <Card className="card-container d-block text-center py-5 h-100">
            <div className="no-content text-muted my-4">{NO_CONTENT}</div>
          </Card>
        </div>
      );
    }
  }

  console.log(`portfolio`, portfolios);

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
