import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";



var address = [
  { street: faker.location.street() },
  { buildingNumber: faker.location.buildingNumber() },
  { city: faker.location.buildingNumber() },
  { country: faker.location.country() },
  { countryCode: faker.location.countryCode() },
] as Prisma.JsonArray

export const fakeOrg = (): Prisma.OrganizationCreateInput => ({
  //name: faker.airline.airline.name,
  name: faker.person.firstName() + faker.person.lastName(),
  emailITAdmin: 'jcl.maquinay@gmail.com',
  description: faker.lorem.paragraph(),
  address: address,
  webSite: faker.internet.domainName(),
});
