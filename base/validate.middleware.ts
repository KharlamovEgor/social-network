import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { MiddlewareInterface } from './middleware.interface';

export class ValidateMiddleware implements MiddlewareInterface {
	constructor(private readonly classToValidate: ClassConstructor<object>) {}

	async use(req: Request, res: Response, next: NextFunction): Promise<void> {
		const data = plainToClass(this.classToValidate, req.body);

		await validate(data).then((errors) => {
			if (errors.length > 0) {
				return next(errors);
			}

			next();
		});
	}
}
