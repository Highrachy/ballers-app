import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { COLOR_STYLE } from 'utils/constants';
import { Spinner } from 'react-bootstrap';

const Button = ({
  className,
  loading,
  loadingText,
  showLoadingText,
  children,
  onClick,
  color,
}) => (
  <button
    className={classNames('btn', `btn-${color}`, className)}
    onClick={onClick}
    type="button"
  >
    {loading ? (
      <>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />{' '}
        {showLoadingText && (loadingText || children)}
      </>
    ) : (
      children
    )}
  </button>
);

Button.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  color: PropTypes.oneOf(COLOR_STYLE),
  loading: PropTypes.bool,
  loadingText: PropTypes.any,
  showLoadingText: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  children: 'Submit',
  className: null,
  color: COLOR_STYLE[1],
  loading: false,
  loadingText: null,
  showLoadingText: true,
  onClick: () => {},
};

export default Button;
