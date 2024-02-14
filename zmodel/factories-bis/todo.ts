import { faker } from "@faker-js/faker";
import { Organization, Prisma, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();


export const dataTodo = (i: number, user: User, organization: Organization): Prisma.TodoCreateInput => {
  const content = faker.lorem.paragraph();
  const title = 'todo ' + i.toString();
  const published = faker.datatype.boolean();
  const orderTodo = faker.number.int(100);
  // const createdAt = faker.date.recent(15).toISOString();
  const dataTodo = { content, title, published, orderTodo, org: { connect: { id: organization.id }} , owner: { connect: { id: user.id } } }

  return dataTodo

}

export const createTodo = async (iOrg: number, iUser: number, i: number, org: Organization, user: User) => {
  console.log("Todo: ",  i.toString() + "/ Org: " + iOrg.toString()+ "/User: " + iUser.toString())
      const todo = await prisma.todo.create({
        data: {
          title: 'todo ' + i.toString() + "/ Org: " + iOrg.toString()+ "/User: " + iUser.toString(),
          content : faker.lorem.paragraph(),
          published : faker.datatype.boolean(),
          orderTodo : faker.number.int(100),
          org: { connect: { id: org.id }},
          owner: { connect: { id: user.id } }
        }
      })
      return todo
    }

