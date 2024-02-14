import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dataAppEmailDomain = (): Prisma.AppEmailDomainCreateInput => ({
  domain: faker.internet.domainName(),
  allowed: faker.datatype.boolean()
});

export const createAppEmailDomain = async () => {
  const domain = faker.internet.domainName()
  const allowed = faker.datatype.boolean()
  console.log("AppEmailDomain: ",domain, "Allowed: ", allowed)
  const appEmailDomain = await prisma.appEmailDomain.create({
    data: {
      domain,
      allowed
    }
  })
  return appEmailDomain
}

