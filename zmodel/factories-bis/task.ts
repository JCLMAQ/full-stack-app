import { faker } from "@faker-js/faker";
import { Organization, Prisma, PrismaClient, Todo, User } from "@prisma/client";

const prisma = new PrismaClient();

export const dataTask = (i: number, user: User, organization: Organization): Prisma.TaskCreateInput => {
  const content = faker.lorem.paragraph();
  const title = 'task ' + i.toString();
  const published = faker.datatype.boolean();
  const orderTask = faker.number.int(100);
  // const createdAt = faker.date.recent(15).toISOString();
  const dataTask = { content, title, published, orderTask, org: { connect: { id: organization.id }} , owner: { connect: { id: user.id } } }

  return dataTask

}

export const createTask = async (iOrg: number, iUser: number, i: number, org: Organization, user: User, iTodo: number, todo: Todo) => {
  console.log("Task: ",  i.toString() + "/ Org: " + iOrg.toString()+ "/User: " + iUser.toString() + "/Todo: " + iTodo.toString())
      const task = await prisma.task.create({
        data: {
          title: 'task ' + i.toString() + "/ Org: " + iOrg.toString()+ "/User: " + iUser.toString(),
          content : faker.lorem.paragraph(),
          published : faker.datatype.boolean(),
          orderTask : faker.number.int(100),
          org: { connect: { id: org.id }},
          owner: { connect: { id: user.id } },
          todo: { connect: { id: todo.id}}
        }
      })
      return task
    }

