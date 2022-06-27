import { Document, model, Schema, Types } from 'mongoose';

export interface Message {
	from: Types.ObjectId;
	to: Types.ObjectId;
	date: number;
	text: string;
}

export type DbMessage = Message & Document;

const MessageSchema = new Schema<Message>({
	from: Types.ObjectId,
	to: Types.ObjectId,
	date: Number,
	text: String,
});

export const MessageModel = model<Message>('message', MessageSchema);
