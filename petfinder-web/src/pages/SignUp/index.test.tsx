import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import AppUser from '../../hooks';
import SignUp from '.';

describe('SignUp', () => {
  it('renders the registration form fields and submit button', () => {
    render(
      <MemoryRouter>
        <AppUser>
          <SignUp />
        </AppUser>
      </MemoryRouter>,
    );

    expect(screen.getByText('Faça seu cadastro')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('E-mail')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Telefone')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Cadastrar' }),
    ).toBeInTheDocument();
  });
});
