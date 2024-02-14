import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { ApiKey, ChangesTracking, Gender, Group, Language, PermissionClaim, Post, Prisma, Profile, Role, Task, Title, Token, User, UserSecret } from "@prisma/client";
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
    constructor(partial: Partial<UserEntity>) {
      Object.assign(this, partial);
    }

  createdAt: Date;
  updatedAt: Date;

  id!: string;
  numSeq: number;
  @ApiProperty({ required: true, nullable: false })
  email: string;
  lastName!: string;
  firstName!: string;
  title: Title;
  nickName: string;
  Gender: Gender;
  social: Prisma.JsonValue;
  Language: Language;
  dob: Date;
  address: Prisma.JsonValue;
  isValidated: Date;
  isSuspended: Date;
  isDeletedDT: Date;
  managerId: string | null;
  @ApiProperty({ type: () => UserEntity })
  manager?: User  | null;
  @ApiProperty({ type: () => UserEntity })
  Team?: User[] ;
  @ApiProperty({ type: () => UserEntity })
  Profile?: Profile[] ;
  @ApiProperty({ type: () => UserEntity })
  Group?: Group[] ;
  @ApiProperty({ type: () => UserEntity })
  Post?: Post[] ;
  Comment?: Comment[] ;
  @ApiProperty({ type: () => UserEntity })
  Task?: Task[] ;
  // UserTodoLink?: UserTodoLink[] ;
  @ApiProperty({ type: () => UserEntity })
  ChangesLog?: ChangesTracking[] ;
  @ApiProperty({ type: () => UserEntity })
  Token?: Token[] ;
  Roles!: Role[];
  Permissions!: PermissionClaim[];
  isTfaEnable!: boolean;
  @Exclude() // Used by the Nestjs ClassSerializerInterceptor to exclude the password field
  @ApiHideProperty()
  tfaSecret: string | null;
  @ApiProperty({ type: () => UserEntity })
  ApiKey?: ApiKey[] ;
  @ApiProperty({ type: () => UserEntity })
  UserSecret?: UserSecret  | null;
  @ApiHideProperty()
  @Exclude()
  passWordFaker: string | null;
  published: boolean;
  isDeleted: number;
  isPublic: boolean;

}
