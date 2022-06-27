import {Document, model, Schema, Types} from 'mongoose';

export interface User {
  name: string;
  email: string;
  password: string;
  age: number;
  avatar: string;
  friends: Types.DocumentArray<string>;
}

export type DbUser = User & Document;

const UserSchema = new Schema<User>({
  name: String,
  email: String,
  password: String,
  age: String,
  avatar: String,
  friends: [String],
});

export const UserModel = model<User>('user', UserSchema);
