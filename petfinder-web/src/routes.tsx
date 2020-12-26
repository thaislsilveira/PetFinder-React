import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';

import LocationMap from './pages/Map';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Dashboard} exact />
        <Route path="/login" exact component={SignIn} />
        <Route path="/location" component={LocationMap} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
