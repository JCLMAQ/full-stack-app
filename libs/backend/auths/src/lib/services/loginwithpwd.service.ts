
import { StringUtilities } from '@be/common';
import { DbConfigService } from '@be/db-config';
import { MailsService } from '@be/mails';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma, Role, Token, TokenType, User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma';
import { randomBytes } from 'crypto';
import { I18nService } from 'nestjs-i18n';
import { AuthsService } from '../auths.service';
import { ForgotEmailAuthDto } from '../dto/forgot-email-auth.dto';
import { RegisterAuthDto } from '../dto/register-auth.dto';
import { AccountValidationService } from './account-validation.service';
import { TokenService } from './token.service';
import { UserAuthUtilityService } from './user-auth-utility.service';


// type UserCredential = {
//   email: string;
//   password?: string;
// }


@Injectable()
export class LoginwithpwdService {

  constructor(
    private authService: AuthsService,
    private dbConfigService: DbConfigService,
    private prismaService: PrismaService,
    private configService: ConfigService,
    private jwtService: JwtService,
    private tokenService: TokenService,
    private i18n: I18nService,
    private userAuthService: UserAuthUtilityService,
    private stringUtilities: StringUtilities,
    private mailService: MailsService,
    private accountValidationService: AccountValidationService
  ) { }

/*
    Email and password Authentication
*/

  async loginWithPwd(email: string , plaintextPassword: string | undefined, lang: string) {
    // Verify the email domain (if restriction active) and the structure of the email
    email = email.toLowerCase(); // Always use lower case email
    const emailValidation = await this.mailService.emailValidationProcess(email, lang)
    if(!emailValidation) {
      throw new HttpException(await this.i18n.translate("auths.EMAIL_BAD",{ lang: lang, }), 400);
    }
      // Verify that the user exist
      const userFound = await this.userAuthService.getOneUserByUnique({email});
      if(!userFound) {
        // need to register first
        throw new HttpException(await this.i18n.translate("auths.REGISTER_FIRST",{ lang: lang, }), 400);
      }

      // Verify if the Account is well validated
      const accountValidationActiveted = (await this.dbConfigService.searchConfigParam( "ACCOUNT_VALIDATION_EMAIL" ) === "1");
      if(accountValidationActiveted){
        if(userFound.isValidated === null) {
        // The Account need to be validated fisrt.
        throw new HttpException(await this.i18n.translate("auths.ACCOUNT_TO_VALIDATE",{ lang: lang, }), 400);
      }
      }

      // Create the token.API if LOGOUT with JWT cancellation
      if(await this.dbConfigService.searchConfigParam( "JWT_LOGOUT_ENABLE") === "1") {
        // Create or update the token
        await this.tokenService.mgtToken(userFound.id, "API", "", false )
      }
      // Buildup the payload for the access token
      const payload = { username: userFound.email, sub: userFound.id, role: userFound.Roles };
      // Full Name replacement
      const fullName = await this.userAuthService.generateFullName(userFound)
      return {
        access_token: this.jwtService.sign(payload),
        fullName: fullName,
        roles: userFound.Roles
      };
    }

