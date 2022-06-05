import { NextFunction, Response, Request } from "express";

export interface ErrorFilterInterface {
	catch: (
		error: HttpError,
		req: Request,
		res: Response,
		next: NextFunction
	) => void;
}

export interface HttpError extends Error {
	statusCode?: number;
}
