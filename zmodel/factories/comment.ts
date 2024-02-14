import { faker } from "@faker-js/faker";
import { Post, Prisma, User } from "@prisma/client";

// alternatively can make both as optional, and create new relations if absent
export const fakeComment = (
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
