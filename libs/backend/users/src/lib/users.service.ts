import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Role, User, UserSecret } from '@prisma/client';
import { EnhancedPrismaService, PrismaService } from '@prisma/prisma';
import { UsersRepository } from './users-repository';


@Injectable()
export class UsersService {


  constructor(
    private prisma: PrismaService,
    private enhancedPrisma: EnhancedPrismaService,
    private usersRepository: UsersRepository
  ) {}

  /*
  CRUD using users repository
  */

/*
Specific CRUD for User
*/

async createUser(data: Prisma.UserCreateInput): Promise<User> {
  if(!data.Roles) { data.Roles = [Role.USER] };
  return await this.prisma.user.create({ data });
}

async createOrFindOneUser(data: Prisma.UserCreateInput): Promise<User> { // If user does not exist, create one
  let user = await this.prisma.user.findUnique({ where: { email: data.email } })
  if (!user) {
    // Create a new user
    user = await this.prisma.user.create({ data })
  }
  return user;
}

//Get

// User(s) without their Secret data
async getAllUsers(): Promise<User[]> {
  return await this.prisma.user.findMany()
}

async getOneUserByUnique(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
  return await this.prisma.user.findUnique({
    where: userWhereUniqueInput,
  });
}

// async getOneUserByEmail(email: string): Promise<User | null> {
//   const  userWhereUniqueInput: Prisma.UserWhereUniqueInput = { email : email }
//   return await this.prisma.user.findUnique({
//     where: userWhereUniqueInput,
//   });
// }


/* UPDATE */

async updateOneUser(params: {
  where: Prisma.UserWhereUniqueInput;
  data: Prisma.UserUpdateInput;
  }): Promise<User> {
  const { where, data } = params;
  return this.prisma.user.update({
    data,
    where,
  });
}

/* DELETE */

async deleteOneUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
  return this.prisma.user.delete({
    where,
  });
}

async softDeleteOneUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
  const data = { isDeletedDT: new(Date) }
  return this.prisma.user.update({
    data,
    where,
  });
}
/* SEARCH */

async findUsers(params: {
  skip?: number;
  take?: number;
  cursor?: Prisma.UserWhereUniqueInput;
  where?: Prisma.UserWhereInput;
  orderBy?: Prisma.UserMaxOrderByAggregateInput;
  select?: Prisma.UserSelect;
  include?: Prisma.UserInclude;
}): Promise<User[]> {
  const { skip, take, cursor, where, orderBy, include} = params;
  return this.prisma.user.findMany({
    skip,
    take,
    cursor,
    where,
    orderBy,
    include
  });
}

/*
CRUD for User with secret
*/

/* CREATE */


async findOrCreateOneUser(userData:Prisma.UserCreateInput, pwdHash: string, salt: string): Promise<User> { // If user does not exist, create one
  let user = await this.prisma.user.findUnique({ where: { email: userData.email } })
  if (!user) {
    // Create a new user
    if(!userData.Roles) { userData.Roles = [Role.USER];}
    let dataUser: Prisma.UserCreateInput
    if(pwdHash != null || salt != null) {
      dataUser = {
        email: userData.email,
        nickName: userData.nickName,
        lastName: userData.lastName,
        firstName: userData.firstName,
        Gender: userData.Gender,
        Roles: userData.Roles,
        userSecret: {
          create: {
            pwdHash,
            salt
          },
        }
      }
    } else {
      dataUser = {
        email: userData.email,
        nickName: userData.nickName,
        lastName: userData.lastName,
        firstName: userData.firstName,
        Gender: userData.Gender,
        Roles: userData.Roles
      }
    }
    user = await this.prisma.user.create({ data: dataUser,})
  }
    return user;
}

async createOneUserWithPwd(userData:Prisma.UserCreateInput, pwdHash: string | undefined | null, salt: string | null | undefined): Promise<User | null> {

  // WARNING A new User is always created as "GUEST" ?

  if(!userData.Roles) { userData.Roles = [Role.GUEST];}

  // const Role = 'USER';
  const result = await this.prisma.user.create({
      data: {
          email: userData.email,
          nickName: userData.nickName,
          lastName: userData.lastName,
          firstName: userData.firstName,
          Gender: userData.Gender,
          Roles: userData.Roles,
          Language: userData.Language,
          userSecret: {
            create: {
              pwdHash,
              salt
            }
          }
      }
  });

  return result;
}

