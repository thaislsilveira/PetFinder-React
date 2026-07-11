import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/panda.css';
import './styles/leaflet.css';
import App from './App';

const container = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
