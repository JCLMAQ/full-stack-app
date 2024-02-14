import { faker } from "@faker-js/faker";
import { Organization, Prisma, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const dataGroup =  (user: User, organization: Organization): Prisma.GroupCreateInput => {
  const description = faker.lorem.paragraph();
  const name = faker.lorem.sentence(5);
  const isActiv = faker.date.recent({});
  const orderGroup = faker.number.int(100);
  // const created_at = faker.date.recent({15}).toISOString();

  return { description, name, isActiv, orderGroup, org: { connect: { id: organization.id }} , Users: { connect: { id: user.id } } };
};

export const createGroup = async (i: number, iOrg: number, iUser: number, org: Organization, user: User) => {
      console.log("Group: ",i.toString() + "/ Org: " + iOrg.toString()+ "/User: " + iUser.toString())
      const group = await prisma.group.create({
        data: {
          description: faker.lorem.paragraph(),
          name: "Group" + i.toString()+ "/ Org: " + iOrg.toString()+ "/User: " + iUser.toString(),
          isActiv: faker.date.recent({}),
          orderGroup: faker.number.int(100),
          org: { connect: { id: org.id }},
          Users: { connect: { id: user.id } }
        }
      })
      return group
    }
