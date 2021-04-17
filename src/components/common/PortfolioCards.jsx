import React from 'react';
import PropTypes from 'prop-types';
import { Card, ProgressBar } from 'react-bootstrap';
import { Link } from '@reach/router';
import PropertyPlaceholderImage from 'assets/img/placeholder/property-holder.jpg';
import { MapPinIcon, PortfolioIcon } from 'components/utils/Icons';
import { moneyFormatInNaira } from 'utils/helpers';
import PaginatedContent from 'components/common/PaginatedContent';
import { PropertyIcon } from 'components/utils/Icons';
import { API_ENDPOINT } from 'utils/URL';

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

const PortfolioCards = ({ limit, hideTitle, hidePagination }) => (
  <PaginatedContent
    endpoint={API_ENDPOINT.getAllPortfolios()}
    pageName="Portfolio"
    pluralPageName="Portfolios"
    DataComponent={PortfoliosRowList}
    PageIcon={<PortfolioIcon />}
    queryName="portfolio"
    limit={limit}
    hideTitle={hideTitle}
    hidePagination={hidePagination}
  />
);

PortfolioCards.propTypes = {
  setToast: PropTypes.func,
  isSinglePortfolio: PropTypes.bool,
};

PortfolioCards.defaultProps = {
  setToast: () => {},
  isSinglePortfolio: false,
};

const PortfoliosRowList = ({ results }) =>
  results.map((portfolio, index) => (
    <div className="col-sm-6 mb-4" key={index}>
      <PortfolioCard {...portfolio} />
    </div>
  ));

export default PortfolioCards;
