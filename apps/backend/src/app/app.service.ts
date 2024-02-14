import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class AppService {
  constructor(
    // Inject ClsService to be able to retrieve data from the cls context.
    private readonly cls: ClsService) {}

  sayHello() {
    //NestJS Cls
    // Here we can extract the value of 'ip' that was
    // put into the cls context in the interceptor.
    const userIp = this.cls.get('ip');
    return 'Hello ' + userIp + '!';
}

getData() {
  const userIp = this.cls.get('ip');
  return 'Welcome to backend!'+ userIp + ' ! ';
}
  // getData(): { message: string } {
  //   const userIp = this.cls.get('ip');
  //   return { message: 'Welcome to backend!'+ userIp + ' ! ' };
  // }
}
