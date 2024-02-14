/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaService } from '@prisma/prisma';
import { ClsMiddleware } from 'nestjs-cls';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

/* Nestjs has a built-in validation pipe: The ValidationPipe provides a convenient approach
    to enforce validation rules for all incoming client payloads,
    where the validation rules are declared with decorators from the class-validator package.
 */
    app.useGlobalPipes(new ValidationPipe({  // see https://www.notion.so/jclmaq5510/Validation-and-Transformation-9a2da8a694004fc8a0f2e64445ae3892
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }));

    /* NestJS has a built-in ClassSerializerInterceptor that can be used to transform objects.
      You will use this interceptor to remove the password field from the response object.
      The ClassSerializerInterceptor uses the class-transformer package to define how to transform objects.
      Use the @Exclude() decorator to exclude the password field in the UserEntity class
    */
   app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector))
    );

    const globalPrefix = process.env.NEST_SERVER_GLOBAL_PREFIX ||'api';
    app.setGlobalPrefix(globalPrefix);

    // NestJS CLS - create and mount the middleware manually here
    app.use(
      new ClsMiddleware({
          /* useEnterWith: true */
      }).use,
  );

  const port = process.env.NEST_SERVER_PORT || 3333;
  // Swagger config
  const config = new DocumentBuilder()
  .setTitle(process.env.SET_APP_TITLE)
  .setDescription(process.env.SET_APP_DESCRIPTION)
  .setVersion(process.env.SET_APP_VERSION)
  .addTag(process.env.SET_APP_ADDTAG)
  .build();

/*
  Bug avec circular dependency for Roles....
  */
  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: false
  });

  SwaggerModule.setup('/api/doc', app, document);


  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
