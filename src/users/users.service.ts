import { compare, hash } from 'bcrypt';
import { inject, injectable } from 'inversify';
import { sign } from 'jsonwebtoken';
import { EnvServiceInterface } from '../../base/env.service.interface';
import { Types } from '../Types';
import { DbUser, User } from './user.model';
import { UsersRegistryInterface } from './users.registry.interface';
import { UsersServiceInterface } from './users.service.interface';

@injectable()
export class UsersService implements UsersServiceInterface {
	constructor(
		@inject(Types.UsersRegistry)
		private readonly usersRegistry: UsersRegistryInterface,
		@inject(Types.EnvService) private readonly envService: EnvServiceInterface,
	) {}

	async create(user: User): Promise<DbUser | null> {
		const isExist = await this.usersRegistry.findByEmail(user.email);

		if (isExist) {
			return null;
		}

		const passHash = await hash(user.password, Number(this.envService.get('SALT')) || 10);

		return await this.usersRegistry.create({
			...user,
			password: passHash,
			avatar: 'default.png',
		});
	}

	async update(email: string, user: Partial<User>): Promise<DbUser | null> {
		if (user.password) {
			return await this.usersRegistry.updateByEmail(email, {
				...user,
				password: await hash(user.password, this.envService.get('SECRET') || 'secret'),
			});
		} else {
			return await this.usersRegistry.updateByEmail(email, { ...user });
		}
	}
}
