import React from 'react';
import PropTypes from 'prop-types';
import { Modal as BModal, Button } from 'react-bootstrap';

const Modal = ({ showFooter, dialogClassName, ...props }) => {
  return (
    <BModal
      {...props}
      size={props.size}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName={dialogClassName}
    >
      {props.title && (
        <BModal.Header closeButton>
          <BModal.Title id="contained-modal-title-vcenter">
            {props.title}
          </BModal.Title>
        </BModal.Header>
      )}
      <BModal.Body>{props.children}</BModal.Body>
      {props.showFooter && (
        <BModal.Footer>
          <Button size="sm" onClick={props.onHide}>
            Close
          </Button>
        </BModal.Footer>
      )}
    </BModal>
  );
};

Modal.propTypes = {
  children: PropTypes.any.isRequired,
  dialogClassName: PropTypes.string,
  title: PropTypes.string.isRequired,
  size: PropTypes.string,
  showFooter: PropTypes.bool,
};

Modal.defaultProps = {
  size: 'md',
  dialogClassName: null, //modal-big
  showFooter: true,
};

export default Modal;
