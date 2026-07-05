import React, { ButtonHTMLAttributes } from 'react';

import { container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  ...rest
}) => (
  <button type="button" className={container} {...rest}>
    {loading ? 'Carregando...' : children}
  </button>
);

export default Button;
