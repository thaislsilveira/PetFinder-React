import { css } from '../../../styled-system/css';

export const container = css({
  height: '100vh',

  display: 'flex',
  alignItems: 'stretch',
});

export const content = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  width: '100%',
  maxWidth: '700px',
});

export const animationContainer = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  animation: 'appearFromLeft 1s',

  '& form': {
    margin: '40px 0',
    width: '340px',
    textAlign: 'center',
  },

  '& form h1': {
    marginBottom: '24px',
    color: 'primary',
  },

  '& > a': {
    color: 'textLight',
    display: 'flex',
    alignItems: 'center',
    marginTop: '24px',
    textDecoration: 'none',
    transition: 'color 0.2s',

    '&:hover': {
      color: 'textLightHover',
    },

    '& svg': {
      marginRight: '16px',
    },
  },
});

export const background = css({
  flex: 1,
  backgroundRepeat: 'repeat',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
});
