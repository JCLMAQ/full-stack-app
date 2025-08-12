import { faker } from "@faker-js/faker";
import { Prisma, Task, User } from '@prisma/prisma-client-new';

// alternatively can make both as optional, and create new relations if absent
const comment= faker.lorem.paragraph();

export const fakeUserTaskLink = (
  user: User,
  task: Task,
): Prisma.UserTaskLinkCreateInput => ({
  user: { connect: { id: user.id } },
  task: { connect: { id: task.id } },
  comment
});
