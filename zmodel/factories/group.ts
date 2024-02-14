import { faker } from "@faker-js/faker";
import { Organization, Prisma, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const fakeGroup =  (user: User, organization: Organization): Prisma.GroupCreateInput => {
  const description = faker.lorem.paragraph();
  const name = faker.lorem.sentence(5);
  const isActiv = faker.date.recent({});
  const orderGroup = faker.number.int(100);
  // const created_at = faker.date.recent({15}).toISOString();

  return { description, name, isActiv, orderGroup, org: { connect: { id: organization.id }} , Users: { connect: { id: user.id } } };
};
