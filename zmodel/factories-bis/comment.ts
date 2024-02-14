import { faker } from "@faker-js/faker";
import { Post, Prisma, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

// alternatively can make both as optional, and create new relations if absent
export const dataComment = (
  user: User,
  post: Post
): Prisma.CommentCreateInput => {
  const orderComment = faker.number.int(100);
  const content = faker.lorem.paragraph();
  const published = faker.datatype.boolean();
  return {
    orderComment,
    content,
    published,
    author: { connect: { id: user.id } },
    post: { connect: { id: post.id } },
  }

}

export const createComment = async (iOrg: number, iUser: number, iPost: number, i: number, user: User, post: Post) => {
    console.log("Comments: ", i, "/Org: ", iOrg,"/User: ", iUser,"/Post: ", iPost,);
      const comment = await prisma.comment.create({
        data: {
          orderComment: faker.number.int(100),
          content: faker.lorem.paragraph(),
          published: faker.datatype.boolean(),
          author: { connect: { id: user.id } },
          post: { connect: { id: post.id } },
        }
      })
      // console.log("Comment: ", comment)
    }
