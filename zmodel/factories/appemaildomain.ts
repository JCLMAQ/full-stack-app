import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";


export const fakeAppEmailDomain = (): Prisma.AppEmailDomainCreateInput => ({
  domain: faker.internet.domainName(),
  allowed: faker.datatype.boolean()
});
