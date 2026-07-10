import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../hooks/auth';
import { UserLocationProvider } from '../hooks/geolocation';

const PrivateRoute: React.FC = () => {
  const { user } = useAuth();

  return user ? (
    <UserLocationProvider>
      <Outlet />
    </UserLocationProvider>
  ) : (
    <Navigate to="/" replace />
  );
};

const PublicRoute: React.FC = () => {
  const { user } = useAuth();

  return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export { PrivateRoute, PublicRoute };
