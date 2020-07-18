import React from 'react';
import PropTypes from 'prop-types';
import { Popover, OverlayTrigger } from 'react-bootstrap';

const FormTooltip = ({ header, text, position }) => {
  if (!text) {
    return null;
  }
  return (
    <OverlayTrigger
      trigger={['hover', 'focus']}
      placement={position}
      overlay={
        <Popover>
          <Popover.Title as="h6">{header || 'Information'}</Popover.Title>
          <Popover.Content>{text}</Popover.Content>
        </Popover>
      }
    >
      <span>
        &nbsp;
        <InfoIcon />
      </span>
    </OverlayTrigger>
  );
};

FormTooltip.defaultProps = {
  header: 'Information',
  position: 'right',
  text: null,
};
FormTooltip.propTypes = {
  header: PropTypes.string,
  text: PropTypes.any,
  position: PropTypes.string,
};

const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

export default FormTooltip;
