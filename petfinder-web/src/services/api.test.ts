import { AxiosError } from 'axios';

import api, { SESSION_EXPIRED_EVENT, handleResponseError } from './api';

describe('handleResponseError', () => {
  beforeEach(() => {
    localStorage.clear();
    delete api.defaults.headers.authorization;
  });

  it('clears the session and dispatches the session-expired event for an expired token', async () => {
    localStorage.setItem('@PetFinder:token', 'abc123');
    localStorage.setItem('@PetFinder:user', '{}');
    api.defaults.headers.authorization = 'Bearer abc123';

    const listener = vi.fn();
    window.addEventListener(SESSION_EXPIRED_EVENT, listener);

    const error = new AxiosError('Request failed');
    error.response = {
      data: { error: 'jwt expired', tokenExpired: true },
      status: 401,
      statusText: 'Unauthorized',
      headers: {},
      config: error.config as never,
    };

    await expect(handleResponseError(error)).rejects.toBe(error);

    expect(localStorage.getItem('@PetFinder:token')).toBeNull();
    expect(localStorage.getItem('@PetFinder:user')).toBeNull();
    expect(api.defaults.headers.authorization).toBeUndefined();
    expect(listener).toHaveBeenCalledTimes(1);

    window.removeEventListener(SESSION_EXPIRED_EVENT, listener);
  });

  it('leaves the session untouched for a 401 that is not an expired token (e.g. wrong credentials)', async () => {
    localStorage.setItem('@PetFinder:token', 'abc123');
    api.defaults.headers.authorization = 'Bearer abc123';

    const listener = vi.fn();
    window.addEventListener(SESSION_EXPIRED_EVENT, listener);

    const error = new AxiosError('Request failed');
    error.response = {
      data: { error: 'User not found' },
      status: 401,
      statusText: 'Unauthorized',
      headers: {},
      config: error.config as never,
    };

    await expect(handleResponseError(error)).rejects.toBe(error);

    expect(localStorage.getItem('@PetFinder:token')).toBe('abc123');
    expect(api.defaults.headers.authorization).toBe('Bearer abc123');
    expect(listener).not.toHaveBeenCalled();

    window.removeEventListener(SESSION_EXPIRED_EVENT, listener);
  });
});
