import { Types } from 'mongoose';
import { DbUser, User } from './user.model';

export interface UsersRegistryInterface {
	create: (user: User) => Promise<DbUser>;
	delete: (id: Types.ObjectId) => Promise<void>;
	findByEmail: (email: string) => Promise<DbUser | null>;
	updateByEmail: (email: string, user: Partial<User>) => Promise<DbUser | null>;
	findById: (id: Types.ObjectId) => Promise<DbUser | null>;
}
