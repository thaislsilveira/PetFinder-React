import React, { useEffect } from 'react';
import {
  FiAlertCircle as FiAlertCircleIcon,
  FiCheckCircle as FiCheckCircleIcon,
  FiInfo as FiInfoIcon,
  FiXCircle as FiXCircleIcon,
} from 'react-icons/fi';
import { animated } from '@react-spring/web';

import { ToastMessage, useToast } from '../../../hooks/toast';

import asIcon from '../../../utils/icon';
import { container } from './styles';

const FiAlertCircle = asIcon(FiAlertCircleIcon);
const FiCheckCircle = asIcon(FiCheckCircleIcon);
const FiInfo = asIcon(FiInfoIcon);
const FiXCircle = asIcon(FiXCircleIcon);

interface ToastProps {
  message: ToastMessage;
  style: object;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast, message.id]);
  return (
    <animated.div
      className={container({
        type: message.type || 'info',
        hasDescription: !!message.description,
      })}
      style={style}
    >
      {icons[message.type || 'info']}
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>
      <button onClick={() => removeToast(message.id)} type="button">
        <FiXCircle size={18} />
      </button>
    </animated.div>
  );
};

export default Toast;
