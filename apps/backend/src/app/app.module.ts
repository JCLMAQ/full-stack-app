import { MiddlewareConsumer, Module } from '@nestjs/common';

import { PrismaModule } from '@prisma/prisma';
import { ClsModule } from 'nestjs-cls';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthsModule } from '@be/auths';
import { CommonModule, CrudMiddleware } from '@be/common';
import { DbConfigModule } from '@be/db-config';
import { FilesModule } from '@be/files';
// import { IamModule } from '@be/iam';
import { IamModule } from '@be/iam';
import { MailsModule } from '@be/mails';
import { PostsModule } from '@be/posts';
import { TasksModule } from '@be/tasks';
import { TimeUtilModule } from '@be/time-util';
import { TodosModule } from '@be/todos';
import { UsersModule } from '@be/users';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import * as Joi from 'joi';
import { AcceptLanguageResolver, HeaderResolver, I18nJsonLoader, I18nModule, QueryResolver } from 'nestjs-i18n';
import path = require('path');

@Module({
  imports: [ ClsModule.forRoot({
    // Register the ClsModule and automatically mount the ClsMiddleware
    global: true,
    middleware: {
      mount: true,
      setup: (cls, req) => {
        const userId = req.headers['x-user-id'];
        const userRole = req.headers['x-user-role'] ?? 'USER';
        cls.set(
          'user',
          userId ? { id: Number(userId), role: userRole } : undefined,
        );
      },
    },
  }),

  ConfigModule.forRoot({
    // envFilePath: '../.development.env', // Look for .env file in the main directory and not in the backend directory
    envFilePath: '.env', // Look for .env file in the main directory
    isGlobal: true, // No need to import ConfigModule in each module
    expandVariables: true, // Allow expanded variable = ${VARIABLE_NAME}
    cache: true, // To accelarate the env variables loading
    validationSchema: Joi.object({
      // NODE_ENV: Joi.string()
      //   .valid('development', 'production', 'test', 'provision')
      //   .default('development'),
      NEST_SERVER_PORT: Joi.number().default(3000),
      JWT_VALIDITY_DURATION: Joi.string().default('240s'),
      }),
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      fallbacks: {
        'en-CA': 'fr',
        'en-*': 'en',
        'fr-*': 'fr',
        pt: 'pt-BR',
      },
      loader: I18nJsonLoader,
      loaderOptions: {
      path: path.join(__dirname, 'assets/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang', 'locale', 'l'] },
        new HeaderResolver(['x-custom-lang']),
        AcceptLanguageResolver,
      ],
    }),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get<string>('FILES_STORAGE_DEST') || './upload',
        limits: {fileSize: configService.get<number>('FILES_MAX_SIZE') || 2000000}
      }),
      inject: [ConfigService],
    }),
    PrismaModule,
    IamModule,
    AuthsModule,
    DbConfigModule,
    FilesModule,
    TimeUtilModule,
    MailsModule,
    CommonModule,
    UsersModule,
    PostsModule,
    TasksModule,
    TodosModule
],
controllers: [AppController],
providers: [AppService],
})
export class AppModule {
configure(consumer: MiddlewareConsumer) {
  consumer.apply(CrudMiddleware).forRoutes('/zen');
}
}
