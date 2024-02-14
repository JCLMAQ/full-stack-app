import { IsEmail } from "class-validator";

export class ForgotEmailAuthDto {
  @IsEmail()
	email!: string;
}
