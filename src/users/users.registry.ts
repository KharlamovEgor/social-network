import { inject, injectable } from 'inversify';
import { Types } from '../Types';
import { UsersRegistryInterface } from './users.registry.interface';
import { UserModel, User, DbUser } from './user.model';
import { Types as MongooseTypes } from 'mongoose';

@injectable()
export class UsersRegistry implements UsersRegistryInterface {
	constructor(@inject(Types.UserModel) private readonly userModel: typeof UserModel) {}

	async create(user: User): Promise<DbUser> {
		return await this.userModel.create(user);
	}

	async delete(id: MongooseTypes.ObjectId): Promise<void> {
		await this.userModel.findByIdAndDelete(id).exec();
	}

	async findByEmail(email: string): Promise<DbUser | null> {
		return await this.userModel.findOne({ email }).exec();
	}

	async findById(id: MongooseTypes.ObjectId): Promise<DbUser | null> {
		return await this.userModel.findById(id).exec();
	}

	async updateByEmail(email: string, user: Partial<User>): Promise<DbUser | null> {
		return await this.userModel.findOneAndUpdate({ email }, user, { new: true }).exec();
	}
}
