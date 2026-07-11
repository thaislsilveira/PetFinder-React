import { Request, Response } from 'express';
import { hash } from 'bcryptjs';
import { ZodError } from 'zod';

import UsersService from '../services/UsersService';
import UsersController from './UsersController';

vi.mock('../services/UsersService', () => ({
  default: { create: vi.fn() },
}));

vi.mock('bcryptjs', () => ({
  hash: vi.fn(),
}));

const mockedUsersService = UsersService as unknown as {
  create: ReturnType<typeof vi.fn>;
};
const mockedHash = hash as unknown as ReturnType<typeof vi.fn>;

function createResponse() {
  const response = {} as Response;
  response.status = vi.fn().mockReturnValue(response);
  response.json = vi.fn().mockReturnValue(response);
  return response;
}

describe('UsersController', () => {
  beforeEach(() => {
    mockedUsersService.create.mockReset();
    mockedHash.mockReset();
  });

  it('creates a user with the hashed password and renders it without the password', async () => {
    mockedHash.mockResolvedValueOnce('hashed-password');
    mockedUsersService.create.mockResolvedValueOnce({
      id: '1',
      name: 'Rex',
      email: 'rex@petfinder.com',
      password: 'hashed-password',
      phone: '11912345678',
    });

    const request = {
      body: {
        name: 'Rex',
        email: 'rex@petfinder.com',
        password: 'secret',
        phone: '11912345678',
      },
    } as Request;
    const response = createResponse();

    await UsersController.create(request, response);

    expect(mockedHash).toHaveBeenCalledWith('secret', 8);
    expect(mockedUsersService.create).toHaveBeenCalledWith({
      name: 'Rex',
      email: 'rex@petfinder.com',
      password: 'hashed-password',
      phone: '11912345678',
    });
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith({
      id: '1',
      name: 'Rex',
      email: 'rex@petfinder.com',
      phone: '11912345678',
    });
  });

  it('rejects a request missing required fields', async () => {
    mockedHash.mockResolvedValueOnce('hashed-password');

    const request = {
      body: {
        name: '',
        email: 'rex@petfinder.com',
        password: 'secret',
        phone: '11912345678',
      },
    } as Request;
    const response = createResponse();

    await expect(
      UsersController.create(request, response),
    ).rejects.toBeInstanceOf(ZodError);
    expect(mockedUsersService.create).not.toHaveBeenCalled();
  });
});
