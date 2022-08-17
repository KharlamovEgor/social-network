import { NextFunction, Request, Response } from 'express';
import { AuthGuardInterface } from './auth.guard.middleware';
import { HttpError } from './error.filter.interface';

export class AuthGuard implements AuthGuardInterface {
	async check(req: Request, res: Response, next: NextFunction): Promise<void> {
		if (req.user) {
			return next();
		}

		return next(new HttpError(401, 'unauthorized'));
	}
}
