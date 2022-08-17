import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { MiddlewareInterface } from './middleware.interface';

export class AuthMiddleware implements MiddlewareInterface {
	constructor(private readonly secret: string) {}

	async use(req: Request, res: Response, next: NextFunction): Promise<void> {
		if (!req.headers.authorization) {
			return next();
		}

		verify(req.headers.authorization.split(' ')[1], this.secret, (err, payload) => {
			if (err) {
				return next(err);
			}

			req.user = typeof payload == 'string' ? payload : payload?.email;
		});

		next();
	}
}
