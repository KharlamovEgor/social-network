import mongoose from 'mongoose';

export interface DbServiceInterface {
	db: typeof mongoose;
	connect: () => Promise<void>;
	disconnect: () => Promise<void>;
}
