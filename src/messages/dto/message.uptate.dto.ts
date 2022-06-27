import { IsMongoId, IsString, Length } from 'class-validator';
import { Types } from 'mongoose';

export class MessageUpdateDto {
	@IsMongoId()
	id: Types.ObjectId;
	@IsString()
	@Length(1)
	text: string;
}
