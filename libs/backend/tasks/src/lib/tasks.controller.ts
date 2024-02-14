import { Public } from '@be/common';
import { Auth, AuthType } from '@be/iam';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { TasksService } from './tasks.service';

@Controller()
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Public()
  @Auth(AuthType.None)
  @Get('tasks')
  async getUserTasks(@Body() data:  {
    orgId?: string;
    ownerId?: string;
    withSubTasks: string;
    withUsers: string;
  }): Promise<Task[]| unknown>{
    try {
      const tasks: Task[] = await this.tasksService.getTasks( data )
      return tasks
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
  @Get('task')
  async getOneTask(@Body() data:  {
    taskId: string
    withUsers: string;
    withSubTasks: string
  }): Promise<Task | unknown>{
    try {
      return await this.tasksService.getOneTask( data )
    } catch (error) {
      return {
          answer: "bad news...",
          success: false,
          message: `${error}`
      }
    }
  }

  @Auth(AuthType.None)
  @Post(`createtask`)
  async createOneTask(@Body() data: {
    title: string;
    content: string;
    comment: string;
    userId: string;
    orgId: string;
    mainTaskId: string;
  }) {
    const { title , content, comment, userId, orgId, mainTaskId} = data;
    try {
      return await this.tasksService.createOneTask({
        comment,
        content,
        title,
        userId,
        orgId,
        mainTaskId
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
  @Put('updatetask/:id')
  async updateTask(
    @Param('id') id: string,
    @Body() data: Prisma.TaskUpdateInput): Promise<Task | unknown>{
      try {
        return await this.tasksService.updateTask({
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
  @Delete('deletetask/:id')
  async deleteTask(
    @Param('id') id: string,
    ): Promise<Task | unknown>{
      try {
        return await this.tasksService.deleteTask({ id: String(id) } )
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
  @Get('alltasks')
  async getAllTasks(): Promise<Task[]>{
    return await this.tasksService.getAllTasks()
  }

  @Public()
  @Auth(AuthType.None)
  @Get('taskswithsubtasks')
  async getAllTasksWithTasks(): Promise<Task[]>{
    return await this.tasksService.getAllTasksWithTasks()
  }

}
