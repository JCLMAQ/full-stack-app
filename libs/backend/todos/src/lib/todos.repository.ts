import { Injectable } from '@nestjs/common';
import { Prisma, Todo } from '@prisma/client';
import { PrismaService } from '@prisma/prisma';

/* Based on: https://www.tomray.dev/nestjs-prisma#seeding-data-with-prisma-studio
We use the Repository design pattern - repository is a layer to encapsulate the logic required to access the database.
It's also called a DAL (data access layer).
*/
@Injectable()
export class TodosRepository {

  constructor(
    private prisma: PrismaService,
  ) {}

  async createOneTodo(params: { data: Prisma.TodoCreateInput }): Promise<Todo> {
    const { data } = params;
    return this.prisma.todo.create({ data });
  }

  async getTodos(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TodoWhereUniqueInput;
    orderBy?: Prisma.TodoOrderByWithRelationInput;
    include?: Prisma.TodoInclude;
    where?: Prisma.TodoWhereInput
  }): Promise<Todo[]> {
    console.log("repository params: ", params)
    return this.prisma.todo.findMany({...params});
  }

  async getOneTodo(params: {
    include?:Prisma.TodoInclude;
    where: Prisma.TodoWhereUniqueInput
  }): Promise<Todo | null > {
    return this.prisma.todo.findUnique({ ...params } )
  }

  async updateTodo(params: { // and soft delete
    where: Prisma.TodoWhereUniqueInput;
    data: Prisma.TodoUpdateInput;
  }): Promise<Todo> {
    const { where, data } = params;
      return this.prisma.todo.update({ where, data });
  }

  async softDeleteTodo(params: { // and soft delete
    where: Prisma.TodoWhereUniqueInput;
  }): Promise<Todo> {
    const { where } = params;
    const data = {
      isDeletedDT: new(Date),
      isDeleted: Number(1)
    };
    return this.prisma.todo.update({ data, where });
  }

  async deleteTodo(
    where: Prisma.TodoWhereUniqueInput
): Promise<Todo> {
    return this.prisma.todo.delete({ where });
  }


  // For test purpose
  async getAllTodos(): Promise<Todo[]> {
    return this.prisma.todo.findMany()
  }

  async getAllTodosWithTasks(): Promise<Todo[]> {
    return this.prisma.todo.findMany({
      include: {
        Tasks: true
      }
    })
  }

}
