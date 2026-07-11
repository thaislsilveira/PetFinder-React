import { Request, Response } from 'express';

import SessionService from '../services/SessionService';
import SessionController from './SessionController';

vi.mock('../services/SessionService', () => ({
  default: { authenticate: vi.fn() },
}));

const mockedSessionService = SessionService as unknown as {
  authenticate: ReturnType<typeof vi.fn>;
};

function createResponse() {
  const response = {} as Response;
  response.status = vi.fn().mockReturnValue(response);
  response.json = vi.fn().mockReturnValue(response);
  return response;
}

describe('SessionController', () => {
  beforeEach(() => {
    mockedSessionService.authenticate.mockReset();
  });

  it('rejects a request with an invalid body before authenticating', async () => {
    const request = {
      body: { email: 'not-an-email', password: '' },
    } as Request;
    const response = createResponse();

    await SessionController.store(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      error: 'Validation fails',
    });
    expect(mockedSessionService.authenticate).not.toHaveBeenCalled();
  });

  it('returns 401 when the user is not found', async () => {
    mockedSessionService.authenticate.mockResolvedValueOnce({
      error: 'user_not_found',
    });

    const request = {
      body: { email: 'missing@petfinder.com', password: 'secret' },
    } as Request;
    const response = createResponse();

    await SessionController.store(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.json).toHaveBeenCalledWith({ error: 'User not found' });
  });

  it('returns 403 when the password is incorrect', async () => {
    mockedSessionService.authenticate.mockResolvedValueOnce({
      error: 'invalid_password',
    });

    const request = {
      body: { email: 'rex@petfinder.com', password: 'wrong' },
    } as Request;
    const response = createResponse();

    await SessionController.store(request, response);

    expect(response.status).toHaveBeenCalledWith(403);
    expect(response.json).toHaveBeenCalledWith({
      error: 'Incorrect email/password combination.',
    });
  });

  it('returns the authenticated user and token on success', async () => {
    const result = {
      user: { id: '1', name: 'Rex', email: 'rex@petfinder.com' },
      token: 'signed-token',
    };
    mockedSessionService.authenticate.mockResolvedValueOnce(result);

    const request = {
      body: { email: 'rex@petfinder.com', password: 'secret' },
    } as Request;
    const response = createResponse();

    await SessionController.store(request, response);

    expect(mockedSessionService.authenticate).toHaveBeenCalledWith(
      'rex@petfinder.com',
      'secret',
    );
    expect(response.json).toHaveBeenCalledWith(result);
    expect(response.status).not.toHaveBeenCalled();
  });
});
