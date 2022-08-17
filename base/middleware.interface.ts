import { NextFunction, Request, Response } from 'express';

export interface MiddlewareInterface {
	use: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
