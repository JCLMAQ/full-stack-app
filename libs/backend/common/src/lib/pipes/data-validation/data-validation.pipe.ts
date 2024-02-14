// validation.pipe.ts base on : https://www.notion.so/jclmaq5510/Data-Validation-with-Joi-502789ddb6f349ea9d79d0447899cf3d?pvs=4

import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import * as Joi from 'joi';


export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: Joi.ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value, { abortEarly: false });

    if (error) {
      throw new BadRequestException('Validation failed', error.message);
    }

    return value;
  }
}

/*
**** example: registration.dto.ts
import * as Joi from 'joi';

export const registrationSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
*/

/*
**** Example of implementation :
import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { registrationSchema } from './registration.dto';
import { JoiValidationPipe } from './validation.pipe';

@Controller('auth')
export class AuthController {
  @Post('register')
  @UsePipes(new JoiValidationPipe(registrationSchema))
  async register(@Body() body: any) {
    // If the data passes validation, it will reach this point
    return 'Registration successful';
  }
}

*/
