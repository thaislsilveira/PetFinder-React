import { css } from '../../../styled-system/css';

export const container = css({
  height: '100%',
  backgroundRepeat: 'repeat',
  backgroundPosition: 'top',
  backgroundAttachment: 'fixed',
});

export const content = css({
  display: 'flex',

  '& .details': {
    padding: '40px',
    width: '700px',
    backgroundColor: 'background',
    borderRadius: '20px',
    border: '1px solid',
    borderColor: 'background',
    margin: '80px auto',
  },

  '& .details h1': {
    color: 'primary',
    lineHeight: '46px',
    textAlign: 'center',
  },

  '& .details form': {
    margin: '80px auto',
    width: '340px',
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
