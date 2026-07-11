import Leaflet from 'leaflet';
import mapMarkerFoundImg from '../assets/locationFound.svg';

const foundMapIcon = Leaflet.icon({
  iconUrl: mapMarkerFoundImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60],
});

export default foundMapIcon;
