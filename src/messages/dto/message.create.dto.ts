import { IsMongoId, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class MessageCreateDto {
	@IsMongoId()
	from: Types.ObjectId;
	@IsMongoId()
	to: Types.ObjectId;
	@IsString()
	text: string;
}
