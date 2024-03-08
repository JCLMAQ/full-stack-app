import { Controller, Get } from '@nestjs/common';

import { Public } from '@be/common';
import { Auth, AuthType } from '@be/iam';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

   /*
  @Public() // from module iam
  @Auth(AuthType.None)
  */
  @Auth(AuthType.None)
  @Get()
  getData() {
    return this.appService.getData();
  }

  @Public()
  @Auth(AuthType.None)
  @Get('/hello')
  hello() {
      return this.appService.sayHello();
  }
}
