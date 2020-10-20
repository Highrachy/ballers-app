import React from 'react';
import PropTypes from 'prop-types';
import { HouseIcon } from './Icons';
import BallersSpinner from 'components/utils/BallersSpinner';

const LoadItems = ({ items, children, loadingText, noContent, Icon, size }) => {
  if (items == null) {
    return <Loading size={size} text={loadingText} Icon={Icon} />;
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
  size: PropTypes.string,
};

LoadItems.defaultProps = {
  children: null,
  Icon: null,
  loadingText: null,
  items: null,
  size: null,
};

export const Loading = ({ Icon, text, size }) => (
  <div className={`text-center mt-5 w-100 loading-icon ${size}`}>
    {Icon || <HouseIcon />}
    <h5 className="my-4">{text} &nbsp;</h5>{' '}
    <BallersSpinner small={size === 'small'} />{' '}
  </div>
);

export default LoadItems;
