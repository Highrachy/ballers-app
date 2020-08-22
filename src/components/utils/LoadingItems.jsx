import React from 'react';
import PropTypes from 'prop-types';
import { HouseIcon } from './Icons';
import { Spinner } from 'react-bootstrap';

const LoadItems = ({ items, children, loadingText, noContent, Icon }) => {
  if (items == null) {
    return (
      <div className="text-center mt-5 loading-icon">
        {Icon || <HouseIcon />}
        <h5 className="my-4">{loadingText} &nbsp;</h5>{' '}
        <Spinner
          as="span"
          animation="border"
          role="status"
          aria-hidden="true"
        />{' '}
      </div>
    );
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

export default LoadItems;
