import { faker } from "@faker-js/faker";
import { Organization, Prisma, User } from "@prisma/client";
import { fakeOrg } from "./org";
import { fakeUser } from "./user";

export const fakePost = (user?: User, organization?: Organization): Prisma.PostCreateInput => {
  const content = faker.lorem.paragraph();
  const title = faker.lorem.sentence(5);
  const published = faker.datatype.boolean();
  const orderPost = faker.number.int(100);
  // const created_at = faker.date.recent(15).toISOString();

  if (organization) {
    if (user) {
      return { content, title, published, orderPost, org: { connect: { id: organization.id }} , owner: { connect: { id: user.id } } };
    }
    return { content,  title, published, orderPost, org: { connect: { id: organization.id }} ,owner: { create: fakeUser() } };
  } else {
    if (user) {
      return { content, title, published, orderPost, org: { create: fakeOrg()} , owner: { connect: { id: user.id } } };
    }
    return { content,  title, published, orderPost, org: { create: fakeOrg()} ,owner: { create: fakeUser() }
  };
};
}
