import { Router } from "express";
import { injectable } from "inversify";
import {
	BaseControllerInterface,
	RouteInfo,
} from "./base.controller.interface";

@injectable()
export abstract class BaseController implements BaseControllerInterface {
	router: Router;

	constructor() {
		this.router = Router();
	}

	public bindRoutes(routes: RouteInfo[]) {
		routes.forEach(({ method, func, middlewares = [], path }) => {
			const pipe = middlewares.concat(func.bind(this));
			this.router[method](path, pipe);
			console.log(`${method} - ${path}`);
		});
	}
}
