import { Types } from 'mongoose';
import { Message, DbMessage } from './message.model';

export interface MessagesRegistryInterface {
	create: (message: Message) => Promise<DbMessage>;
	find: (from: Types.ObjectId, to: Types.ObjectId) => Promise<Array<DbMessage>>;
	update: (id: Types.ObjectId, text: string) => Promise<DbMessage | null>;
	delete: (id: Types.ObjectId) => Promise<DbMessage | null>;
}
