import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from 'components/forms/FormTooltip';
import { Link } from '@reach/router';

const Label = ({
  className,
  name,
  optional,
  text,
  tooltipHeader,
  tooltipPosition,
  tooltipText,
  labelLink,
}) => {
  const sanitizedLabelLink = { to: null, text: null, ...labelLink };

  if (!text || !name) return null;
  return (
    <label
      className={`form-label ${className ? className : ''}`}
      htmlFor={name}
    >
      {text}

      {/* Optional / Compulsory Fields */}
      {optional ? (
        <em className="optional-form-field">(optional)</em>
      ) : (
        <small> * </small>
      )}

      <Tooltip
        header={tooltipHeader}
        position={tooltipPosition}
        text={tooltipText}
      />

      {/* Label Link is a Link */}
      {sanitizedLabelLink.to && sanitizedLabelLink.text && (
        <Link className="float-right" to={sanitizedLabelLink.to}>
          {sanitizedLabelLink.text}
        </Link>
      )}

      {/* Label Link calls a function */}
      {!sanitizedLabelLink.to && sanitizedLabelLink.text && (
        <div
          className="float-right text-muted cursor-pointer"
          onClick={sanitizedLabelLink.onClick}
        >
          {sanitizedLabelLink.text}
        </div>
      )}
    </label>
  );
};

Label.propTypes = {
  className: PropTypes.string,
  labelLink: PropTypes.shape({
    to: PropTypes.string,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  }),
  name: PropTypes.string,
  optional: PropTypes.bool,
  text: PropTypes.string,
  tooltipHeader: PropTypes.string,
  tooltipPosition: PropTypes.string,
  tooltipText: PropTypes.any,
};
Label.defaultProps = {
  className: '',
  labelLink: {
    to: '',
    text: '',
    onClick: () => {},
  },
  name: null,
  optional: false,
  text: null,
  tooltipHeader: null,
  tooltipText: null,
  tooltipPosition: 'right',
};

export default Label;
