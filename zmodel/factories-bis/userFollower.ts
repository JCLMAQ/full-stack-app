import { Prisma, User } from '../generated/prisma_client/client.ts';

// alternatively can make both as optional, and create new relations if absent
export const dataUserFollower = (
  user: User,
  follower: User
): Prisma.UserFollowerCreateInput => ({
  user: { connect: { id: user.id } },
  follower: { connect: { id: follower.id } },
});
