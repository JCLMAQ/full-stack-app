import { Injectable } from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { PrismaService } from '@prisma/prisma';

/* Based on: https://www.tomray.dev/nestjs-prisma#seeding-data-with-prisma-studio
We use the Repository design pattern - repository is a layer to encapsulate the logic required to access the database.
It's also called a DAL (data access layer).
*/
@Injectable()
export class TasksRepository {

  constructor(
    private prisma: PrismaService,
  ) {}

  async createOneTask(params: { data: Prisma.TaskCreateInput }): Promise<Task> {
    const { data } = params;
    return this.prisma.task.create({ data });
  }

  async getTasks(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TaskWhereUniqueInput;
    orderBy?: Prisma.TaskOrderByWithRelationInput;
    include?: Prisma.TaskInclude;
    where?: Prisma.TaskWhereInput
  }): Promise<Task[]> {
    console.log("repository params: ", params)
    return this.prisma.task.findMany({...params});
  }

  async getOneTask(params: {
    include?:Prisma.TaskInclude;
    where: Prisma.TaskWhereUniqueInput
  }): Promise<Task | null > {
    return this.prisma.task.findUnique({ ...params } )
  }

  async updateTask(params: { // and soft delete
    where: Prisma.TaskWhereUniqueInput;
    data: Prisma.TaskUpdateInput;
  }): Promise<Task> {
    const { where, data } = params;
      return this.prisma.task.update({ where, data });
  }

  async softDeleteTask(params: { // and soft delete
    where: Prisma.TaskWhereUniqueInput;
  }): Promise<Task> {
    const { where } = params;
    const data = {
      isDeletedDT: new(Date),
      isDeleted: Number(1)
    };
    return this.prisma.task.update({ data, where });
  }

  async deleteTask(
    where: Prisma.TaskWhereUniqueInput
): Promise<Task> {
    return this.prisma.task.delete({ where });
  }


  // For test purpose
  async getAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany()
  }

  async getAllTasksWithTasks(): Promise<Task[]> {
    return this.prisma.task.findMany({
      include: {
        Users: true,
        SubTasks: true
      }
    })
  }

}
