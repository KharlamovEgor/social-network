import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Types } from '../Types';
import { AuthGuard } from '../../base/auth.guard';
import { BaseController } from '../../base/base.controller';
import { ImagesControllerInterface } from './images.controller.interface';
import { ImagesServiceInterface } from './images.service.interface';
import { HttpError } from '../../base/error.filter.interface';
import { UsersServiceInterface } from '../users/users.service.interface';
import { LoggerServiceInterface } from '../../base/logger.service.interface';

@injectable()
export class ImagesController extends BaseController implements ImagesControllerInterface {
	constructor(
		@inject(Types.ImagesService)
		private readonly imagesService: ImagesServiceInterface,
		@inject(Types.UsersService)
		private readonly usersService: UsersServiceInterface,
		@inject(Types.LoggerService) readonly loggerService: LoggerServiceInterface,
	) {
		super(loggerService);

		const authGuard = new AuthGuard();

		this.bindRoutes([
			{
				path: '/load',
				method: 'post',
				func: this.load,
				middlewares: [authGuard.check.bind(authGuard)],
			},
		]);
	}

	async load(req: Request, res: Response, next: NextFunction): Promise<void> {
		const imageName = `${req.user}.${req.headers['content-type']?.split('/')[1] || 'jpg'}`;

		const result = await this.imagesService.load(req.body, imageName);

		if (result) {
			await this.usersService.update(req.user!, { avatar: imageName });
			return void res.send('done!');
		}

		return next(new HttpError(500, "image didn't load"));
	}
}
