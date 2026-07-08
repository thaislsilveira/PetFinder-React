import { act, renderHook } from '@testing-library/react';

import api from '../services/api';
import { AuthUser, useAuth } from './auth';

vi.mock('../services/api', () => ({
  default: {
    post: vi.fn(),
    defaults: { headers: {} as Record<string, string> },
  },
}));

const mockedApi = api as unknown as {
  post: ReturnType<typeof vi.fn>;
  defaults: { headers: Record<string, string> };
};

const user = {
  id: '1',
  name: 'Rex',
  email: 'rex@petfinder.com',
  phone: '11999999999',
};

describe('useAuth', () => {
  beforeEach(() => {
    localStorage.clear();
    mockedApi.post.mockReset();
    delete mockedApi.defaults.headers.authorization;
  });

  it('signs in, persisting the session and setting the auth header', async () => {
    mockedApi.post.mockResolvedValueOnce({ data: { token: 'abc123', user } });

    const { result } = renderHook(() => useAuth(), { wrapper: AuthUser });

    await act(async () => {
      await result.current.signIn({
        email: user.email,
        password: 'secret',
      });
    });

    expect(result.current.user).toEqual(user);
    expect(localStorage.getItem('@PetFinder:token')).toBe('abc123');
    expect(
      JSON.parse(localStorage.getItem('@PetFinder:user') as string),
    ).toEqual(user);
    expect(mockedApi.defaults.headers.authorization).toBe('Bearer abc123');
  });

  it('signs out, clearing the persisted session and the auth header', async () => {
    mockedApi.post.mockResolvedValueOnce({ data: { token: 'abc123', user } });

    const { result } = renderHook(() => useAuth(), { wrapper: AuthUser });

    await act(async () => {
      await result.current.signIn({
        email: user.email,
        password: 'secret',
      });
    });

    act(() => {
      result.current.signOut();
    });

    expect(result.current.user).toBeUndefined();
    expect(localStorage.getItem('@PetFinder:token')).toBeNull();
    expect(localStorage.getItem('@PetFinder:user')).toBeNull();
    expect(mockedApi.defaults.headers.authorization).toBeUndefined();
  });

  it('restores an existing session from localStorage on mount', () => {
    localStorage.setItem('@PetFinder:token', 'stored-token');
    localStorage.setItem('@PetFinder:user', JSON.stringify(user));

    const { result } = renderHook(() => useAuth(), { wrapper: AuthUser });

    expect(result.current.user).toEqual(user);
    expect(mockedApi.defaults.headers.authorization).toBe(
      'Bearer stored-token',
    );
  });
});
