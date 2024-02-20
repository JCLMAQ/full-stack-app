import { Post } from "@prisma/client";

export interface PostInterface extends Post { include: { Categories: true, Comments: true, LikedBys: true }}

export interface PostInterfaceWithOutInclude extends Post {}

export interface PostPartialInterface extends Partial<Post> {}

export interface PostPartialInterfaceWithInclude extends Partial<Post> { include: { Categories: true, Comments: true, LikedBys: true }}
