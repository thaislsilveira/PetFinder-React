import Leaflet from 'leaflet';
import location from '../assets/location.png';

const pointIcon = new Leaflet.Icon({
  iconUrl: location,
  iconRetinaUrl: location,
  className: 'div-cion',
});

export default pointIcon;
