import { cva } from '../../../../styled-system/css';

export const container = cva({
  base: {
    width: { base: 'calc(100vw - 32px)', md: '360px' },

    position: 'relative',
    padding: '16px 30px 16px 16px',
    margin: { base: '12px 16px', md: '30px' },
    borderRadius: '10px',
    boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)',
    display: 'flex',

    '& + div': {
      marginTop: '8px',
    },

    '& > svg': {
      margin: '4px 12px 0 0',
    },
    '& div': {
      flex: 1,

      '& p': {
        marginTop: '4px',
        fontSize: '14px',
        opacity: 0.8,
        lineHeight: '20px',
      },
    },

    '& button': {
      position: 'absolute',
      right: '16px',
      top: '15px',
      opacity: 0.6,
      border: '0',
      background: 'transparent',
      color: 'inherit',
    },
  },
  variants: {
    type: {
      info: {
        background: '#edf8ff',
        color: '#3172b7',
      },
      success: {
        background: '#e6fffa',
        color: '#2e656a',
      },
      error: {
        background: '#fddede',
        color: 'error',
      },
    },
    hasDescription: {
      false: {
        alignItems: 'center',
        '& svg': {
          marginTop: 0,
        },
      },
    },
  },
  defaultVariants: {
    type: 'info',
  },
});
