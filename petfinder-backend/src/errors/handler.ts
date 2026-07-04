import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

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

  console.error(error);

  return response.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;
