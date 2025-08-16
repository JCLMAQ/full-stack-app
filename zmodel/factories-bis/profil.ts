import { faker } from "@faker-js/faker";
import { Prisma, User } from 'zmodel/generated/prisma_client/client.ts';

export const dataProfile = (user: User): Prisma.ProfileCreateInput => {

  const orderProfile = faker.number.int(100);
  const bio = faker.person.bio();

    return {
      orderProfile,
      bio,
      Users: { connect: { id: user.id } }
    };
  };

