import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const dataStory = (user: User): Prisma.StoryCreateInput => {

  const caption = faker.lorem.paragraph();
    return {
      caption,
      user: { connect: { id: user.id } } };
};

export const createStory = async (iOrg: number, iUser: number, i: number, user: User) => {
  console.log("Story: ", i.toString() + "/ Org: " + iOrg.toString()+ "/User: " + iUser.toString())
      const story = await prisma.story.create({
        data: {
          caption: faker.lorem.paragraph(),
          user: { connect: { id: user.id } }
        }
      })
      return story
    }
