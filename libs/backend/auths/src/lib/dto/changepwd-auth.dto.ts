import { IsEmail, IsString } from "class-validator";

export class ChangePwdDto {
  @IsEmail()
	email: string | undefined;
  @IsString()
  oldPassword: string | undefined;
  @IsString()
  newPassword : string | undefined;
  @IsString()
	verifyPassword : string | undefined
}
