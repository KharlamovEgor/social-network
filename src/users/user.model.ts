import { Document, model, Schema } from "mongoose";

export interface User {
	name: string;
	email: string;
	password: string;
	age: number;
	avatar: string;
}

export type DbUser = User & Document;

const UserSchema = new Schema<User>({
	name: String,
	email: String,
	password: String,
	age: String,
	avatar: String,
});

export const UserModel = model<User>("user", UserSchema);