  // Create one new user when register with a password and an email as username
  async registerWithPwd(userRegisterData: RegisterAuthDto , lang: string): Promise<string> {
    let result = "REGISTRATION_ERROR";
    // Register always email with lower case
    userRegisterData.email = userRegisterData.email.toLowerCase();
    // Verify if the limitation to the email API is activeted and if the email is conform
    const emailValidation = await this.mailService.emailValidationProcess(userRegisterData.email, lang);
    if(!emailValidation) {
      throw new HttpException(await this.i18n.translate("auths.EMAIL_BAD",{ lang: lang, }), 400);
    }
    // Is the User already registred ? If yes send an error, If not create the new user
    const userExist = await this.userAuthService.getOneUserByUnique({email: userRegisterData.email});
    if(userExist !== null) {
      // User exist in the DB
      if(userExist?.isDeletedDT) {
        // User still exist but has been soft deleted !
        throw new HttpException(await this.i18n.translate("auths.REGISTER_ADMIN_CONTACT",{ lang: lang, }), 400);
      }
        // Already registered...
      throw new HttpException(await this.i18n.translate("auths.REGISTER_ALREADY",{ lang: lang, }), 400);
    } else {
      // User does not exist: create the new user
        // ! For security, if Role is not defined or Role is definad as ADMIN , register  the user as "GUEST"
        if(userRegisterData.Roles !== null) {
          userRegisterData.Roles = [Role.GUEST]
        }


        // Pwd and VerifyPWd : verify the equality
        const passwordValid = await this.stringUtilities.compareStricklyString (userRegisterData.password, userRegisterData.verifyPassword );
        if(!passwordValid) {
          throw new HttpException(await this.i18n.translate("auths.PWD_BAD",{ lang: lang, }), 400);
        }
        // Create a salt and Hash the password with it
        const salt = randomBytes(16).toString('base64');
        const pwdHash = await this.authService.hashPassword(userRegisterData.password, salt);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, verifyPassword, ...userDataWithoutThePwd } =userRegisterData;
        // Try to create a new user
        const userCreated = await this.userAuthService.createOneUserWithPwd(userDataWithoutThePwd, pwdHash, salt);
        // If the creation failed, send an error
        if(userCreated === null) {
          // Throw an error
          throw new HttpException(await this.i18n.translate("auths.REGISTRATION_FAIL",{ lang: lang, }), 400);
        }
        // User has been created
        // Account validation by email process
        result = await  this.accountValidationService.accountValidationEmail(result, userCreated.email, lang);
        if(result === "USER_VALIDATION_NOT_NEEDED") {
          result =  "USER_CREATED";
      }
      return result
    }
  }

