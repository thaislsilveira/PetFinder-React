import React from 'react';

import { Routes as RouterRoutes, Route } from 'react-router-dom';

import { PrivateRoute, PublicRoute } from './routes/index';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Dashboard from './pages/Dashboard';
import LocationMap from './pages/LocationMap';
import Pet from './pages/Pet';
import Profile from './pages/Profile';

const Routes: React.FC = () => {
  return (
    <RouterRoutes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/location" element={<LocationMap />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/pets/:id" element={<Pet />} />
      </Route>
    </RouterRoutes>
  );
};

export default Routes;
