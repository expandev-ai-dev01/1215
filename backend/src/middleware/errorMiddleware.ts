import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export interface ApiError extends Error {
  statusCode?: number;
  code?: string;
  details?: any;
}

export function errorMiddleware(
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (error instanceof ZodError) {
    res.status(422).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: error.errors,
      },
      timestamp: new Date().toISOString(),
    });
    return;
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal server error';
  const code = error.code || 'INTERNAL_ERROR';

  res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
      details: error.details,
    },
    timestamp: new Date().toISOString(),
  });
}
