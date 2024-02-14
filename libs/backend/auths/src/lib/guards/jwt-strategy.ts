import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { PrismaService } from '@prisma/prisma';
import { I18nService } from 'nestjs-i18n';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserAuthUtilityService } from '../services/user-auth-utility.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  // The email is the user name
  constructor(
    // private usersService: UsersService,
    private prismaService: PrismaService,
    private configService: ConfigService,
    private userAuthService: UserAuthUtilityService,
    private i18n: I18nService,
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env['JWT_SECRET'],
    });
  }


  async validate(payload: any) {
    // console.log("validate user: ", payload)
    const user = await this.userAuthService.getOneUserByUnique({email: payload.username});
    // console.log("user found : ", user)
//    const user = await this.usersService.userStillActive(payload.username);

  if (!user ) {
    throw new UnauthorizedException("User not found");
  }
    if(user.isDeletedDT != null ) {
      throw new UnauthorizedException("Deleted User");
    }
    if(user.isSuspended != null) {
      throw new UnauthorizedException("Suspended User")
    }
    if(this.configService.get("REGISTRATION_VALIDATION") == 1 && user.isValidated === null) {
      throw new UnauthorizedException("User found but unvalidated registration");
    }


    // Verify that the JWT payload is not cancel (even if the JWT is still valid - expiration time still OK)
    // The idea is that the logout action unvalid the API token

    // Only if JWT LOGOUT enable
    if(this.configService.get("JWT_LOGOUT_ENABLE") == 1) {
      const tokenExist = await this.prismaService.token.findFirst({
        where: {
          userId: { equals: user.id },
          type: { equals: "API" },
        }
      });
      if(tokenExist) {
        if(!tokenExist.valid){
          throw new UnauthorizedException("Invalid token");
        }
      }
    }
    return { userId: payload.sub, username: payload.username, role: user.Roles };
  }
}
