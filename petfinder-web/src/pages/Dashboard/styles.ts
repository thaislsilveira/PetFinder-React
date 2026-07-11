import { css } from '../../../styled-system/css';

export const container = css({
  width: '100vw',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: { base: '24px', md: '0' },
});

export const content = css({
  position: 'relative',

  width: '100%',
  maxWidth: '1100px',

  height: '100%',
  minHeight: { base: '500px', md: 'auto' },
  maxHeight: { base: 'none', md: '600px' },

  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  justifyContent: 'space-between',

  animation: 'appearFromLeft 0.6s',

  backgroundRepeat: 'no-repeat',
  backgroundSize: '600px',
  backgroundPositionX: '400px',
  backgroundPositionY: '250px',

  '& main': {
    maxWidth: { base: '100%', md: '350px' },
    paddingRight: { base: '96px', md: '0' },
  },

  '& main h1': {
    fontSize: { base: '32px', md: '76px' },
    fontWeight: '900',
    lineHeight: { base: '36px', md: '70px' },
  },

  '& p': {
    marginTop: { base: '16px', md: '40px' },
    fontSize: { base: '16px', md: '24px' },
    lineHeight: { base: '22px', md: '34px' },
  },

  '& a.absolute-link': {
    position: 'absolute',

    right: 0,
    bottom: 0,

    width: { base: '56px', md: '80px' },
    height: { base: '56px', md: '80px' },
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
  flexWrap: 'wrap',
  gap: '16px',
  justifyContent: 'space-between',
  alignContent: 'center',

  width: '100%',
});

export const contentRight = css({
  fontSize: { base: '14px', md: '24px' },
  lineHeight: { base: '20px', md: '34px' },

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
    lineHeight: { base: '18px', md: '24px' },
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
