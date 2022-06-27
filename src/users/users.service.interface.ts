import { DbUser, User } from './user.model';

export interface UsersServiceInterface {
	create: (user: User) => Promise<DbUser | null>;
	update: (email: string, user: Partial<User>) => Promise<DbUser | null>;
}
