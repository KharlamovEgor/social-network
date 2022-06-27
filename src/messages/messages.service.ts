import { inject, injectable } from 'inversify';
import { Types } from '../Types';
import { UsersRegistryInterface } from '../users/users.registry.interface';
import { DbMessage, Message } from './message.model';
import { MessagesRegistryInterface } from './messages.registry.interface';
import { MessagesServiceInterface } from './messages.service.interface';
import { Types as MongooseTypes } from 'mongoose';

@injectable()
export class MessagesService implements MessagesServiceInterface {
	constructor(
		@inject(Types.MessageRegistry) private readonly messagesRegistry: MessagesRegistryInterface,
		@inject(Types.UsersRegistry) private readonly usersRegistry: UsersRegistryInterface,
	) {}

	async create(message: Message): Promise<DbMessage | null> {
		const from = await this.usersRegistry.findById(message.from);
		const to = await this.usersRegistry.findById(message.to);

		if (!(to && from)) {
			return null;
		}

		return await this.messagesRegistry.create(message);
	}
	async read(
		from: MongooseTypes.ObjectId,
		to: MongooseTypes.ObjectId,
	): Promise<DbMessage[] | null> {
		const userFrom = await this.usersRegistry.findById(from);
		const userTo = await this.usersRegistry.findById(to);

		if (!(to && from)) {
			return null;
		}

		return await this.messagesRegistry.find(from, to);
	}
	async update(id: MongooseTypes.ObjectId, text: string): Promise<DbMessage | null> {
		return await this.messagesRegistry.update(id, text);
	}
	async delete(id: MongooseTypes.ObjectId): Promise<DbMessage | null> {
		return await this.messagesRegistry.delete(id);
	}
}
