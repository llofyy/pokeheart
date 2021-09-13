import type {
  Request, Response, NextFunction,
} from 'express';

// eslint-disable-next-line no-unused-vars
function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof Error) {
    return res.status(400).json({ error: err.message });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
}

export default errorMiddleware;
