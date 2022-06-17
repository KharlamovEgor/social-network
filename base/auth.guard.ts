import {NextFunction, Request, Response} from 'express';
import {AuthGuardInterface} from './auth.guard.middleware';
import {HttpError} from './error.filter.interface';

export class AuthGuard implements AuthGuardInterface {
  check(req: Request, res: Response, next: NextFunction): void {
    if (req.user) {
      return next();
    }

    return next(new HttpError(401, 'unauthorized'));
  }
}
