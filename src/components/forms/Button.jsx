import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { COLOR_STYLE } from 'utils/constants';
import BallersSpinner from 'components/utils/BallersSpinner';
import { Link } from '@reach/router';

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
        <BallersSpinner small /> &nbsp;
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

export const AddNewButton = ({ children, to }) => (
  <div className="text-right">
    <Link to={to} className="btn btn-dark btn-xs btn-wide">
      {children}
    </Link>
  </div>
);

AddNewButton.propTypes = {
  children: PropTypes.any.isRequired,
  to: PropTypes.string.isRequired,
};

export default Button;
