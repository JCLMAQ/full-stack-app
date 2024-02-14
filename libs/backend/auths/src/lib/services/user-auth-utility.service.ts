import { DbConfigService } from '@be/db-config';
import { Injectable } from '@nestjs/common';
import { Prisma, Role, User, UserSecret } from '@prisma/client';
import { PrismaService } from '@prisma/prisma';

@Injectable()
export class UserAuthUtilityService {

  constructor(
    private prisma: PrismaService,
    private dbConfigService: DbConfigService
  ) {}

  async getOneUserByUnique(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null> {
    const userFound = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
    return userFound
  }

  async createOneUserWithPwd(userData:Prisma.UserCreateInput, pwdHash: string | undefined | null, salt: string | null | undefined): Promise<User | null> {
    // ! If "ACCOUNT_VALIDATION_EMAIL" = 1 The email address has to be validated before isValidated is not null
    const emailAccountValidation = (await this.dbConfigService.searchConfigParam( "ACCOUNT_VALIDATION_EMAIL") === "1")
    if (!emailAccountValidation) {userData.isValidated = new Date();} // if "ACCOUNT_VALIDATION_EMAIL" === "1", then user email validation is needed and userData.isValidated = null
    // ! WARNING A new User is always created as "GUEST" ?
    if(!userData.Roles) { userData.Roles = [Role.GUEST];}
    const result = await this.prisma.user.create({
        data: {
            email: userData.email,
            nickName: userData.nickName,
            lastName: userData.lastName,
            firstName: userData.firstName,
            Gender: userData.Gender,
            Roles: userData.Roles,
            isValidated: userData.isValidated,
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

   // Dobble with usesService to avoid circular dependency between module
  async generateFullName(user: User): Promise <string | null>{
    // Full Name replacement
    let fullName: string | null= user.firstName + " " + user.lastName;
    if((user.firstName == "") || (user.lastName == "")) {
      ( user.nickName == "") ? fullName = user.email : fullName = user.nickName
    }
    return fullName
  }

  async getOneUserByUniqueWithSecret(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User & {userSecret: UserSecret | null }| null> {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      include: {
        userSecret: true, // Return all fields
      },
    })
    return user
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
}
