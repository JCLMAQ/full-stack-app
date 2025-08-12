import { faker } from "@faker-js/faker";
import { Prisma } from '@prisma/prisma-client-new';


export const fakeAppEmailDomain = (): Prisma.AppEmailDomainCreateInput => ({
  domain: faker.internet.domainName(),
  allowed: faker.datatype.boolean()
});
