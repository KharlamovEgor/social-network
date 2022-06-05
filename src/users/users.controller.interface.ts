import { Router } from "express";
import { routeHandler } from "../../base/base.controller.interface";

export interface UsersControllerInterface {
	router: Router;
	register: routeHandler;
	login: routeHandler;
	test: routeHandler;
}
