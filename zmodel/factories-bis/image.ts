import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const dataImage = (
  associated_id: string,
  type: string,
  sequence: number = 0
): Prisma.ImageCreateInput => ({
  type,
  associated_id,
  sequence,
  // I changed to use unsplash as the default loremflickr
  // was down when I was doing other parts
  url:
    faker.image.avatar() +
    // This is make sure the browser doesn't just retrieve the image from cache
    "/?random=" +
    Math.ceil(Math.random() * 10000),
});


export const createImage = async (i: number, associated_id: string, type: string, sequence: number) => {
  console.log("Image: ", i)
      const image = await prisma.image.create({
        data: {
          associated_id,
          type,
          sequence,
          url: faker.image.avatar() + "/?random=" + Math.ceil(Math.random() * 10000),
        // This is make sure the browser doesn't just retrieve the image from cache

        }
      });

      return image
    }
