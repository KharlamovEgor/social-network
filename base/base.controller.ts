import { Router } from 'express';
import { injectable } from 'inversify';
import { BaseControllerInterface, RouteInfo } from './base.controller.interface';
import { LoggerServiceInterface } from './logger.service.interface';

@injectable()
export abstract class BaseController implements BaseControllerInterface {
	router: Router;
	readonly loggerService: LoggerServiceInterface;

	constructor(loggerService: LoggerServiceInterface) {
		this.router = Router();
		this.loggerService = loggerService;
	}

	public bindRoutes(routes: RouteInfo[]) {
		routes.forEach(({ method, func, middlewares = [], path }) => {
			const pipe = middlewares.concat(func.bind(this));
			this.router[method](path, pipe);
			this.loggerService.info(`${method} - ${path}`);
		});
	}
}
