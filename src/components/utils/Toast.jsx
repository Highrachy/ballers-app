import React from 'react';
import { Toast as BoostrapToast } from 'react-bootstrap';
import {
  SuccessIcon,
  InfoIcon,
  WarningIcon,
  ErrorIcon,
} from 'components/utils/Icons';

export const useToast = () => {
  const initial = {
    message: null,
    type: 'error',
  };
  const [toast, setToast] = React.useState(initial);
  const toastIsClosed = () => setToast(null);

  return [{ ...toast, toastIsClosed }, setToast];
};

const Toast = ({ message, type, toastIsClosed }) => {
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    message && setShow(true);
  }, [message]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setShow(false);
      toastIsClosed();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [show, toastIsClosed]);

  if (!message) {
    return null;
  }

  console.log('TOAST_STYLE[type].icon ', TOAST_STYLE[type]);
  return (
    <BoostrapToast
      show={show}
      onClose={() => {
        setShow(false);
        toastIsClosed();
      }}
      className={`toast-container toast__top-right ${
        TOAST_STYLE[type] ? type : 'error'
      }`}
    >
      <BoostrapToast.Header>
        <div className="toast-icon-holder">
          {TOAST_STYLE[type] ? TOAST_STYLE[type].icon : <ErrorIcon />}
        </div>
        <strong className="mr-auto">
          {TOAST_STYLE[type]
            ? TOAST_STYLE[type].name
            : TOAST_STYLE['error'].name}
        </strong>
      </BoostrapToast.Header>
      <BoostrapToast.Body>{message}</BoostrapToast.Body>
    </BoostrapToast>
  );
};

const TOAST_STYLE = {
  error: {
    icon: <ErrorIcon />,
    name: 'Error',
  },
  info: {
    icon: <InfoIcon />,
    name: 'Information',
  },
  success: {
    icon: <SuccessIcon />,
    name: 'Success',
  },
  warning: {
    icon: <WarningIcon />,
    name: 'Warning',
  },
};

export default Toast;
