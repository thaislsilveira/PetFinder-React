import React from 'react';

import { cx } from '../../../styled-system/css';
import { container } from './styles';

interface TooltipProps {
  title: string;
  className?: string;
  variant?: 'default' | 'error';
  children?: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  className = '',
  variant = 'default',
  children,
}) => (
  <div className={cx(container({ variant }), className)}>
    {children}
    <span>{title}</span>
  </div>
);

export default Tooltip;
