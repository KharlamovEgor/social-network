import { Router } from 'express';
import { routeHandler } from '../../base/base.controller.interface';

export interface MessagesControllerInterface {
	router: Router;
	create: routeHandler;
	read: routeHandler;
	update: routeHandler;
	delete: routeHandler;
}
