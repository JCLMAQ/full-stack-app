import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@prisma/prisma';
import { TasksController } from './tasks.controller';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

@Global()
@Module({
  imports: [
    PrismaModule,
    ConfigModule
  ],
  controllers: [TasksController],
  providers: [
    TasksRepository,
    TasksService],
  exports: [TasksService],
})
export class TasksModule {}
