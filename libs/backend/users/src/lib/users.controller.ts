import { JwtAuthGuard } from '@be/auths';
import { Roles } from '@be/iam';

import { Public } from '@be/common';
import { Auth, AuthType } from '@be/iam';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Prisma, Role, User } from '@prisma/client';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

// @UseGuards(JwtAuthGuard)
// @Auth(AuthType.Bearer, AuthType.ApiKey)
@Controller()
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}


  @Post('user')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiCreatedResponse({ type: UserEntity })
  async createOneUser( @Body() userData: Prisma.UserCreateInput ): Promise<User> {
    // const { name, email } = userData;
    return await this.usersService.createUser(
      userData
    );
  }
  // Get all users
  @Public()
  @Auth(AuthType.None)
  @Get('users')
  async getUsers(): Promise<User[]>{
    const users: User[] = await this.usersService.getAllUsers()
    console.log('from Users controlors: ', users)
    return users
  }

    // Get all users
    // @Public()
    // @Auth(AuthType.None)
    // @Get('users')
    // @ApiOkResponse({ type: [UserEntity] })
    // async getUsers(@ActiveUser() user: ActiveUserData): Promise<User[]>{
    //   // console.log('from Users controlors: ', user)
    //   const users: User[] = await this.usersService.getAllUsers()
    //   console.log('from Users controlors: ', users)
    //   return users
    // }

  // Get one user by id
  @Get('user/:id')
  @ApiOkResponse({ type: UserEntity })
  async getOneUserById(@Param('id') id: string): Promise<User | null> {
    return await this.usersService.getOneUserByUnique({ id: String(id) });
  }

  // Create one user


// Update one user
@Patch('user/:id')
@ApiCreatedResponse({ type: UserEntity })
async updateUser(
  @Param('id') id: string,
  @Body() userData: Prisma.UserUpdateInput): Promise<User> {
  return await this.usersService.updateOneUser({
    where: { id: String(id) },
    data:  userData ,
    });
}

// Delete one user
  @Delete('user/:id')
  @ApiOkResponse({ type: UserEntity })
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.usersService.deleteOneUser({ id: String(id) });
  }

  // GET
  // Get all users
  // @UseGuards(JwtAuthGuard)
 // @Roles(Role.ADMIN)
  @Get('users/allusers')
  @ApiOkResponse({ type: [UserEntity] })
  async getAllUsers(): Promise<User[]>{
    const users: User[] = await this.usersService.getAllUsers()
    return users
  }




  // Get one user by email
  @Get('useremail/:email')
  async getOneUserByEmail(@Param('email') email: string): Promise<User | null> {
    return await this.usersService.getOneUserByUnique({ email: String(email) });
  }

  // GET with secret
  //@UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @Get('alluserswithsecret')
  async getAllUsersAndSecret(): Promise<User[]>{
    const users: User[] = await this.usersService.getAllUsersWithSecret()
    return users
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Get('userwithsecret/:id')
  async getOneUserByIdWithSecret(@Param('id') id: string): Promise<User | null> {
    return await this.usersService.getOneUserByUniqueWithSecret({ id: String(id) });
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @Get('useremailwithsecret/:email')
  async getOneUserByEmailWithSecret(@Param('email') email: string): Promise<User | null> {
    return  await this.usersService.getOneUserByUniqueWithSecret({ email: String(email) });
  }

// GET User(s) with links
  @UseGuards(JwtAuthGuard)
  @Get('alluserswithalllinks')
  async getAllUsersWithAllLinks(): Promise<User[]> {
    const users: User[] = await this.usersService.getAllUsersWithAllLinks()
    return users
  }

  @Get('useremailalllinks/:email')
  async getOneUserWithAllLinks(@Param('email') email: string): Promise<User | null> {
    return await this.usersService.getOneUserByUniqueWithAllLinks({ email: String(email) });
  }


// UPDATE


// DELETE
// Soft delete
@Patch('softdeleteuser/:id')
async softDeleteUser(
  @Param('id') id: string,
  @Body() userData: Prisma.UserUpdateInput): Promise<User> {
  return this.usersService.updateOneUser({
    where: { id: String(id) },
    data:  userData ,
    });
}

// Delete one user
  // // TODO ! ADD : ADMIN privilège needed
  // @Delete('deleteoneuser/:id')
  // async deleteUser(@Param('id') id: string): Promise<User> {
  //   return this.usersService.deleteOneUser({ id: String(id) });
  // }

// SEARCH

@Get('filtered-users/:searchString')
  async getFilteredUsers(
    @Param('searchString') searchString: string,
  ): Promise<User[]> {
    return this.usersService.findUsers({
      where: {
        OR: [
          {
            firstName: { contains: searchString },
          },
          {
            lastName: { contains: searchString },
          },
          {
            email: { contains: searchString },
          },
        ],
      },
    });
  }

}
