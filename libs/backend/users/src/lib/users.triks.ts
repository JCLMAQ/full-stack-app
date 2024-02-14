import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@prisma/prisma';


@Injectable()
export class UsersService {


  constructor(
    private prisma: PrismaService,
  ) {}


}


/*
The following example uses the Prisma.validator to create two type-safe objects and then uses the Prisma.UserGetPayload utility function
to create a type that can be used to return all users and their posts.
*/

// 1: Define a type that includes the relation to `Post`
const userWithPosts = Prisma.validator<Prisma.UserArgs>()({
  include: { Post: true },
})

// 2: Define a type that only contains a subset of the scalar fields
const userPersonalData = Prisma.validator<Prisma.UserArgs>()({
  select: { email: true, nickName: true ,  salt: false, pwdHash: false },
})

// 3: This type will include a user and all their posts
type UserWithPostsbis = Prisma.UserGetPayload<typeof userWithPosts>

// Define a type that includes the relation to `Post` for users
type UsersWithPosts = Prisma.PromiseReturnType<typeof getUsersWithPostsFunct>;
//  https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types

// Function definition that returns a partial structure
async function getUsersWithPostsFunct(this: any) {
  const usersWithPosts: UserWithPosts = await this.prisma.user.findMany ({ include: { Post: true } })
  return usersWithPosts
}

// Define a type that includes the relation to `Post` for one user
type UserWithPosts = Prisma.UserGetPayload<{
  include: { Post: true, salt: false, pwdHash: false }
}>

// Define a type that only contains a subset of the scalar fields
type UserPersonalData = Prisma.UserGetPayload<{
  select: {email: true; lastName: true; firstName: true; nickName: true}
}>

// type UserWithoutSecret = Prisma.UserGetPayload<{
//   select: {pwdHash: false, salt: false }
// }>

// Select generated type
const selectUserWithEmail = Prisma.validator<Prisma.UserSelect>()({
  email: true
})
// Include generated type
const includePosts = Prisma.validator<Prisma.UserInclude> () ({
  Post: true,
})

const findSpecificUserByEmail = (email: string) => {
  return Prisma.validator<Prisma.UserWhereInput>()({
    email,
  })
}

// type UserWithoutPwd =  Omit<User, "salt" | "pwdHash">;

