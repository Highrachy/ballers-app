import React from 'react';
import PropTypes from 'prop-types';
import { HouseIcon } from './Icons';
import BallersSpinner from 'components/utils/BallersSpinner';

const LoadItems = ({ items, children, loadingText, noContent, Icon }) => {
  if (items == null) {
    return <Loading text={loadingText} Icon={Icon} />;
  }
  if (items.length > 0) {
    return children;
  }

  return noContent;
};

LoadItems.propTypes = {
  children: PropTypes.any,
  Icon: PropTypes.any,
  items: PropTypes.array,
  loadingText: PropTypes.string,
  noContent: PropTypes.any.isRequired,
};

LoadItems.defaultProps = {
  children: null,
  Icon: null,
  loadingText: null,
  items: null,
};

export const Loading = ({ Icon, text }) => (
  <div className="text-center mt-5 loading-icon">
    {Icon || <HouseIcon />}
    <h5 className="my-4">{text} &nbsp;</h5> <BallersSpinner />{' '}
  </div>
);

export default LoadItems;
