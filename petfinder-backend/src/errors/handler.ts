import { ErrorRequestHandler } from 'express';
import multer from 'multer';
import { ZodError } from 'zod';

import { Prisma } from '../generated/prisma/client';
import { MAX_PET_IMAGES } from '../config/upload';

interface ValidationErrors {
  [key: string]: string[];
}
const errorHandler: ErrorRequestHandler = (error, request, response, _next) => {
  if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_COUNT') {
    return response.status(400).json({
      error: `Você pode enviar no máximo ${MAX_PET_IMAGES} fotos.`,
    });
  }

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
