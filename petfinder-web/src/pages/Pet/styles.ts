import { css } from '../../../styled-system/css';

export const container = css({
  display: 'flex',
  flex: 1,
  backgroundRepeat: 'repeat',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
});

export const content = css({
  flex: 1,

  '& .pet-details': {
    padding: '40px',
    width: '700px',
    margin: '64px auto',
    overflow: 'hidden',
    backgroundColor: '#f7f3eb',
    borderRadius: '20px',
    border: '1px solid #eddfd2',
  },

  '& .pet-details > img': {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '20px',
  },

  '& .pet-details .images': {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    columnGap: '16px',

    margin: '20px 0 0',
  },

  '& .pet-details .images button': {
    border: '0',
    height: '88px',
    background: 'none',
    cursor: 'pointer',
    borderRadius: '20px',
    overflow: 'hidden',
    outline: 'none',

    opacity: 0.6,
  },

  '& .pet-details .images button:active': {
    opacity: 1,
  },

  '& .pet-details .images button img': {
    width: '100%',
    height: '88px',
    objectFit: 'cover',
  },

  '& .pet-details .pet-details-content': {
    margin: '20px 0 0',
  },

  '& .pet-details .pet-details-content h2': {
    color: 'primary',
    fontSize: '18px',
    lineHeight: '46px',
  },

  '& .pet-details .pet-details-content p': {
    padding: '20px',
    lineHeight: '28px',
    fontSize: '18px',
    color: 'primary',
    borderRadius: '20px',
    backgroundColor: 'background',
  },

  '& .pet-details .pet-details-content .phone': {
    border: '0',
    fontSize: '18px',
    color: 'primary',
    borderRadius: '20px',
    backgroundColor: 'background',
  },

  '& .pet-details .leaflet-container': {
    borderRadius: 'inherit',
  },

  '& .pet-details .map-container': {
    marginTop: '64px',
    background: 'background',
    border: '1px solid',
    borderColor: 'background',
    borderRadius: '20px',
  },

  '& .pet-details .map-container footer': {
    padding: '20px 0',
    textAlign: 'center',
  },

  '& .pet-details .map-container footer a': {
    lineHeight: '24px',
    color: 'primary',
    textDecoration: 'none',
  },

  '& .pet-details .type-details': {
    marginTop: '24px',
    paddingRight: '5px',

    display: 'inline-block',
    gridTemplateColumns: '1fr 1fr',
    columnGap: '20px',
  },

  '& .pet-details .type-details div': {
    padding: '32px 24px',
    borderRadius: '20px',
    lineHeight: '28px',
  },

  '& .pet-details .type-details div svg': {
    display: 'block',
    marginBottom: '20px',
  },

  '& .pet-details .type-details div.type-sex': {
    width: '264px',
    background: 'linear-gradient(154.16deg, #d3d3d3 7.85%, #ffffff 91.03%)',
    border: '1px solid #a9a9a9',
    color: '#808080',
  },

  '& .pet-details .type-details div.type-animal': {
    width: '264px',
    background: 'linear-gradient(154.16deg, #ffdead 7.85%, #ffffff 91.03%)',
    border: '1px solid #f4a460',
    color: '#d2691e',
  },
});
