import { Request, Response } from 'express';
import { z, ZodError } from 'zod';

import { Prisma } from '../generated/prisma/client';
import errorHandler from './handler';

function createResponse() {
  const response = {} as Response;
  response.status = vi.fn().mockReturnValue(response);
  response.json = vi.fn().mockReturnValue(response);
  return response;
}

describe('errorHandler', () => {
  const request = {} as Request;
  const next = vi.fn();

  it('formats zod validation errors', () => {
    const response = createResponse();

    const schema = z.object({ name: z.string().min(1, 'Nome é obrigatório') });
    const result = schema.safeParse({ name: '' });
    const error = result.error as ZodError;

    errorHandler(error, request, response, next);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      message: 'Validation fails',
      errors: { name: ['Nome é obrigatório'] },
    });
  });

  it('returns 404 when a prisma "record not found" error is thrown', () => {
    const response = createResponse();

    const error = new Prisma.PrismaClientKnownRequestError('Not found', {
      code: 'P2025',
      clientVersion: '7.8.0',
    });

    errorHandler(error, request, response, next);

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.json).toHaveBeenCalledWith({ message: 'Not found' });
  });

  it('returns 500 for unexpected errors', () => {
    const response = createResponse();
    vi.spyOn(console, 'error').mockImplementation(() => {});

    errorHandler(new Error('boom'), request, response, next);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({
      message: 'Internal server error',
    });

    vi.restoreAllMocks();
  });
});
