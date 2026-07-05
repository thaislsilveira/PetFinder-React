import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import AppUser from '../../hooks';
import SignIn from '.';

describe('SignIn', () => {
  it('renders the login form fields and submit button', () => {
    render(
      <MemoryRouter>
        <AppUser>
          <SignIn />
        </AppUser>
      </MemoryRouter>,
    );

    expect(screen.getByText('Faça seu logon')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('E-mail')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Entrar' })).toBeInTheDocument();
  });
});
