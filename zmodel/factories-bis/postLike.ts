import { Post, Prisma, User } from "@prisma/client";

// alternatively can make both as optional, and create new relations if absent
export const dataPostLike = (
  user: User,
  post: Post
): Prisma.PostLikeCreateInput => ({
  user: { connect: { id: user.id } },
  post: { connect: { id: post.id } },
});
