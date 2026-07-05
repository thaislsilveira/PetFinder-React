import { cva } from '../../../styled-system/css';

export const container = cva({
  base: {
    position: 'relative',

    '& span': {
      width: '160px',
      padding: '8px',
      borderRadius: '4px',
      fontSize: '14px',
      fontWeight: '500',
      opacity: 0,
      transition: 'opacity 0.4s',
      visibility: 'hidden',

      position: 'absolute',
      bottom: 'calc(100% + 12px)',
      left: '50%',
      transform: 'translate(-50%)',

      '&::before': {
        content: '""',
        borderStyle: 'solid',
        borderWidth: '6px 6px 0 6px',
        top: '100%',
        position: 'absolute',
        left: '50%',
        transform: 'translate(-50%)',
      },
    },

    '&:hover span': {
      opacity: 1,
      visibility: 'visible',
    },
  },
  variants: {
    variant: {
      default: {
        '& span': {
          background: 'accent',
          color: '#312e38',
          '&::before': {
            borderColor: '#ff9000 transparent',
          },
        },
      },
      error: {
        '& span': {
          background: 'error',
          color: 'white',
          '&::before': {
            borderColor: '#c53030 transparent',
          },
        },
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
