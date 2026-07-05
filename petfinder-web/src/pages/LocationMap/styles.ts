import { css } from '../../../styled-system/css';

export const exitButton = css({
  cursor: 'pointer',
  background: 'background',
  color: 'black',
  borderRadius: '50%',
  zIndex: 401,
  position: 'absolute',
  top: '26px',
  right: '26px',
  width: '60px',
  height: '60px',
  lineHeight: '72px',
  textAlign: 'center',
  border: '0',
  transition: 'background-color 0.2s',

  '& svg': {
    paddingLeft: '2px',
    display: 'inline-block',
  },
  '&:hover': {
    background: 'warning',
  },
});

export const container = css({
  width: '100vw',
  height: '100vh',

  position: 'relative',
  display: 'flex',

  '& .map-popup .leaflet-popup-tip-container .leaflet-popup-tip': {
    background: '#e9c2af',
  },
  '& .map-popup .leaflet-popup-content-wrapper': {
    background: '#e9c2af',
    borderRadius: '20px',
    boxShadow: 'none',
  },

  '& .map-popup .leaflet-popup-content a': {
    width: '100%',
    height: '40px',
    background: 'background',
    boxShadow: '17.2868px 27.6589px 41.4884px rgba(23, 142, 166, 0.16)',
    borderRadius: '12px',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  '& .map-popup .leaflet-popup-content .image-box': {
    width: '100%',
    height: '180px',
    display: 'block',
    borderRadius: '12px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    marginBottom: '10px',
  },
  '& .map-popup .leaflet-popup-content .image-box img': {
    display: 'none',
  },
  '& .map-popup .leaflet-popup-content .date-box': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  '& .map-popup .leaflet-popup-content .date-box span': {
    fontWeight: 'bold',
    color: 'primary',
    padding: '8px',
    fontSize: '14px',
  },
});

export const animationContainer = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  animation: 'appearFromLeft 1s',

  width: '440px',
  background: 'background',
  padding: '80px',

  justifyContent: 'space-between',

  '& h2': {
    fontSize: '40px',
    fontWeight: '800',

    lineHeight: '42px',
    marginTop: '64px',
  },

  '& p': {
    marginRight: '28px',
    marginTop: '24px',
  },

  '& footer': {
    display: 'flex',
    flexDirection: 'column',

    lineHeight: '24px',
  },

  '& footer strong': {
    fontWeight: '800',
  },

  '& footer button': {
    width: '48px',
    height: '48px',

    border: '0',

    background: 'highlight',
    borderRadius: '16px',

    cursor: 'pointer',

    transition: 'background-color 0.2s',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  '& button:hover': {
    background: 'primary',
  },
});
