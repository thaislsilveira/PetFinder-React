import React from 'react';

import { BrowserRouter, Switch } from 'react-router-dom';

import Route from './routes/index';

import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import LocationMap from './pages/Map';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/dashboard" component={Dashboard} isPrivate />
        <Route path="/location" component={LocationMap} isPrivate />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
