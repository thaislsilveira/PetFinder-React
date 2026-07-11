import { css } from '../../../styled-system/css';

export const container = css({
  minHeight: '100vh',

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
  padding: '0 24px',
});

export const animationContainer = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',

  animation: 'appearFromLeft 1s',

  '& form': {
    margin: '40px 0',
    width: '100%',
    maxWidth: '340px',
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
  display: { base: 'none', md: 'block' },
  flex: 1,
  backgroundRepeat: 'repeat',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
});