/*
  Forgot Password process
*/

  async createForgotToken(email: string, userId: string, lang:string ): Promise<Token> {
    /*
    // Search for the FORGOT token
    const forgotPwd = await this.prismaService.token.findFirst({where: {userId: { equals: userId }, type: { equals:TokenType.FORGOT },}});
    let isForgotPwdTokenDelayOver = true;
    // forgotPwd token exist, need to verify if it is still within validity delay
    if(forgotPwd){
      isForgotPwdTokenDelayOver = (forgotPwd.expiration < new Date());
    }

    // Create a new expiration date or time
    const newEmailTokenExpirationTime = await this.tokenService.emailTokenExpiration("FORGOTPWD_TOKEN_EXPIRATION");
    */

    // Create a new token
    const emailToken = await this.tokenService.generateEmailToken()
    const createOrUpdateToken = await this.tokenService.mgtToken(userId, "FORGOT", emailToken , false )

    if(!createOrUpdateToken) throw new HttpException(await this.i18n.translate("auths.FORGOT_PWD_ERROR",{ lang: lang, }), 400);

    const newForgotPwd = await this.prismaService.token.findFirst({where: {userId: { equals: userId }, type: { equals:TokenType.FORGOT },}});

    if (newForgotPwd) {
      return newForgotPwd
    } else {
      throw new HttpException(await this.i18n.translate("auths.FORGOT_PWD_ERROR",{ lang: lang, }), 400);
    }
  }

  // Sending forgot password email with the link
  async sendEmailForgotPwd(emailForgotPwd: ForgotEmailAuthDto, lang: string): Promise<boolean> {
      // Register email alwayswith lower case
      emailForgotPwd.email = emailForgotPwd.email.toLowerCase();

    // Verify the email is an email and is from an accepted domain
    await this.mailService.emailValidationProcess(emailForgotPwd.email, lang);

    // Verify if the user exist
    const userExist = await this.prismaService.user.findUnique({ where: { email: emailForgotPwd.email } });
    if (!userExist) throw new HttpException(await this.i18n.translate("users.USER_EMAIL_NOT_FOUND",{ lang: lang, }), 400);
    // Need to manage soft deleted user
    if(userExist?.isDeletedDT != null) throw new HttpException(await this.i18n.translate("users.USER_DELETED",{ lang: lang, }), 400);

    // Create the forgot  password token
    const tokenForgotPwd = await this.createForgotToken(emailForgotPwd.email, userExist.id, lang);

    // If the token has been created, send the email
    if (tokenForgotPwd && tokenForgotPwd.emailToken) {
      // Config data for the email to send with the token
      const emailSender = await this.dbConfigService.searchConfigParam( "EMAIL_NOREPLY" );
      const hostWebAddress = await this.dbConfigService.searchConfigParam( "APP_FRONT_END");
      const noreply = await this.i18n.translate("auths.NOREPLYEMAIL",{ lang: lang, })
      const subjectEmail =  await this.i18n.translate("auths.SUBJECTEMAILFORGOTPWD",{ lang: lang, })
      const textEmail = await this.i18n.translate("auths.TEXTEMAILFORGOTPWD",{ lang: lang, })
      const htmlEmail = await this.i18n.translate("auths.HTMLEMAILFORGOTPWD",{ lang: lang, })

      const emailData = {
        fromEmail: `${noreply} <${emailSender}>` ,
        toEmail: emailForgotPwd.email,
        subjectEmail: `${subjectEmail}`,
        textEmail: `${textEmail}`,
        htmlEmail: `${htmlEmail} <a href='${hostWebAddress}/reset-password/${tokenForgotPwd.emailToken}'>Click here</a>` // html body
      }

      // Send the email with the link
      const sendMail = await this.mailService.sendEmailToken(emailData);

      if (!sendMail) throw new HttpException(await this.i18n.translate("auths.EMAIL_TOKEN_CRASH",{ lang: lang, }), 400);
      return sendMail
    } else throw new HttpException(await this.i18n.translate("auths.FORGOT_PWD_ERROR",{ lang: lang, }), 400);
  }

  // Verify that the token received with the forgot password link is valid and in delay (used by controlers)
  async verifyForgotPwdToken(token: string, lang: string): Promise<Token> {
    // Search for the token
    const forgotPwdModel = await this.prismaService.token.findUnique({ where: { emailToken: token } });

    // No token found :
    if (!forgotPwdModel) throw new HttpException(await this.i18n.translate("auths.FORGOT_PWD_BAD_TOKEN",{ lang: lang, }), 400);
    // Verify the token still valid (valid = true)
    // Verify the token still valid (time delay)
    const isForgotPwdTokenDelayOver = (forgotPwdModel.expiration < new Date());
    if (isForgotPwdTokenDelayOver || !forgotPwdModel.valid ) throw new HttpException(await this.i18n.translate("auths.FORGOT_PWD_BAD_TOKEN",{ lang: lang, }), 400);

    // Need to unvalid the token (token only one use)
    await this.prismaService.token.update({
      where: {
          id: forgotPwdModel.id,
      },
      data: {
          valid: false,
          // expiration: newExpirationDate
      },
    });
      return forgotPwdModel;
  }

  // Record the new password hasched with salt
  async editForgotPwd(pwd: string, userId: string): Promise<User> {
    const salt: string | undefined | null = randomBytes(16).toString('base64');
    const pwdHash: string | null | undefined = await this.authService.hashPassword(pwd, salt);
    const result = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        userSecret: {
          update: {
            salt,
            pwdHash,}
      }}
    })
    return result
  }

  /*
  Change Pwd process
  */

  async changePasswordProcess(userWhereUniqueInput: Prisma.UserWhereUniqueInput, oldPwd: string, newPwd: string, verifyPwd: string, lang: string): Promise<boolean> {
  let result = false
    // Search for the user
      // email to lower case
    userWhereUniqueInput.email = userWhereUniqueInput.email?.toLowerCase()
    const user = await this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
      include: {
        userSecret: true, // Return all fields
      }
    });
    if(!user) throw new HttpException(await this.i18n.translate("users.USER_NOT_FOUND",{ lang: lang, }), 400);

    // Verify the oldPwd for the user
    const userPwdHash = user.userSecret
    if (! await this.authService.verifyPassword(userPwdHash,oldPwd)) throw new HttpException(await this.i18n.translate("auths.PWD_BAD",{ lang: lang, }), 400);

    // Verify the newPwd with the verifyPwd
    if(newPwd !== verifyPwd) throw new HttpException(await this.i18n.translate("auths.PWD_BAD",{ lang: lang, }), 400);

    // Change the Pwd to the new one
    const salt: string | undefined | null = randomBytes(16).toString('base64');
    const pwdHash: string | null | undefined = await this.authService.hashPassword(newPwd, salt);
    const updatedUser = await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        userSecret: {
          update: {
            salt,
            pwdHash,}
      }}
    })
    // Tell all is done
    if(!updatedUser)  throw new HttpException(await this.i18n.translate("auths.CHANGE_PWD_ERROR",{ lang: lang, }), 400);
    result = true
    return result
  }
}
