import { DbUser, User } from "./user.model";

export interface UsersServiceInterface {
	create: (user: User) => Promise<DbUser | null>;
	login: (email: string, password: string) => Promise<string | null>;
}
