import { Post, Prisma, User } from '../generated/prisma_client/client.ts';

// alternatively can make both as optional, and create new relations if absent
export const dataPostLike = (
  user: User,
  post: Post
): Prisma.PostLikeCreateInput => ({
  user: { connect: { id: user.id } },
  post: { connect: { id: post.id } },
});
