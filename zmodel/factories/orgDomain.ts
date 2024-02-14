import { faker } from "@faker-js/faker";
import { Organization, Prisma } from "@prisma/client";
import { fakeOrg } from "./org";


export const fakeOrgDomain = (org?: Organization): Prisma.OrgDomainCreateInput => {

  const domainName = faker.internet.domainWord();
  const extension = faker.internet.domainSuffix();

  if (org) {
    return {
      domainName,
      extension,
      org: { connect: { id: org.id } } };
  }
  return {
      domainName,
      extension,
      org: { create: fakeOrg() }
  };
};
