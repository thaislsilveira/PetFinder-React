import React from 'react';
import { useTransition } from '@react-spring/web';

import Toast from './Toast';

import { container } from './styles';
import { ToastMessage } from '../../hooks/toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(messages, {
    keys: message => message.id,
    from: { right: '-120%', opacity: 0 },
    enter: { right: '0%', opacity: 1 },
    leave: { right: '-120%', opacity: 0 },
  });
  return (
    <div className={container}>
      {messagesWithTransitions((style, item) => (
        <Toast style={style} message={item} />
      ))}
    </div>
  );
};

export default ToastContainer;
