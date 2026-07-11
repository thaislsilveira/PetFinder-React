import { css } from '../../../styled-system/css';

export const container = css({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 500,

  height: { base: '64px', md: '100%' },
  width: { base: '100%', md: '150px' },
  padding: { base: '0 20px', md: '15px 0' },
  background: 'linear-gradient(329.54deg, #f79641 0%, #f79641 100%)',

  display: 'flex',
  flexDirection: { base: 'row', md: 'column' },
  justifyContent: 'space-between',
  alignItems: 'center',

  '& footer a, & footer button': {
    width: '48px',
    height: '48px',

    border: '0',

    background: 'warning',
    borderRadius: '16px',

    cursor: 'pointer',

    transition: 'background-color 0.2s',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  '& footer a:hover, & button:hover': {
    background: 'primary',
  },
});
