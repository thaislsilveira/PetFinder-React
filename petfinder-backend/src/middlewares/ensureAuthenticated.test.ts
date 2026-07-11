import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import authConfig from '../config/auth';
import ensureAuthenticated from './ensureAuthenticated';

function createResponse() {
  const response = {} as Response;
  response.status = vi.fn().mockReturnValue(response);
  response.json = vi.fn().mockReturnValue(response);
  return response;
}

describe('ensureAuthenticated', () => {
  const next = vi.fn();

  beforeEach(() => {
    next.mockReset();
  });

  it('rejects requests without an authorization header', () => {
    const request = { headers: {} } as Request;
    const response = createResponse();

    ensureAuthenticated(request, response, next);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.json).toHaveBeenCalledWith({
      message: 'Invalid Token',
      error: 'No Authorization Header',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('calls next and sets request.user for a valid token', () => {
    const token = jwt.sign({ id: '1' }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });
    const request = {
      headers: { authorization: `Bearer ${token}` },
    } as Request;
    const response = createResponse();

    ensureAuthenticated(request, response, next);

    expect(request.user).toEqual({ id: '1' });
    expect(next).toHaveBeenCalledOnce();
  });

  it('rejects an expired token', () => {
    const token = jwt.sign({ id: '1' }, authConfig.secret, {
      expiresIn: '-1s',
    });
    const request = {
      headers: { authorization: `Bearer ${token}` },
    } as Request;
    const response = createResponse();

    ensureAuthenticated(request, response, next);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Session Expired',
        tokenExpired: true,
      }),
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('rejects a malformed token', () => {
    const request = {
      headers: { authorization: 'Bearer not-a-real-token' },
    } as Request;
    const response = createResponse();

    ensureAuthenticated(request, response, next);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Invalid Token' }),
    );
    expect(next).not.toHaveBeenCalled();
  });
});
