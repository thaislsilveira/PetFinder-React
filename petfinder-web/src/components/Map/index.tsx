import React from 'react';

import Leaflet from 'leaflet';

import { MapContainer, Marker, TileLayer } from 'react-leaflet';

type MapProps = {
  latitude: number;
  longitude: number;
  icon: Leaflet.Icon;
};

const MapComponent: React.FC<MapProps> = ({ latitude, longitude, icon }) => (
  <MapContainer
    center={[latitude, longitude]}
    zoom={16}
    style={{ width: '100%', height: 280 }}
    dragging={false}
    touchZoom={false}
    zoomControl={false}
    scrollWheelZoom={false}
    doubleClickZoom={false}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
    <Marker
      interactive={false}
      icon={icon}
      position={[latitude, longitude]}
    />
  </MapContainer>
);

export default MapComponent;
