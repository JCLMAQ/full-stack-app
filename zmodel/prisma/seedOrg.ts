import { PrismaClient, Role } from '@prisma/client';


const prisma = new PrismaClient();

async function main() {

  const org1 = await prisma.organization.create({
    data: {
      name: 'MySelf',
      emailITAdmin: 'jcl.maquinay@outlook.com',
    }
  })

  const org2 = await prisma.organization.create({
    data: {
      name: 'YourSelf',
      emailITAdmin: 'jcl.maquinay@gmail.com',
    }
  })

  await prisma.user.create({
    data: {
      email: 'alice@prisma.io',
      firstName: 'alice',
      lastName: 'Merveille',
      Orgs: { connect: { id: org1.id } },
      Posts: {
        create: {
          org: { connect: { id: org1.id } },
          title: 'Watch the talks from Prisma Day 2019',
          content: 'https://www.prisma.io/blog/z11sg6ipb3i1/',
          published: true,
        },
      },
      Roles:  [Role.USER],
      userSecret: {
        create: {
          pwdHash: null,
          salt: null,
          isAdmin: true
        }
      }
    },
  })

  await prisma.user.create({
    data: {
      firstName: 'bob',
      lastName: 'Morane',
      email: 'bob@prisma.io',
      nickName: 'MOBOB',
      Orgs: { connect: { id: org1.id } },
      Posts: {
        create: [
          {
            orgId: org2.id,
            title: 'Subscribe to GraphQL Weekly for community news',
            content: 'https://graphqlweekly.com/',
            published: true,
          },
          {
            orgId: org2.id,
            title: 'Follow Prisma on Twitter',
            content: 'https://twitter.com/prisma/',
            published: false,
          },
        ],
      },
      Roles: [Role.USER],
      userSecret: {
        create: {
          pwdHash: null,
          salt: null,
          isAdmin: false
        }
      }
    },
  })
/*
  await prisma.user.createMany({
    data: [
      {
        firstName: 'Moi',
        lastName: 'MAQ',
        email: 'jcm@jcm.be',
        nickName: 'JCM',
        Roles: [Role.USER],
      },
      {
        firstName: 'Toi',
        lastName: 'TOIT',
        email: 'toi@toit.be',
        nickName: 'TOITOI',
        Roles: [Role.USER],
      },
      {
        firstName: 'Toto',
        lastName: 'THE BEST',
        email: 'toto@toto.be',
        nickName: 'TOTO',
        Roles: [Role.USER],
      },
      {
        firstName: 'Best',
        lastName: 'TOTO',
        email: 'best@toto.be',
        nickName: 'BTOTO',
        Roles: [Role.USER],
      },
    ]
  })
*/


}


main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })

