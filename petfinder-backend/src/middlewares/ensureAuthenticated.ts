import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayload {
  id: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const { authorization } = request.headers;

  if (!authorization) {
    response
      .status(401)
      .json({ message: 'Invalid Token', error: 'No Authorization Header' });
    return;
  }

  const [, token] = authorization.split(' ');

  try {
    const decoded = jwt.verify(token, authConfig.secret) as TokenPayload;

    request.user = { id: decoded.id };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      response.status(401).json({
        message: 'Session Expired',
        error: error.message,
        tokenExpired: true,
      });
      return;
    }

    if (error instanceof jwt.JsonWebTokenError) {
      response
        .status(401)
        .json({ message: 'Invalid Token', error: error.message });
      return;
    }

    response.status(500).json({
      message: 'Internal server Error',
      error: (error as Error).message,
    });
  }
}
