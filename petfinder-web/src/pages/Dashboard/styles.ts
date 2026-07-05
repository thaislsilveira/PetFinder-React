import { css } from '../../../styled-system/css';

export const container = css({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const content = css({
  position: 'relative',

  width: '100%',
  maxWidth: '1100px',

  height: '100%',
  maxHeight: '600px',

  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  justifyContent: 'space-between',

  backgroundRepeat: 'no-repeat',
  backgroundSize: '600px',
  backgroundPositionX: '400px',
  backgroundPositionY: '250px',

  '& main': {
    maxWidth: '350px',
  },

  '& main h1': {
    fontSize: '76px',
    fontWeight: '900',
    lineHeight: '70px',
  },

  '& p': {
    marginTop: '40px',
    fontSize: '24px',
    lineHeight: '34px',
  },

  '& a.absolute-link': {
    position: 'absolute',

    right: 0,
    bottom: 0,

    width: '80px',
    height: '80px',
    background: 'highlight',
    borderRadius: '30px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    transition: 'background-color 0.2s',
  },

  '& a.absolute-link:hover': {
    background: 'primary',
  },
});

export const header = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignContent: 'center',

  width: '100%',
});

export const contentRight = css({
  fontSize: '24px',
  lineHeight: '34px',

  display: 'flex',
  margin: 'auto 0',
  justifyContent: 'center',
  alignContent: 'center',

  textAlign: 'right',

  '& strong': {
    textAlign: 'center',
    fontWeight: '800',
  },

  '& > div': {
    display: 'inline-block',
    marginLeft: '16px',
    lineHeight: '24px',
  },

  '& > div span': {
    color: 'containerBackground',
  },

  '& > div a.profile-link': {
    textDecoration: 'none',
    color: 'highlight',

    transition: 'background-color 0.2s',
  },

  '& > div a.profile-link:hover': {
    color: 'primary',
    opacity: 0.8,
  },
});
