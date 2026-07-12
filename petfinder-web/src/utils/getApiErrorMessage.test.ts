import { AxiosError } from 'axios';

import getApiErrorMessage from './getApiErrorMessage';

describe('getApiErrorMessage', () => {
  it('returns the error message from an Axios response body', () => {
    const error = new AxiosError('Request failed');
    error.response = {
      data: { error: 'Uma ou mais imagens não parecem ser de um animal.' },
      status: 400,
      statusText: 'Bad Request',
      headers: {},
      config: error.config as never,
    };

    expect(getApiErrorMessage(error)).toBe(
      'Uma ou mais imagens não parecem ser de um animal.',
    );
  });

  it('returns undefined for an Axios error without that field', () => {
    const error = new AxiosError('Request failed');
    error.response = {
      data: { message: 'Validation fails' },
      status: 400,
      statusText: 'Bad Request',
      headers: {},
      config: error.config as never,
    };

    expect(getApiErrorMessage(error)).toBeUndefined();
  });

  it('returns undefined for a non-Axios error', () => {
    expect(getApiErrorMessage(new Error('network error'))).toBeUndefined();
  });
});
