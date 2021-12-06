import React from 'react';

import Leaflet from 'leaflet';

import { Map, Marker, TileLayer } from 'react-leaflet';

type MapProps = {
  latitude: number;
  longitude: number;
  icon: Leaflet.Icon;
};

const MapComponent: React.FC<MapProps> = ({ latitude, longitude, icon }) => (
  <Map
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
      url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
    />
    <Marker interactive={false} icon={icon} position={[latitude, longitude]} />
  </Map>
);

export default MapComponent;
