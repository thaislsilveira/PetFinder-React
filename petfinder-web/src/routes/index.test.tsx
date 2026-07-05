import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import AppUser from '../hooks';
import Routes from '../routes';

describe('PrivateRoute', () => {
  it('redirects an unauthenticated user away from a private route to sign in', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <AppUser>
          <Routes />
        </AppUser>
      </MemoryRouter>,
    );

    expect(screen.getByText('Faça seu logon')).toBeInTheDocument();
  });
});
