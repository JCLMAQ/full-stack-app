import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@prisma/prisma';
import { PostsController } from './posts.controller';
import { PostsRepository } from './posts.repository';
import { PostsService } from './posts.service';

@Module({
  imports: [
    PrismaModule,
    ConfigModule
  ],
  controllers: [PostsController],
  providers: [
    PostsService,
    PostsRepository
  ],
  exports: [PostsService],
})
export class PostsModule {}
