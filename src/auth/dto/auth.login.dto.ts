import { IsEmail, Length } from 'class-validator';

export class AuthLoginDto {
	@IsEmail()
	email: string;

	@Length(8)
	password: string;
}
