import express, { Express, json, raw, Request, Response, static as st } from 'express';
import { inject, injectable } from 'inversify';
import { UsersControllerInterface } from './users/users.controller.interface';
import { Types } from './Types';
import { EnvServiceInterface } from '../base/env.service.interface';
import { LoggerServiceInterface } from '../base/logger.service.interface';
import { ErrorFilterInterface } from '../base/error.filter.interface';
import { DbServiceInterface } from './db.service.interface';
import { ImagesControllerInterface } from './images/images.controller.interface';
import { join } from 'path';
import { AuthMiddleware } from '../base/auth.middleware';
import { AuthControllerInterface } from './auth/auth.controller.interface';
import { MessagesControllerInterface } from './messages/messages.controller.interface';

@injectable()
export class App {
	private server: Express;
	private port: number;

	constructor(
		@inject(Types.DbService) private readonly dbService: DbServiceInterface,
		@inject(Types.UsersController)
		private usersController: UsersControllerInterface,
		@inject(Types.EnvService) private envService: EnvServiceInterface,
		@inject(Types.LoggerService) private loggerService: LoggerServiceInterface,
		@inject(Types.ErrorFilter) private errorFilter: ErrorFilterInterface,
		@inject(Types.ImagesController)
		private imagesController: ImagesControllerInterface,
		@inject(Types.AuthController) private readonly authController: AuthControllerInterface,
		@inject(Types.MessagesController)
		private readonly messagesController: MessagesControllerInterface,
	) {
		this.server = express();
		this.port = Number(this.envService.get('PORT')) || 3000;
	}

	use() {
		const authMiddleware = new AuthMiddleware(this.envService.get('SECRET') || 'secret');

		this.server.use(json());
		this.server.use(
			raw({
				type: ['image/png', 'image/jpeg'],
				limit: '100mb',
			}),
		);
		this.server.use('/static', st(join(process.cwd(), 'images')));
		this.server.use(authMiddleware.use.bind(authMiddleware));
	}

	useRoutes() {
		this.server.use('/users', this.usersController.router);
		this.server.use('/images', this.imagesController.router);
		this.server.use('/auth', this.authController.router);
		this.server.use('/messages', this.messagesController.router);
	}

	useFilters() {
		this.server.use(this.errorFilter.catch.bind(this.errorFilter));
	}

	async init() {
		this.use();
		await this.dbService.connect();
		this.useRoutes();
		this.useFilters();
		this.server.listen(this.port, () =>
			this.loggerService.info(`server working on port ${this.port}`),
		);
	}
}
