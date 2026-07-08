import React from 'react';
import { render, screen } from '@testing-library/react';

import Button from '.';

describe('Button', () => {
  it('renders its children as the label', () => {
    render(<Button>Entrar</Button>);

    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
  });

  it('shows a loading label instead of the children while loading', () => {
    render(<Button loading>Entrar</Button>);

    expect(
      screen.getByRole('button', { name: 'Carregando...' }),
    ).toBeInTheDocument();
    expect(screen.queryByText('Entrar')).not.toBeInTheDocument();
  });

  it('forwards native button props such as disabled', () => {
    render(<Button disabled>Entrar</Button>);

    expect(screen.getByRole('button', { name: 'Entrar' })).toBeDisabled();
  });
});
