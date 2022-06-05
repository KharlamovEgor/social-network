import { NextFunction, Router, Request, Response } from "express";

export interface BaseControllerInterface {
	router: Router;
	bindRoutes: (routes: RouteInfo[]) => void;
}

export interface RouteInfo {
	method: "get" | "post" | "delete" | "put" | "patch";
	func: routeHandler;
	middlewares?: routeHandler[];
	path: string;
}

export type routeHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => Promise<void>;
