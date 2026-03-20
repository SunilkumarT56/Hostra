import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(`Error: ${err.message}`);
  
  const status = (err as any).status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    error: {
      message,
      name: err.name,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
};
