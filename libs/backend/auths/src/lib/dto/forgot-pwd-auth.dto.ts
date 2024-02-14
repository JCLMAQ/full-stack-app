import { IsEmail, IsString } from "class-validator";

export class ForgotAuth {
  @IsEmail()
	email: string | undefined;
  @IsString()
  newPassword :string | undefined;
  @IsString()
	verifyPassword : string | undefined
}
