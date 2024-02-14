import { faker } from "@faker-js/faker";
import { Organization, Prisma, PrismaClient } from "@prisma/client";
import { dataOrgDomain } from "./orgDomain";
import { dataOrgEmail } from "./orgEmail";

const prisma = new PrismaClient();

// create two Organizations

export const create2Orgs = async () => {

  const orgs: Organization[]=[];

  var address1 = [
    { street: faker.location.street() },
    { buildingNumber: faker.location.buildingNumber() },
    { city: faker.location.buildingNumber() },
    { country: faker.location.country() },
    { countryCode: faker.location.countryCode() },
  ] as Prisma.JsonArray

  var address2 = [
    { street: faker.location.street() },
    { buildingNumber: faker.location.buildingNumber() },
    { city: faker.location.buildingNumber() },
    { country: faker.location.country() },
    { countryCode: faker.location.countryCode() },
  ] as Prisma.JsonArray

  const org1 = await prisma.organization.create({
      data: {
        name: 'TheBest',
        emailITAdmin: 'jcl.maquinay@gmail.com',
        description: faker.lorem.paragraph(),
        address: address1,
        webSite: faker.internet.domainName(),
      }
  })
  orgs.push(org1);

  await prisma.orgDomain.create({
    data: dataOrgDomain(org1, "thebest", "be")
  });
  await prisma.orgEmail.create({
    data: dataOrgEmail(org1, "info@thebest.be")
  });

  console.log("Organization 1: ", org1);

  const org2 = await prisma.organization.create({
    data: {
      name: 'TheOne',
      emailITAdmin: 'jcl.maquinay@outlook.com',
      description: faker.lorem.paragraph(),
      address: address2,
      webSite: faker.internet.domainName(),
    }
  })
  orgs.push(org2);

  await prisma.orgDomain.create({
    data: dataOrgDomain(org2, "theone", "be")
  });
  await prisma.orgEmail.create({
    data: dataOrgEmail(org1, "info@theone.be")
  });

  console.log("Organization 2: ", org2)

  return orgs
}
