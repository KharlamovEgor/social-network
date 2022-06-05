import { compare, hash } from "bcrypt";
import { inject, injectable } from "inversify";
import { sign } from "jsonwebtoken";
import { EnvServiceInterface } from "../../base/env.service.interface";
import { Types } from "../Types";
import { DbUser, User } from "./user.model";
import { UsersRegistryInterface } from "./users.registry.interface";
import { UsersServiceInterface } from "./users.service.interface";

@injectable()
export class UsersService implements UsersServiceInterface {
	constructor(
		@inject(Types.UsersRegistry)
		private readonly usersRegistry: UsersRegistryInterface,
		@inject(Types.EnvService) private readonly envService: EnvServiceInterface
	) {}

	async create(user: User): Promise<DbUser | null> {
		const isExist = await this.usersRegistry.findByEmail(user.email);

		if (isExist) {
			return null;
		}

		const passHash = await hash(
			user.password,
			Number(this.envService.get("SALT")) || 10
		);

		return await this.usersRegistry.create({ ...user, password: passHash });
	}

	async login(email: string, password: string): Promise<string | null> {
		const user = await this.usersRegistry.findByEmail(email);

		if (!user) {
			return null;
		}

		const isCorrect = await compare(password, user?.password);

		if (!isCorrect) {
			return null;
		}

		return sign(
			{
				email: user.email,
			},
			this.envService.get("JWT_SECRET") || "secret",
			{
				expiresIn: "1h",
			}
		);
	}
}
