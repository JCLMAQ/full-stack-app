import { Injectable } from '@nestjs/common';
import { Prisma, Task, UserTaskLink } from '@prisma/client';
import { PrismaService } from '@prisma/prisma';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {

  constructor(
    private prisma: PrismaService,
    // private enhancedPrisma: EnhancedPrismaService,
    private repository: TasksRepository
  ) {}

   async createOneTask(params: {
    content: Task[`content`];
    comment: UserTaskLink[`comment`];
    title: Task[`title`];
    userId: UserTaskLink[`userId`];
    orgId: Task[`orgId`]
    mainTaskId: string | null
    }) {
        const { title , content, comment, userId, orgId, mainTaskId } = params;
        let data: Prisma.TaskCreateInput = {
          title,
          content,
          Users: {
            create: {
              userId: userId,
              isAuthor: true,
              isAssigned: true,
              comment
            }
          },
          orderTask: 0,
          owner: {
            connect: {
              id: userId
            }
          },
          org: {
            connect: {
              id: orgId
            }
          }
        };
      if (mainTaskId !== "") {
        data = { ...data, mainTask: { connect: { id: mainTaskId! } } }
      }
      const task = await this.repository.createOneTask({ data: data });
      return task;
  }

  async getTasks(params: {
      skip?: number,
      take?: number,
      cursor?: Prisma.TaskWhereUniqueInput,
      orderBy?: Prisma.TaskOrderByWithRelationInput,
      orgId?: Task[`orgId`],
      ownerId?: Task[`ownerId`],
      withSubTasks: string,
      withUsers: string
    })
    {
      const { ownerId, orgId, withSubTasks, withUsers} = params
      let withSubTasksBoolean = true;
      let withUsersBoolean = true;
      if(withSubTasks === 'false') { withSubTasksBoolean = false}
      if(withUsers === 'false') { withUsersBoolean = false}
      return await this.repository.getTasks( {
        include: { SubTasks: withSubTasksBoolean, Users: withUsersBoolean },
        where: { ownerId, orgId }
      });
    }

  async getOneTask(params: {
    withSubTasks: string,
    withUsers: string,
    taskId: Task[`id`]
  }): Promise<Task | null> {
    const {withUsers, withSubTasks, taskId} = params
    // let withTasksboolean = true
    // if(withTasks === 'false') { withTasksboolean = false}
    return await this.repository.getOneTask({
      include: {
        Users: JSON.parse(withUsers),
        SubTasks: JSON.parse(withSubTasks)
      },
      where: { id: taskId}})
  }

  async updateTask( params: {
    where: Prisma.TaskWhereUniqueInput,
    data: Prisma.TaskUpdateInput,
  }): Promise<Task>
  {
    const {where, data} = params;
    return await this.repository.updateTask({where, data});
  }

  async softDeleteTask( params: {
    taskId: Task[`id`],
  })
  {
    const { taskId } = params
    return await this.repository.softDeleteTask({where: { id: taskId}});
  }

  async deleteTask(where: Prisma.TaskWhereUniqueInput) {
    return await this.repository.deleteTask(where)
  }


  // For test purpose
  async getAllTasks(){
    return await this.repository.getAllTasks();
  }

async getAllTasksWithTasks(): Promise<Task[]>{
    return await this.repository.getAllTasksWithTasks();
  }
}
