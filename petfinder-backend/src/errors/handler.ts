import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

import { Prisma } from '../generated/prisma/client';

interface ValidationErrors {
  [key: string]: string[];
}
const errorHandler: ErrorRequestHandler = (error, request, response, _next) => {
  if (error instanceof ZodError) {
    const errors: ValidationErrors = {};

    error.issues.forEach(issue => {
      errors[issue.path.join('.')] = [issue.message];
    });

    return response.status(400).json({ message: 'Validation fails', errors });
  }

  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2025'
  ) {
    return response.status(404).json({ message: 'Not found' });
  }

  console.error(error);

  return response.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;
