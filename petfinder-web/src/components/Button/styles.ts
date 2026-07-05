import { css } from '../../../styled-system/css';

export const container = css({
  background: 'warning',
  height: '56px',
  borderRadius: '10px',
  border: '0',
  padding: '0 16px',
  color: '#312e38',
  width: '100%',
  fontWeight: '500',
  marginTop: '16px',
  transition: 'background-color 0.2s',
  _hover: {
    background: 'warningHover',
  },
});
