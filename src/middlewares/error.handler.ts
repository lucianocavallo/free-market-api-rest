import { Request, Response, NextFunction } from "express";

function boomErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

function errorHandler(err: any, req: Request, res: Response) {
  console.error("ErrorHandler: ", err);
  if (!err.isBoom) {
    res.status(500).json(err);
  }
}

export { boomErrorHandler, errorHandler };
