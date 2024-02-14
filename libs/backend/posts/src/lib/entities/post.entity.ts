import { UserEntity } from "@be/users";
import { ApiProperty } from "@nestjs/swagger";
import { Category, User } from "@prisma/client";

export class PostEntity {
  id: string ;
createdAt: Date ;
updatedAt: Date ;
orderPost: number  | null;
published: boolean ;
title: string ;
content: string  | null;
@ApiProperty({ type: () => UserEntity })
author?: User ;
authorId: string ;
@ApiProperty({ type: () => UserEntity })
Category?: Category[] ;
Comment?: Comment[] ;
isDeletedDT: Date  | null;
isDeleted: number;
}
