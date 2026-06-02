import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/app-error';
import { formatZodError } from '../utils/format-zod-error';

export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });

    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: 'Validation Failed',
      errors: formatZodError(err),
    });
  
    return;
  }

  console.error(err);

  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
};