/* GET with Secret */

async getAllUsersWithSecret(): Promise<User[]> {
return await this.prisma.user.findMany({
  include: {
    userSecret: true, // Return all fields
  },
})
}

async getOneUserByUniqueWithSecret(
  userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<User & {userSecret: UserSecret | null }| null> {
  const user = await this.prisma.user.findUnique({
    where: userWhereUniqueInput,
    include: {
      userSecret: true, // Return all fields
    },
  })
  return user
}

/*
End CRUD for User with secret
*/

/*
CRUD for User with all links
*/

/* GET with all links */

async getAllUsersWithAllLinks(): Promise<User[]> {
  return await this.prisma.user.findMany({
    include: {
      manager: true, // Return all fields
      Team: true,
      Profiles: true,
      Groups: true,
      Posts: true,
      Comments: true,
      Tasks: true,
      // UserTodoLink: true,
      ChangesLogs: true,
    },
  })
  }

async getOneUserByUniqueWithAllLinks(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
  const user = await this.prisma.user.findUnique({
    where: userWhereUniqueInput,
    include: {
      manager: true, // Return all fields
      Team: true,
      Profiles: true,
      Groups: true,
      Posts: true,
      Comments: true,
      Tasks: true,
      // UserTodoLink: true,
      ChangesLogs: true,
    },
  })
  return user
}


/*
END End CRUD for User with secret
*/

/*
Specifiques
*/

async findUsersWithParams(params: {
  skip?: number;
  take?: number;
  cursor?: Prisma.UserWhereUniqueInput;
  where?: Prisma.UserWhereInput;
  orderBy?: Prisma.UserMaxOrderByAggregateInput;
  select?: Prisma.UserSelect;
  include?: Prisma.UserInclude;
}): Promise<User[]> {
  const { skip, take, cursor, where, orderBy, include} = params;
  return this.prisma.user.findMany({
    skip,
    take,
    cursor,
    where,
    orderBy,
    include
  });
}

async userStillActive(userEmail: string) : Promise<User | null> {
  const userWhereUniqueInput = { email: userEmail }
  const user = await this.getOneUserByUnique(userWhereUniqueInput);
  // Verify the user is not soft deleted !!!
  if( !user) {
    return null;
  }
  if(user?.isDeletedDT != null){ // a date exist witch mean that the user has been soft deleted
    return null; // Soft deleted
  }
  return user
}

async userExistActiveOrNot(userEmail: string): Promise<boolean>{
  const userWhereUniqueInput = { email: userEmail }
  // True or false. If true, user still could have been soft deleted !!
  let result = false;
  const userExist = await this.getOneUserByUnique(userWhereUniqueInput);
  if(userExist != null) {
    result = true
  }
  return result;
}
  /*
  Generic CRUD for User
  */

  async getAll(filter?: Prisma.UserFindManyArgs): Promise<User[] | null> {
    try {
      return await this.prisma.user.findMany(filter);
    } catch (e) {
      return null;
    }
  }

  async getById(id: string): Promise<User | null> {
    const userWhereUniqueInput = { id }
    try {
      return await this.prisma.user.findUnique({ where: userWhereUniqueInput });
    } catch (e) {
      return null;
    }
  }

  async getUniqueUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async create(data: Prisma.UserCreateInput): Promise<User | null | undefined> {
    try {
      return await this.prisma.user.create({ data: data });
    } catch (e) {
      throw new HttpException( 'this can be a human readable reason' , HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User | null> {
    try {
      return await this.prisma.user.update({
        where: { id: id },
        data: data,
      });
    } catch (e) {
      return null;
    }
  }

  async delete(id: string): Promise<User | null> {
    try {
      return await this.prisma.user.delete({ where: { id: id } });
    } catch (e) {
      return null;
    }
  }

  async count(filter?: Prisma.UserCountArgs): Promise<number | null> {
    try {
      return await this.prisma.user.count(filter);
    } catch (e) {
      return null;
    }
  }

/*
  End of Generic CRUD for User
  */








}
