import { css } from '../../../styled-system/css';

export const container = css({
  height: '100%',
  backgroundRepeat: 'repeat',
  backgroundPosition: 'top',
  backgroundAttachment: 'fixed',
});

export const content = css({
  display: 'flex',
  paddingLeft: { base: '0', md: '150px' },

  '& .details': {
    padding: { base: '24px', md: '40px' },
    width: { base: 'calc(100% - 32px)', md: '700px' },
    backgroundColor: 'background',
    borderRadius: '20px',
    border: '1px solid',
    borderColor: 'background',
    margin: { base: '88px auto 24px', md: '80px auto' },
  },

  '& .details h1': {
    color: 'primary',
    lineHeight: '46px',
    textAlign: 'center',
  },

  '& .details form': {
    margin: { base: '40px auto', md: '80px auto' },
    width: '100%',
    maxWidth: '340px',
    textAlign: 'center',
  },

  '& .details form a': {
    color: 'containerBackground',
    display: 'block',
    marginTop: '24px',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },

  '& .details form a:hover': {
    color: 'containerBackgroundHover',
  },
});
