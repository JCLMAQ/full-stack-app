

import { Gender, Language, Prisma, Role } from "@prisma/client";
import { IsOptional, IsString } from "class-validator";
import * as Joi from 'joi';

import { IsJsonObject } from "@be/common";
import { AuthDto } from "./auth.dto";



export class RegisterAuthDto extends (AuthDto) {
  @IsString()
  verifyPassword: string | undefined;
  @IsString()
  lastName: string | undefined;
  @IsString()
  firstName: string | undefined;
  @IsString()
  nickName: string | undefined;
  @IsString()
  Gender: Gender | undefined;
  @IsJsonObject()
  @IsOptional()
  social?: Prisma.InputJsonValue;
  @IsString()
  Language: Language | undefined;
  @IsString()
  Roles: Role[] | undefined;
  dob?: Date;
}

// Joi Schema according : https://www.notion.so/jclmaq5510/Data-Validation-with-Joi-502789ddb6f349ea9d79d0447899cf3d?pvs=4
export const registerSchema = Joi.object({
  // username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2}).required(),
  password: Joi.string().min(6).required(),
  verifyPassword: Joi.ref('password'),
  lastName:Joi.string().alphanum().min(3).max(30),
  firstName:Joi.string().alphanum().min(3).max(30),
  nickName:Joi.string().alphanum().min(3).max(10),
  Gender: Gender ,
  social: Joi.object({}).optional(),
  Language: Language,
  Roles: Role,
  dob: Date
});


