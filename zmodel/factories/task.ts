import { faker } from "@faker-js/faker";
import { Organization, Prisma, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const fakeTask = (user: User, organization: Organization): Prisma.TaskCreateInput => {
  const content = faker.lorem.paragraph();
  const title = faker.lorem.sentence(5);
  const published = faker.datatype.boolean();
  const orderTask = faker.number.int(100);
  // const createdAt = faker.date.recent(15).toISOString();
  const dataTask = { content, title, published, orderTask, org: { connect: { id: organization.id }} , owner: { connect: { id: user.id } } }

  return dataTask

}

