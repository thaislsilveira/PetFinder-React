import { css, cva } from '../../../styled-system/css';

export const container = cva({
  base: {
    background: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1100,
    overflow: 'auto',
  },
  variants: {
    visible: {
      true: { display: 'block' },
      false: { display: 'none' },
    },
  },
});

export const modal = cva({
  variants: {
    visibleEffect: {
      true: {
        animation: 'modalEffect 0.3s',
      },
    },
  },
});

export const content = css({
  flex: 1,

  '& form': {
    width: '640px',
    maxWidth: 'calc(100vw - 32px)',
    maxHeight: 'calc(100vh - 48px)',
    margin: '24px auto',

    background: 'white',
    border: '1px solid',
    borderColor: 'background',
    borderRadius: '20px',

    display: 'flex',
    flexDirection: 'column',

    overflow: 'hidden',

    marginBottom: '24px',
    position: 'relative',
  },

  '& form button.button-close': {
    position: 'absolute',
    right: '16px',
    top: '15px',
    opacity: 0.6,
    border: '0',
    background: 'transparent',
    color: 'inherit',
    zIndex: 1,
  },

  '& form button.button-close svg': {
    color: 'error',
  },

  '& .modal-scroll': {
    overflowY: 'auto',
    padding: '40px 48px',

    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'inputBackground',
      borderRadius: '8px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: 'accent',
    },
  },

  '& fieldset': {
    border: '0',
  },

  '& fieldset + fieldset': {
    marginTop: '40px',
  },

  '& fieldset legend': {
    width: '100%',

    textAlign: 'center',
    fontSize: '24px',
    lineHeight: '28px',
    color: 'highlight',
    fontWeight: '700',

    borderBottom: '1px solid',
    borderColor: 'primary',
    marginBottom: '24px',
    paddingBottom: '16px',
  },

  '& .input-block + .input-block': {
    marginTop: '24px',
  },

  '& .input-block label': {
    fontSize: '18px',
    display: 'flex',
    color: 'primary',
    marginBottom: '8px',
    lineHeight: '24px',
  },

  '& .input-block input, & .input-block textarea, & .input-block select': {
    width: '100%',
    background: 'inputBackground',
    border: '1px solid',
    borderColor: 'inputBackground',
    borderRadius: '12px',
    outline: 'none',
    color: 'primary',
  },

  '& .input-block input, & .input-block select': {
    height: '48px',
    padding: '0 16px',
  },

  '& .input-block select': {
    cursor: 'pointer',
    appearance: 'none',
    paddingRight: '40px',
    backgroundImage:
      'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="%2394443f" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>\')',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 16px center',
  },

  '& .field-row': {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
  },

  '& .field-row .input-block + .input-block': {
    marginTop: 0,
  },

  '& .input-block + .field-row, & .field-row + .input-block, & .field-row + .field-row':
    {
      marginTop: '24px',
    },

  '& .input-block textarea': {
    minHeight: '120px',
    maxHeight: '240px',
    resize: 'vertical',
    padding: '16px',
    lineHeight: '28px',
  },

  '& .input-block .images-container': {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
    gridGap: '12px',
  },

  '& .input-block .images-container img': {
    width: '100%',
    height: '72px',
    objectFit: 'cover',
    borderRadius: '20px',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    boxShadow: 'inset 0 0 2px #fff, 0 0 12px rgba(0, 0, 0, 0.05)',
  },

  '& .input-block .images-container .existing-image': {
    position: 'relative',
  },

  '& .input-block .images-container .remove-image-button': {
    position: 'absolute',
    top: '-6px',
    right: '-6px',

    width: '22px',
    height: '22px',
    padding: 0,
    border: '0',
    borderRadius: '50%',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    background: 'error',
    color: '#ffffff',
    cursor: 'pointer',
  },

  '& .input-block .new-image': {
    height: '72px',
    background: 'inputBackground',
    border: '1px dashed',
    borderColor: 'primary',
    borderRadius: '20px',
    cursor: 'pointer',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  '& .input-block input[type="file"]': {
    visibility: 'hidden',
  },

  '& .input-block .button-select': {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    height: '48px',
    border: '1px solid',
    borderColor: 'inputBackground',
    borderRadius: '12px',
    overflow: 'hidden',
  },

  '& .input-block .button-select button': {
    height: '100%',
    border: '0',
    borderLeft: '1px solid',
    borderLeftColor: 'inputBackground',
    background: 'inputBackground',
    color: 'primary',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'background-color 0.2s, color 0.2s',
  },

  '& .input-block .button-select button:first-child': {
    borderLeft: '0',
  },

  '& .input-block .button-select button.active': {
    background: 'accent',
    color: 'white',
  },

  '& button.confirm-button': {
    marginTop: '32px',

    width: '100%',
    height: '56px',
    border: '0',
    cursor: 'pointer',
    background: '#3cdc8c',
    borderRadius: '20px',
    color: '#ffffff',
    fontWeight: '800',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    transition: 'background-color 0.2s',
  },

  '& button.confirm-button svg': {
    marginRight: '16px',
  },

  '& button.confirm-button:hover': {
    background: '#36cf82',
  },
});
