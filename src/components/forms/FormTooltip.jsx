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
          <Popover.Title as="h3">{header || 'Information'}</Popover.Title>
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
  position: 'top',
};
FormTooltip.propTypes = {
  header: PropTypes.string,
  text: PropTypes.any.isRequired,
  position: PropTypes.string,
};

const InfoIcon = () => (
  <svg
    width={18}
    height={19}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.00024 4.74988C9.41446 4.74988 9.75024 5.08567 9.75024 5.49988V9.99988C9.75024 10.4141 9.41446 10.7499 9.00024 10.7499C8.58603 10.7499 8.25024 10.4141 8.25024 9.99988V5.49988C8.25024 5.08567 8.58603 4.74988 9.00024 4.74988Z"
      fill="#7E8989"
    />
    <path
      d="M9.00024 12.2499C8.58603 12.2499 8.25024 12.5857 8.25024 12.9999C8.25024 13.4141 8.58603 13.7499 9.00024 13.7499C9.41446 13.7499 9.75024 13.4141 9.75024 12.9999C9.75024 12.5857 9.41446 12.2499 9.00024 12.2499Z"
      fill="#7E8989"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.00024 1.74988C4.85811 1.74988 1.50024 5.10775 1.50024 9.24988C1.50024 13.392 4.85811 16.7499 9.00024 16.7499C13.1424 16.7499 16.5002 13.392 16.5002 9.24988C16.5002 5.10775 13.1424 1.74988 9.00024 1.74988ZM3.00024 9.24988C3.00024 12.5636 5.68654 15.2499 9.00024 15.2499C12.314 15.2499 15.0002 12.5636 15.0002 9.24988C15.0002 5.93617 12.314 3.24988 9.00024 3.24988C5.68654 3.24988 3.00024 5.93617 3.00024 9.24988Z"
      fill="#7E8989"
    />
  </svg>
);

export default FormTooltip;
