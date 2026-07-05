import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import 'leaflet/dist/leaflet.css';

import AppUser from './hooks';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppUser>
        <Routes />
      </AppUser>
    </BrowserRouter>
  );
};

export default App;
