import { AxiosError } from 'axios';

import isSessionExpiredError from './isSessionExpiredError';

describe('isSessionExpiredError', () => {
  it('returns true for an Axios 401 flagged with tokenExpired', () => {
    const error = new AxiosError('Request failed');
    error.response = {
      data: { error: 'jwt expired', tokenExpired: true },
      status: 401,
      statusText: 'Unauthorized',
      headers: {},
      config: error.config as never,
    };

    expect(isSessionExpiredError(error)).toBe(true);
  });

  it('returns false for a 401 without the tokenExpired flag (e.g. wrong credentials)', () => {
    const error = new AxiosError('Request failed');
    error.response = {
      data: { error: 'User not found' },
      status: 401,
      statusText: 'Unauthorized',
      headers: {},
      config: error.config as never,
    };

    expect(isSessionExpiredError(error)).toBe(false);
  });

  it('returns false for a non-Axios error', () => {
    expect(isSessionExpiredError(new Error('network error'))).toBe(false);
  });
});
