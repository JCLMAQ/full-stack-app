// import { Public } from '@be/common';
import { JoiValidationPipe, Public } from '@be/common';
import { Auth, AuthType } from '@be/iam';
import { Body, Controller, Get, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { Prisma, Token, User } from '@prisma/client';
import { I18nLang, I18nService } from 'nestjs-i18n';
import { AuthsService } from './auths.service';
import { AuthDto } from './dto/auth.dto';
import { ChangePwdDto } from './dto/changepwd-auth.dto';
import { EmailAuthDto } from './dto/email-auth.dto';
import { ForgotEmailAuthDto } from './dto/forgot-email-auth.dto';
import { ForgotAuth } from './dto/forgot-pwd-auth.dto';
import { RegisterAuthDto, registerSchema } from './dto/register-auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AccountValidationService } from './services/account-validation.service';
import { LoginwithpwdService } from './services/loginwithpwd.service';
import { UserAuthUtilityService } from './services/user-auth-utility.service';


@Public()
@Auth(AuthType.None) // This allows public routes-
@Controller('auths')
export class AuthsController {
  constructor(
    private authService: AuthsService,
    private loginWithPasswdService: LoginwithpwdService,
    private i18n: I18nService,
    private userAuthService: UserAuthUtilityService,
    private accountValidationService: AccountValidationService
    ) {
  }


  // Verify if the user exist (with his email)
// @Public()
  @UseGuards(JwtAuthGuard)
  @Get('auth/checkCredential/:emailCheck')
  async checkCredential(@Param('emailCheck') emailCheck: string, @I18nLang() lang: string ) {
      const userEmail= { email: emailCheck }
      const user = await this.userAuthService.getOneUserByUnique(userEmail);
      if (!user) {
        return {
          success: false,
          message: await this.i18n.translate("auths.EMAIL_NOT_FOUND",{ lang: lang, }) //'no email found'
        }
      }
      const fullName: string | null | undefined  = await this.userAuthService.generateFullName(user)
      return {
          email: user.email,
          fullName: fullName
      };
  }


  // Login with password (and email) - Sign-in
  @UseGuards(LocalAuthGuard) // Local strategy verify the password
  @Post('auth/loginwithpwd')
  async loginWithPwd(@Body() userCredential: AuthDto, @I18nLang() lang: string): Promise<unknown> {
      return await this.loginWithPasswdService.loginWithPwd(userCredential.email, userCredential.password, lang);
  }

  // Logout with password and email authentication - Sign-out
  @UseGuards(JwtAuthGuard)
  @Post('auth/logoutwithpwd')
  async logoutPwd(@Body() userCredential: AuthDto, @I18nLang() lang: string ): Promise<unknown> {
      const isOK = await this.authService.logout(userCredential.email, lang);
      if (!isOK) {
          return {
              success: false,
              message: await this.i18n.translate("auths.AUTH_LOGOUT_FAILED",{ lang: lang, }) //'Logout failed'
          }
      }
      const user = '';
      const authJwtToken = '';
      return { user, authJwtToken }
  }
  // Register - Sign-up
  @Post('auth/registerwithpwd')
  @UsePipes(new JoiValidationPipe(registerSchema)) // Joi Schema according : https://www.notion.so/jclmaq5510/Data-Validation-with-Joi-502789ddb6f349ea9d79d0447899cf3d?pvs=4
  async registerWithPwd(@Body() registerUserDto: RegisterAuthDto, @I18nLang() lang: string): Promise<unknown> {
    const isRegistered = await this.loginWithPasswdService.registerWithPwd(registerUserDto, lang);
    switch(isRegistered) {
      case "USER_CREATED": {
        return {
          success: true,
          message: await this.i18n.translate("auths.REGISTRATION_DONE",{ lang: lang, }) //'Registration done'
        }
        break;
      }
      case "REGISTRATION_ERROR": {
        return {
          success: false,
          message: await this.i18n.translate("auths.REGISTRATION_FAIL",{ lang: lang, }) // Registration failed
        }
        break;
      }
      case "USER_TO_VALIDATE": {
        return {
          success: false,
          message: await this.i18n.translate("auths.REGISTRATION_TO_VALIDATE",{ lang: lang, }) // Registration failed
        }
        break;
      }
      case "USER_VALIDATION_ERROR": {
        return {
          success: false,
          message: await this.i18n.translate("auths.REGISTRATION_FAIL",{ lang: lang, }) // Registration failed
        }
        break;
      }
      default: {
        return {
          success: true,
          message: await this.i18n.translate("auths.REGISTRATION_FAIL",{ lang: lang, }) // Registration failed
        }
        break;
      }
    }
}

  /*
  **** CHANGE PWD Process
  */

  @UseGuards(JwtAuthGuard)
  @Post('auth/changepwd')
  async changetPwd(@Body() userChangePwd: ChangePwdDto, @I18nLang() lang: string ): Promise<unknown> {
    const userWhereUniqueInput: Prisma.UserWhereUniqueInput = { email: userChangePwd.email?.toLowerCase()};
    // Verify that dtat are not null or undifined


    const isOK = await this.loginWithPasswdService.changePasswordProcess(userWhereUniqueInput, userChangePwd.oldPassword, userChangePwd.newPassword, userChangePwd.verifyPassword, lang);
    if (!isOK) {
        return {
            success: false,
            message: await this.i18n.translate("auths.CHANGE_PWD_ERROR",{ lang: lang, })
        }
    }
    return {
      success: true,
      message: await this.i18n.translate("auths.CHANGE_PWD_SUCCESS",{ lang: lang, })
      }
  }

  /*
  ACCOUNT_VALIDATION_EMAIL
  */

  // Account validation with a token
  @Get('auth/valid-account/:token')
  async accountValidation(@Param() params: {token: string}, @I18nLang() lang: string): Promise<unknown> {
      let valideTkn: Token;
      try {
          valideTkn = await this.accountValidationService.verifyAccountValidationToken(params.token, lang);
          const userUpdated = await this.accountValidationService.editUserAccountValidStatute(valideTkn.userId);
          if (userUpdated && userUpdated.id) return {
              success: true,
              message: await this.i18n.translate("auths.ACCOUNT_VALIDATION_SUCCESS",{ lang: lang, }) //'Account validation Succesfull'
          }
          return {
              success: false,
              message: await this.i18n.translate("auths.ACCOUNT_VALIDATION_FAIL",{ lang: lang, }) //'Account Validation Process error'
          }
      } catch (error) {
          return {
              success: false,
              message: `${error}`
          }
      }
      return valideTkn;
  }

  // Ask for a new Account Validation email
  @Post('auth/new-email-validation-Account')
  async emailAccountValidationwithYoken(@Body() emailAuthDto: EmailAuthDto, @I18nLang() lang: string): Promise<unknown> {
    // Verify if user exist
    const email = {email: emailAuthDto.email}
    const userExist = await this.userAuthService.getOneUserByUnique(email)
    if(!userExist) {
      return {
        success: false,
        message: await this.i18n.translate("auths.ACCOUNT_VALIDATION_NO_USER",{ lang: lang, }) //'User Does not exist'
      }
    }
    // If account alearedy validated : stop the process
    if(userExist.isValidated !== null) {
      return {
        success: false,
        message: await this.i18n.translate("auths.ACCOUNT_VALIDATION_ALREADY_DONE",{ lang: lang, }) // Account already validated.
      }
    }
    try {
        const validationEmailSend = await this.accountValidationService.sendEmailAccountValidation(email, lang)
        if(!validationEmailSend) {
          return {
            success: false,
            message: await this.i18n.translate("auths.ACCOUNT_VALIDATION_EMAIL_NOT_SENT",{ lang: lang, })//'Account Validation Process error'
          }

        } else {
          return {
            success: true,
            message: await this.i18n.translate("auths.ACCOUNT_VALIDATION_EMAIL_SENT",{ lang: lang, }) //'Email for validation sent'
          }
        }
    } catch (error) {
      return {
          success: false,
          message: `${error}`
      }
    }
  }


/*
  Forgot Password Part of login with password
*/
    // Send the forgot password email (with the link to come back and change password)

    //@UseGuards(LocalAuthGuard)
    @Post('auth/email/forgot-password')
    async sendEmailForgotPassword(@Body() emailForgot: ForgotEmailAuthDto, @I18nLang() lang: string): Promise<unknown> {
        try {
            const isEmailSent = await this.loginWithPasswdService.sendEmailForgotPwd(emailForgot, lang);
            if (isEmailSent) {
                return {
                    success: true,
                    message: await this.i18n.translate("auths.FORGOT_PWD_EMAIL_SENT",{ lang: lang, }) //'Email sent succefully'
                }
            } else {
                return {
                    success: false,
                    message: await this.i18n.translate("auths.FORGOT_PWD_EMAIL_NOT_SENT",{ lang: lang, }) //'Email not sent'
                }
            }
        } catch (error) {
            return {
                answer: "bad news...",
                success: false,
                message: `${error}`
            }
        }
    }

    // Validate the password forgot token send back
    // @UseGuards(LocalAuthGuard)
    @Get('auth/email/reset-password/:token')
    async validateToken(@Param() params: {token: string}, @I18nLang() lang: string): Promise<unknown> {
        let valideTkn: Token;
        try {
            valideTkn = await this.loginWithPasswdService.verifyForgotPwdToken(params.token, lang);
        } catch (error) {
            return {
                success: false,
                message: `${error}`
            }
        }
        return valideTkn;
    }

    // Reset forgotpwd: the new password and the verification password
    @Post('auth/email/reset-password/:token')
    async resetPwd(@Param() params: {token: string}, @Body() forgotAuth: ForgotAuth, @I18nLang() lang: string): Promise<unknown> {
        const { newPassword, verifyPassword } = forgotAuth;
        let valideTknObj: Token | null;
        let user: User | null;

        try {
            valideTknObj = await this.loginWithPasswdService.verifyForgotPwdToken(params.token, lang);
        } catch (error) {
            return {
                success: false,
                message: `${error}`
            }
        }
        if (!valideTknObj) return {
            success: false,
            message: await this.i18n.translate("auths.FORGOT_PWD_BAD_TOKEN",{ lang: lang, }) //'Invalid token'
        }

        try {
          const userId = { id: valideTknObj.userId};
          user = await this.userAuthService.getOneUserByUnique(userId);
        } catch (error) {
            return {
                success: false,
                message: `${error}`
            }
        }
        if (!user) return {
            success: false,
            message: await this.i18n.translate("auths.FORGOT_PWD_BAD_TOKEN",{ lang: lang, }) //'invalid user'
        }
        if (!newPassword || !verifyPassword || (newPassword !== verifyPassword)) return {
            success: false,
            message: await this.i18n.translate("auths.FORGOT_PWD_BAD_PWD",{ lang: lang, }) // 'invalid password'
        }
        const userUpdated = await this.loginWithPasswdService.editForgotPwd(newPassword, user.id);
        if (userUpdated && userUpdated.id) return {
            success: true,
            message: await this.i18n.translate("auths.FORGOT_PWD_NEW_PWD_OK",{ lang: lang, }) // 'Updated succefully'
        }
        return {
            success: false,
            message: await this.i18n.translate("auths.FORGOT_PWD_ERROR",{ lang: lang, }) //'Error on update'
        }
      }

}
