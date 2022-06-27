import { compare } from 'bcrypt';
import { inject, injectable } from 'inversify';
import { sign } from 'jsonwebtoken';
import { EnvServiceInterface } from '../../base/env.service.interface';
import { Types } from '../Types';
import { UsersRegistryInterface } from '../users/users.registry.interface';
import { AuthServiceInterface } from './auth.service.interface';

@injectable()
export class AuthService implements AuthServiceInterface {
	constructor(
		@inject(Types.UsersRegistry) private readonly usersRegistry: UsersRegistryInterface,
		@inject(Types.EnvService) private readonly envService: EnvServiceInterface,
	) {}

	async login(email: string, password: string): Promise<string | null> {
		const user = await this.usersRegistry.findByEmail(email);

		if (!user) {
			return null;
		}

		const isCorrect = !!(await compare(password, user.password));

		if (!isCorrect) {
			return null;
		}

		return sign(
			{
				email,
			},
			this.envService.get('SECRET') || 'secret',
			{
				expiresIn: '1h',
			},
		);
	}
}
