import { Public } from '@be/common';
import { Auth, AuthType } from '@be/iam';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Prisma, Todo } from '@prisma/client';
import { TodosService } from './todos.service';

@Controller()
export class TodosController {
  constructor(private todosService: TodosService) {}

    @Public()
    @Auth(AuthType.None)
    @Get('todos')
    async getUserTodos(@Body() data:  {
      orgId?: string;
      ownerId?: string;
      withTasks?: string;
      withUsers?: string;
    }): Promise<Todo[]| unknown>{
      try {
        const todos: Todo[] = await this.todosService.getTodos( data )
        return todos
      }
      catch (error) {
        return {
            answer: "bad news...",
            success: false,
            message: `${error}`
        }
      }
    }

    @Public()
    @Auth(AuthType.None)
    @Get('todo/:id')
    async getOneTodo(@Param('id') todoId: string, @Body() data:  {
      withTasks: string;
      withSubTodos: string;
      withUsers: string;
    }): Promise<Todo | unknown>{
      try {
        return await this.todosService.getOneTodo(todoId, data )
      } catch (error) {
        return {
            answer: "bad news...",
            success: false,
            message: `${error}`
        }
      }
    }

    @Auth(AuthType.None)
    @Post(`createtodo`)
    async createOneTodo(@Body() data: {
      title: string;
      content: string;
      comment: string;
      userId: string;
      orgId: string;
      mainTodoId: string;
    }) {
      const { title , content, comment, userId, orgId, mainTodoId} = data;
      try {
        return await this.todosService.createOneTodo({
          comment,
          content,
          title,
          userId,
          orgId,
          mainTodoId
        });
      } catch (error) {
        return {
          answer: "bad news...",
          success: false,
          message: `${error}`
        }
      }
    }

    @Public()
    @Auth(AuthType.None)
    @Put('updatetodo/:id')
    async updateTodo(
      @Param('id') id: string,
      @Body() data: Prisma.TodoUpdateInput): Promise<Todo | unknown>{
        try {
          return await this.todosService.updateTodo({
            where: { id: String(id) },
            data:  data ,
            } )
        } catch (error) {
          return {
            answer: "bad news...",
            success: false,
            message: `${error}`
          }
        }

    }

    @Public()
    @Auth(AuthType.None)
    @Delete('deletetodo/:id')
    async deleteTodo(
      @Param('id') id: string,
      ): Promise<Todo | unknown>{
        try {
          return await this.todosService.deleteTodo({ id: String(id) } )
        } catch (error) {
          return {
            answer: "bad news...",
            success: false,
            message: `${error}`
          }
        }

    }

    // For tests
    @Public()
    @Auth(AuthType.None)
    @Get('alltodos')
    async getAllTodos(): Promise<Todo[]>{
      return await this.todosService.getAllTodos()
    }

    @Public()
    @Auth(AuthType.None)
    @Get('todoswithtasks')
    async getAllTodosWithTasks(): Promise<Todo[]>{
      return await this.todosService.getAllTodosWithTasks()
    }

}
