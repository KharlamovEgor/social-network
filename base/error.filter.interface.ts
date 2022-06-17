import {NextFunction, Response, Request} from 'express';

export interface ErrorFilterInterface {
  catch: (
    error: HttpError,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => void;
}

export class HttpError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);

    this.statusCode = statusCode;
  }
}
