import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";
import { pbkdf2Sync, randomBytes } from "crypto";
import { fakeOrg } from "./org";

export const fakeUser = (orgId?: string): Prisma.UserCreateInput => {

 function hashPassword(plainTextPassword: string, salt: string ): string  {
    if (salt && plainTextPassword) {
      return pbkdf2Sync(plainTextPassword, Buffer.from(salt, 'base64'), 10000, 64, 'sha512')
        .toString('base64');
    }
    return plainTextPassword;
  }

  const email = faker.internet.email();
  const lastName = faker.person.lastName();
  const firstName = faker.person.firstName();
  const passWordFaker = 'Azerty123456789##';
  const dob = faker.date.birthdate();


  // Create a salt and Hash the password with it
  const salt = randomBytes(16).toString('base64');
  const pwdHash = hashPassword(passWordFaker, salt);


  if (orgId) {
    return {
      email,
      lastName,
      firstName,
      dob,
      passWordFaker,
      userSecret: { create: { pwdHash, salt}},
      Orgs: { connect: { id: orgId } } };
  }
  // console.log("organisation: ", org)
  return {
    email,
    lastName,
    firstName,
    dob,
    passWordFaker,
    userSecret: { create: { pwdHash, salt}},
    Orgs: { create: fakeOrg() }
  };
};
