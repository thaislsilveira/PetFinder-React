import React from 'react';
import { render, screen } from '@testing-library/react';

import Tooltip from '.';

describe('Tooltip', () => {
  it('renders its title and children', () => {
    render(<Tooltip title="Campo obrigatório">*</Tooltip>);

    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('applies a different class for the error variant than the default one', () => {
    const { container: defaultRender } = render(
      <Tooltip title="Aviso">*</Tooltip>,
    );
    const { container: errorRender } = render(
      <Tooltip title="Aviso" variant="error">
        *
      </Tooltip>,
    );

    expect((errorRender.firstElementChild as HTMLElement).className).not.toBe(
      (defaultRender.firstElementChild as HTMLElement).className,
    );
  });
});
