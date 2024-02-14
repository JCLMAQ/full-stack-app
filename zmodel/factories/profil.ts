import { faker } from "@faker-js/faker";
import { Prisma, User } from "@prisma/client";
import { fakeUser } from "./user";


export const fakeProfile = (user?: User): Prisma.ProfileCreateInput => {

  const orderProfile = faker.number.int(100);
  const bio = faker.person.bio();

  if (user) {
    return {
      orderProfile,
      bio,
      Users: { connect: { id: user.id } } };
  }
  return {
    orderProfile,
    bio,
    Users: { create: fakeUser() }
  };
};
