import { NextFunction, Request, Response } from 'express';
import { inject } from 'inversify';
import { BaseController } from '../../base/base.controller';
import { LoggerServiceInterface } from '../../base/logger.service.interface';
import { ValidateMiddleware } from '../../base/validate.middleware';
import { Types } from '../Types';
import { UsersRegisterDto } from './dto/users.register.dto';
import { UsersControllerInterface } from './users.controller.interface';
import { UsersServiceInterface } from './users.service.interface';

export class UsersController extends BaseController implements UsersControllerInterface {
	constructor(
		@inject(Types.UsersService)
		private readonly usersService: UsersServiceInterface,
		@inject(Types.LoggerService) readonly loggerService: LoggerServiceInterface,
	) {
		super(loggerService);

		const registerValidate = new ValidateMiddleware(UsersRegisterDto);

		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				middlewares: [registerValidate.use.bind(registerValidate)],
				func: this.register,
			},
		]);
	}

	async register(req: Request, res: Response, next: NextFunction): Promise<void> {
		res.json(await this.usersService.create({ ...req.body, friends: [] }));
	}
}
