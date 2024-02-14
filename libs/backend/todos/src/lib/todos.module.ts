import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@prisma/prisma';
import { TodosController } from './todos.controller';
import { TodosRepository } from './todos.repository';
import { TodosService } from './todos.service';

@Module({
  imports: [
    PrismaModule,
    ConfigModule
  ],
  controllers: [TodosController],
  providers: [
    TodosRepository,
    TodosService
  ],
  exports: [
    TodosService
  ],
})
export class TodosModule {}
