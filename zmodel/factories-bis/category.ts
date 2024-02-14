import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dataCategory = (j: number): Prisma.CategoryCreateInput => {
  const orderCategory = faker.number.int(100);
  const name = 'Category ' + j.toString();
  return {
    orderCategory,
    name,
  }

}

export const createCategories = async (maxj: number) => {
  for (let j = 0; j < maxj; j++) {
    console.log("Category: ", j)
    const orderCategory = faker.number.int(100);
    const name = 'Category ' + j.toString();
    await prisma.category.create({
      data: {
        numSeq: j,
        orderCategory,
        name
      }
    })
  }
}
