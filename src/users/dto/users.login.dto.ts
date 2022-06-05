import { IsEmail, IsNumber, IsString, Length } from "class-validator";

export class UsersLoginDto {
	@IsEmail()
	email: string;

	@Length(8)
	password: string;
}
