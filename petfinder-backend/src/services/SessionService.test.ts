import { compareSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UsersService from './UsersService';
import SessionService from './SessionService';

vi.mock('./UsersService', () => ({
  default: { findByEmail: vi.fn() },
}));

vi.mock('bcryptjs', () => ({
  compareSync: vi.fn(),
}));

vi.mock('jsonwebtoken', () => ({
  default: { sign: vi.fn() },
}));

const mockedUsersService = UsersService as unknown as {
  findByEmail: ReturnType<typeof vi.fn>;
};
const mockedCompareSync = compareSync as unknown as ReturnType<typeof vi.fn>;
const mockedJwt = jwt as unknown as { sign: ReturnType<typeof vi.fn> };

describe('SessionService', () => {
  beforeEach(() => {
    mockedUsersService.findByEmail.mockReset();
    mockedCompareSync.mockReset();
    mockedJwt.sign.mockReset();
  });

  it('returns a user_not_found error when no user matches the email', async () => {
    mockedUsersService.findByEmail.mockResolvedValueOnce(null);

    const result = await SessionService.authenticate(
      'missing@petfinder.com',
      'secret',
    );

    expect(result).toEqual({ error: 'user_not_found' });
    expect(mockedCompareSync).not.toHaveBeenCalled();
  });

  it('returns an invalid_password error when the password does not match', async () => {
    mockedUsersService.findByEmail.mockResolvedValueOnce({
      id: '1',
      name: 'Rex',
      email: 'rex@petfinder.com',
      password: 'hashed',
    });
    mockedCompareSync.mockReturnValueOnce(false);

    const result = await SessionService.authenticate(
      'rex@petfinder.com',
      'wrong-password',
    );

    expect(result).toEqual({ error: 'invalid_password' });
    expect(mockedJwt.sign).not.toHaveBeenCalled();
  });

  it('returns the user and a signed token on success', async () => {
    mockedUsersService.findByEmail.mockResolvedValueOnce({
      id: '1',
      name: 'Rex',
      email: 'rex@petfinder.com',
      password: 'hashed',
    });
    mockedCompareSync.mockReturnValueOnce(true);
    mockedJwt.sign.mockReturnValueOnce('signed-token');

    const result = await SessionService.authenticate(
      'rex@petfinder.com',
      'secret',
    );

    expect(mockedJwt.sign).toHaveBeenCalledWith({ id: '1' }, 'test-secret', {
      expiresIn: '7d',
    });
    expect(result).toEqual({
      user: { id: '1', name: 'Rex', email: 'rex@petfinder.com' },
      token: 'signed-token',
    });
  });
});
