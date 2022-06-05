import { ObjectId } from "mongoose";
import { DbUser, User } from "./user.model";

export interface UsersRegistryInterface {
	create: (user: User) => Promise<DbUser>;
	delete: (id: ObjectId) => Promise<void>;
	findByEmail: (email: string) => Promise<DbUser | null>;
}
