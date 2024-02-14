import { faker } from "@faker-js/faker";
import { PrismaClient, Role, User } from "@prisma/client";
import { pbkdf2Sync, randomBytes } from "crypto";

const prisma = new PrismaClient();

// create the 4 user: 3 attached to the Org1 and one to the Org2

export const create4Users = async () => {
 const users: User[] = [];

 function hashPassword(plainTextPassword: string, salt: string ): string  {
    if (salt && plainTextPassword) {
      return pbkdf2Sync(plainTextPassword, Buffer.from(salt, 'base64'), 10000, 64, 'sha512')
        .toString('base64');
    }
    return plainTextPassword;
  }

  const orgs = await prisma.organization.findMany();

  const passWordFaker = 'Azerty123456789##';

  // Create a salt and Hash the password with it
  const salt = randomBytes(16).toString('base64');
  const pwdHash = hashPassword(passWordFaker, salt);


  const user1 = await prisma.user.create({
    data: {
      email: 'alice@prisma.io',
      firstName: 'alice',
      lastName: 'Merveille',
      nickName: 'ALMER',
      dob: faker.date.birthdate(),
      passWordFaker: passWordFaker,
      Orgs: { connect: { id: orgs[0].id } },
      Roles: [Role.USER],
      userSecret: {
        create: {
          pwdHash: pwdHash,
          salt: salt,
          isAdmin: false
        }
      }
    },
  })
  users.push(user1);
  console.log("User 1: ", user1);

  const user2 =await prisma.user.create({
    data: {
      firstName: 'bob',
      lastName: 'Morane',
      email: 'bob@prisma.io',
      nickName: 'MOBOB',
      passWordFaker: passWordFaker,
      dob: faker.date.birthdate(),
      Orgs: { connect: { id: orgs[0].id } },
      Roles: [Role.USER],
      userSecret: {
        create: {
          pwdHash: pwdHash,
          salt: salt,
          isAdmin: false
        }
      }
    },
  })
  users.push(user2);
  console.log("User 2: ", user2);

  const user3 =await prisma.user.create({
    data: {
      firstName: 'Toi',
      lastName: 'TOIT',
      email: 'toi@toit.be',
      nickName: 'TOITOI',
      passWordFaker: passWordFaker,
      dob: faker.date.birthdate(),
      Orgs: { connect: { id: orgs[0].id } },
      Roles: [Role.USER],
      userSecret: {
        create: {
          pwdHash: pwdHash,
          salt: salt,
          isAdmin: false
        }
      }
    },
  })
  users.push(user3);
  console.log("User 3: ", user3);

  const user4 =await prisma.user.create({
    data: {
      firstName: 'Moi',
      lastName: 'MAQ',
      email: 'jcm@jcm.be',
      nickName: 'JCM',
      passWordFaker: passWordFaker,
      dob: faker.date.birthdate(),
      Orgs: { connect: { id: orgs[1].id } },
      Roles: [Role.ADMIN],
      userSecret: {
        create: {
          pwdHash: pwdHash,
          salt: salt,
          isAdmin: true
        }
      }
    },
  })
  users.push(user4);
  console.log("User 4: ", user4);

  return users
};
