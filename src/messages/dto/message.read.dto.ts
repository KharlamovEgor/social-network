import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class MessageReadDto {
	@IsMongoId()
	from: Types.ObjectId;
	@IsMongoId()
	to: Types.ObjectId;
}
