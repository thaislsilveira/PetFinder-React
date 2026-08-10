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
  width: '48px',
  height: '48px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '0',
  transition: 'background-color 0.2s',

  '&:hover': {
    background: 'warning',
  },
});

export const locateButton = css({
  cursor: 'pointer',
  background: 'background',
  color: 'black',
  borderRadius: '50%',
  zIndex: 401,
  position: 'absolute',
  top: '84px',
  right: '26px',
  width: '48px',
  height: '48px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '0',
  transition: 'background-color 0.2s',

  '&:hover': {
    background: 'warning',
  },
  '&:disabled': {
    cursor: 'wait',
    opacity: 0.6,
  },
});

export const container = css({
  width: '100vw',
  height: '100vh',

  position: 'relative',
  display: 'flex',
  flexDirection: { base: 'column', md: 'row' },

  '& .map-popup .leaflet-popup-tip-container .leaflet-popup-tip': {
    background: '#e9c2af',
  },
  '& .map-popup .leaflet-popup-content-wrapper': {
    background: '#e9c2af',
    borderRadius: '20px',
    boxShadow: 'none',
  },

  '& .map-popup-found .leaflet-popup-tip-container .leaflet-popup-tip': {
    background: '#3cdc8c',
  },
  '& .map-popup-found .leaflet-popup-content-wrapper': {
    background: '#3cdc8c',
  },
  '& .map-popup-found .leaflet-popup-content .date-box span': {
    color: '#ffffff',
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
    flexDirection: 'column',
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

export const filterButton = css({
  cursor: 'pointer',
  background: 'background',
  color: 'black',
  borderRadius: '50%',
  zIndex: 401,
  position: 'absolute',
  top: '142px',
  right: '26px',
  width: '48px',
  height: '48px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '0',
  transition: 'background-color 0.2s',

  '&:hover': {
    background: 'warning',
  },
  '&[aria-expanded="true"]': {
    background: 'accent',
  },
});

export const filterPanel = css({
  position: 'absolute',
  zIndex: 401,
  top: '200px',
  right: '26px',

  display: 'flex',
  flexDirection: 'column',
  gap: '8px',

  padding: '12px',
  borderRadius: '16px',
  background: 'containerBackground',
  boxShadow: '17.2868px 27.6589px 41.4884px rgba(23, 142, 166, 0.16)',

  '& .filter-group': {
    display: 'flex',
    border: '1px solid',
    borderColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
  },

  '& .filter-group button': {
    flex: '1',
    height: '36px',
    padding: '0 14px',
    border: '0',
    borderLeft: '1px solid',
    borderLeftColor: 'white',
    background: 'white',
    color: 'primary',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    transition: 'background-color 0.2s, color 0.2s',
  },

  '& .filter-group button:first-child': {
    borderLeft: '0',
  },

  '& .filter-group button:hover': {
    background: 'highlight',
  },

  '& .filter-group button.active': {
    background: 'accent',
    color: 'white',
  },

  '& .filter-group button.active:hover': {
    background: 'accent',
  },
});

export const animationContainer = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  flexShrink: 0,

  animation: 'appearFromLeft 1s',

  width: { base: '100%', md: '440px' },
  background: 'background',
  padding: { base: '20px 24px', md: '80px' },

  justifyContent: 'space-between',
  gap: { base: '12px', md: '0' },

  '& h2': {
    fontSize: { base: '20px', md: '40px' },
    fontWeight: '800',

    lineHeight: { base: '24px', md: '42px' },
    marginTop: { base: '12px', md: '64px' },
  },

  '& p': {
    marginRight: { base: '0', md: '28px' },
    marginTop: { base: '8px', md: '24px' },
  },

  '& footer': {
    display: 'flex',
    flexDirection: { base: 'row', md: 'column' },
    alignItems: { base: 'center', md: 'flex-start' },
    justifyContent: { base: 'space-between', md: 'flex-start' },
    width: { base: '100%', md: 'auto' },
    gap: '20px',

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
