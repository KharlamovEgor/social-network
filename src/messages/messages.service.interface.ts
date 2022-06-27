import { Types } from 'mongoose';
import { DbMessage, Message } from './message.model';

export interface MessagesServiceInterface {
	create: (message: Message) => Promise<DbMessage | null>;
	read: (from: Types.ObjectId, to: Types.ObjectId) => Promise<DbMessage[] | null>;
	update: (id: Types.ObjectId, text: string) => Promise<DbMessage | null>;
	delete: (id: Types.ObjectId) => Promise<DbMessage | null>;
}
