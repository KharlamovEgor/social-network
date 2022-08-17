import { injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { Types } from '../src/Types';
import { HttpError, ErrorFilterInterface } from './error.filter.interface';
import { LoggerService } from './logger.service';

@injectable()
export class ErrorFilter implements ErrorFilterInterface {
	constructor(@inject(Types.LoggerService) private loggerService: LoggerService) {}

	catch(error: HttpError | HttpError[], req: Request, res: Response, next: NextFunction) {
		if (Array.isArray(error)) {
			res.json({
				statusCode: 400,
				message: error,
			});
		} else {
			res.json({
				statusCode: error.statusCode || 500,
				message: error.message,
			});

			this.loggerService.error(
				`statusCode: ${error?.statusCode || 500}, message: ${error.message}`,
			);
		}
	}
}
