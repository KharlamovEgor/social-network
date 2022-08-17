import { IsEmail, IsNumber, IsString, Length } from 'class-validator';

export class UsersRegisterDto {
	@IsEmail()
	email: string;

	@IsString()
	name: string;

	@Length(8)
	password: string;

	@IsNumber()
	age: number;
}
