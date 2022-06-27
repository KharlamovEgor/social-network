import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../../base/base.controller';
import { HttpError } from '../../base/error.filter.interface';
import { LoggerServiceInterface } from '../../base/logger.service.interface';
import { ValidateMiddleware } from '../../base/validate.middleware';
import { Types } from '../Types';
import { AuthControllerInterface } from './auth.controller.interface';
import { AuthServiceInterface } from './auth.service.interface';
import { AuthLoginDto } from './dto/auth.login.dto';

@injectable()
export class AuthController extends BaseController implements AuthControllerInterface {
	constructor(
		@inject(Types.LoggerService) readonly loggerService: LoggerServiceInterface,
		@inject(Types.AuthService) private readonly authService: AuthServiceInterface,
	) {
		super(loggerService);

		const loginValidate = new ValidateMiddleware(AuthLoginDto);

		this.bindRoutes([
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [loginValidate.use.bind(loginValidate)],
			},
		]);
	}

	async login(
		{ body: { email, password } }: Request<{}, {}, AuthLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const token = await this.authService.login(email, password);

		if (!token) {
			return next(new HttpError(401, 'login or password wrong'));
		}

		res.json(token);
	}
}
