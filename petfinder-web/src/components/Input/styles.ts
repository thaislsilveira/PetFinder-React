import { css, cva } from '../../../styled-system/css';

export const container = cva({
  base: {
    background: 'textLight',
    borderRadius: '10px',
    border: '2px solid',
    borderColor: 'textLight',
    padding: '16px',
    width: '100%',
    color: 'primary',

    display: 'flex',
    alignItems: 'center',

    '& + div': {
      marginTop: '8px',
    },

    '& input': {
      flex: 1,
      background: 'transparent',
      border: '0',
      color: 'primary',

      '&::placeholder': {
        color: '#666360',
      },
    },

    '& svg': {
      marginRight: '16px',
    },
  },
  variants: {
    isFocused: {
      true: {
        color: 'accent',
        borderColor: 'accent',
      },
    },
    isFilled: {
      true: {
        color: 'accent',
      },
    },
    isErrored: {
      true: {
        borderColor: 'error',
      },
    },
  },
});

export const error = css({
  height: '20px',
  marginLeft: '16px',

  '& svg': {
    margin: 0,
  },
});
