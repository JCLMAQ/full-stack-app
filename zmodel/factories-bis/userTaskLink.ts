import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient, Task, User } from "@prisma/client";

const prisma = new PrismaClient();

// alternatively can make both as optional, and create new relations if absent
const comment= faker.lorem.paragraph();

export const dataUserTaskLink = (
  user: User,
  task: Task,
): Prisma.UserTaskLinkCreateInput => ({
  user: { connect: { id: user.id } },
  task: { connect: { id: task.id } },
  comment
});

export const createUserTaskLink = async (task: Task, user: User) => {

      const userTaskLink = await prisma.userTaskLink.create({
        data: {
          user: { connect: { id: user.id } },
          task: { connect: { id: task.id } },
          comment
        }
      })
      return userTaskLink
    }
