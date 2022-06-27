import { inject, injectable } from 'inversify';
import { Types } from 'mongoose';
import { Types as T } from '../Types';
import { DbMessage, Message, MessageModel } from './message.model';
import { MessagesRegistryInterface } from './messages.registry.interface';

@injectable()
export class MessagesRegistry implements MessagesRegistryInterface {
	constructor(
		@inject(T.MessageModel)
		private readonly messageModel: typeof MessageModel,
	) {}

	async create(message: Message): Promise<DbMessage> {
		return await this.messageModel.create(message);
	}

	async find(from: Types.ObjectId, to: Types.ObjectId): Promise<Array<DbMessage>> {
		return await this.messageModel.find({ from, to }).exec();
	}

	async update(id: Types.ObjectId, text: string): Promise<DbMessage | null> {
		return await this.messageModel.findByIdAndUpdate(id, { text }, { new: true });
	}

	async delete(id: Types.ObjectId): Promise<DbMessage | null> {
		return await this.messageModel.findByIdAndDelete(id).exec();
	}
}
