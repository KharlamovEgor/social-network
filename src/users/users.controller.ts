import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { BaseController } from "../../base/base.controller";
import { ValidateMiddleware } from "../../base/validate.middleware";
import { Types } from "../Types";
import { UsersLoginDto } from "./dto/users.login.dto";
import { UsersRegisterDto } from "./dto/users.register.dto";
import { UsersControllerInterface } from "./users.controller.interface";
import { UsersServiceInterface } from "./users.service.interface";

export class UsersController
	extends BaseController
	implements UsersControllerInterface
{
	constructor(
		@inject(Types.UsersService)
		private readonly usersService: UsersServiceInterface
	) {
		super();

		const loginValidate = new ValidateMiddleware(UsersLoginDto);
		const registerValidate = new ValidateMiddleware(UsersRegisterDto);

		this.bindRoutes([
			{
				path: "/register",
				method: "post",
				middlewares: [registerValidate.use.bind(registerValidate)],
				func: this.register,
			},
			{
				path: "/login",
				method: "post",
				middlewares: [loginValidate.use.bind(loginValidate)],
				func: this.login,
			},
			{
				path: "/test",
				method: "post",
				func: this.test,
			},
		]);
	}

	async register(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		res.json(await this.usersService.create(req.body));
	}

	async login(req: Request, res: Response, next: NextFunction): Promise<void> {
		res.json(await this.usersService.login(req.body.email, req.body.password));
	}

	async test(req: Request, res: Response, next: NextFunction) {
		res.json(req?.user);
	}
}
