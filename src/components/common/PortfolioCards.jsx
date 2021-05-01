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
import { isPastDate } from 'utils/date-helpers';
import TimeAgo from 'timeago-react';
import { Spacing } from './Helpers';

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

export const PortfolioCard = ({
  _id,
  totalAmountPayable,
  propertyInfo,
  nextPaymentInfo,
}) => (
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

        {/* Next Payment Info */}
        <div className="property-holder__separator my-3"></div>
        <div className="property-info property-spacing px-4">
          Next Payment:{' '}
          <strong>
            {moneyFormatInNaira(nextPaymentInfo?.[0]?.expectedAmount)}
          </strong>
          <Spacing />
          <Spacing />
          {isPastDate(nextPaymentInfo?.[0]?.expiresOn) ? (
            <div className="badge badge-overdue badge-overdue__danger">
              Overdue: <TimeAgo datetime={nextPaymentInfo?.[0]?.expiresOn} />
            </div>
          ) : (
            <div className="badge  badge-overdue badge-overdue__success">
              Due: <TimeAgo datetime={nextPaymentInfo?.[0]?.expiresOn} />
            </div>
          )}
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
