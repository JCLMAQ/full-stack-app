import { faker } from "@faker-js/faker";
import { Post, Prisma } from "@prisma/client";
import { fakePost } from "./post";


export const fakeCategory = (post?: Post): Prisma.CategoryCreateInput => {

  const orderCategory = faker.number.int(100);
  const name = faker.lorem.sentence();

  if (post) {
    return {
      orderCategory,
      name,
      Posts: { connect: { id: post.id } } };
  }
  return {
    orderCategory,
    name,
    Posts: { create: fakePost() }
  };
};
