import { faker } from "@faker-js/faker";
import { Organization, Prisma } from "@prisma/client";
import { fakeOrg } from "./org";


export const fakeOrgEmail = (org?: Organization): Prisma.OrgEmailCreateInput => {

  const email = faker.internet.email();
  const description = faker.lorem.paragraph();
 // const orgEmailUseTo =
  if (org) {
    return {
      email,
      description,
      org: { connect: { id: org.id } } };
  }
  return {
    email,
    description,
    org: { create: fakeOrg() }
  };
};
