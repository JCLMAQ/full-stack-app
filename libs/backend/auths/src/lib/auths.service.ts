
import { DbConfigService } from '@be/db-config';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User, UserSecret } from '@prisma/client';
import { pbkdf2Sync } from 'crypto';
import { I18nService } from 'nestjs-i18n';
import { TokenService } from './services/token.service';
import { UserAuthUtilityService } from './services/user-auth-utility.service';


@Injectable()
export class AuthsService {

  constructor(
    private configService: ConfigService,
    private i18n: I18nService,
    private readonly dbConfigService: DbConfigService,
    private tokenService: TokenService,
    private userAuthService: UserAuthUtilityService
  ) { }

  // Local Strategy validation
  async validateUser(username: string, plainTextPassword: string): Promise<User | null> {
    const userWhereUniqueInput = { email: username.toLowerCase() }
    const user = await this.userAuthService.getOneUserByUniqueWithSecret( userWhereUniqueInput )
    if(this.configService.get('PWDLESS_LOGIN_ENABLE') == 0 && user !== null) {
      const userPwdHash = user.userSecret
      if (await this.verifyPassword(userPwdHash, plainTextPassword)) {
        return user;
      } else {
        return null;
      }
    } else {
        return user;
    }
  }

  async logout(userEmail: string, lang: string): Promise<boolean> {
    // Search for the user token and reinit for the email send token - for PwdLess login
    // Verify that the user has not been deleted or soft deleted
    userEmail = userEmail.toLowerCase();
    const userNotDeleted = await this.userAuthService.userStillActive(userEmail);
    if(!userNotDeleted) {
      throw new HttpException(await this.i18n.translate("users.USER_NOT_FOUND",{ lang: lang, }), 400)
    }
    if(userNotDeleted.isDeletedDT != null) {
      throw new HttpException(await this.i18n.translate("users.USER_DELETED",{ lang: lang, }), 400)
    }
    // Reinit the sendEmail pwdless
    await this.tokenService.invalidEmailToken(userNotDeleted.id)
    // Logout with JWT_LOGOUT_ENABLE = 1  - Does logout with a devalidation of the JWT token
    const jwtLogoutEnable = await this.dbConfigService.searchConfigParam( "JWT_LOGOUT_ENABLE" )
    if(jwtLogoutEnable === "1") {
      // If yes, then manage the API token validity
      const createOrUpdateToken = await this.tokenService.mgtToken(userNotDeleted.id, "API", "", true );
      if(! createOrUpdateToken) return false
    }
    return true;
  }


  async verifyPassword(userSecret: UserSecret | null | undefined, plainTextPassword:  string): Promise<boolean> {
    let isOK = false;
    const salt: string | null | undefined= userSecret?.salt
    const pwdHash = await this.hashPassword(plainTextPassword, salt);
    isOK = (pwdHash == userSecret?.pwdHash);
    return isOK
  }

  async hashPassword(plainTextPassword: string | undefined | null, salt: string | null | undefined): Promise<string | undefined | null>  {
    if (salt && plainTextPassword) {
      return pbkdf2Sync(plainTextPassword, Buffer.from(salt, 'base64'), 10000, 64, 'sha512')
        .toString('base64');
    }
    return plainTextPassword;
  }
}
