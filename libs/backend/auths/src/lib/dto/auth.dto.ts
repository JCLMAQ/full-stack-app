import { IsEmail, IsString } from "class-validator";
import * as Joi from 'joi';

export class AuthDto {
    @IsEmail()
    email!: string;
    @IsString()
    password!: string;
}

export const signInSchema = Joi.object({
  // Joi Schema according : https://www.notion.so/jclmaq5510/Data-Validation-with-Joi-502789ddb6f349ea9d79d0447899cf3d?pvs=4
  // username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
