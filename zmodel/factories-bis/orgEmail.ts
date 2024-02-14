import { faker } from "@faker-js/faker";
import { Organization, Prisma, PrismaClient } from "@prisma/client";
import { dataOrgEmailUseTo } from "./orgEmailUseTo";

const prisma = new PrismaClient();

export const dataOrgEmail = (org: Organization, orgEmail: string): Prisma.OrgEmailCreateInput => {

  const email = faker.internet.email();
  const description = faker.lorem.paragraph();
 // const orgEmailUseTo =

    return {
      email: orgEmail,
      description,
      org: { connect: { id: org.id } }
    };
  };

  export const createOrgEmail = async (i: number, iOrg: number, org: Organization) => {
    console.log("Org. Domain: ", i.toString() + "/ Org: " + iOrg.toString())

    const email = faker.internet.email();
    const description = faker.lorem.paragraph();

    const orgEmail = await prisma.orgEmail.create({
      data: {
        email,
        description,
        org: { connect: { id: org.id } }
      }
    })
    // Email use to
    await prisma.orgEmailUseTo.create({
      data: dataOrgEmailUseTo(orgEmail)
    });

    return orgEmail
  }

