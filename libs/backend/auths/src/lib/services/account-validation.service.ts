import { DbConfigService } from '@be/db-config';
import { MailsService } from '@be/mails';
import { HttpException, Injectable } from '@nestjs/common';
import { Token, TokenType, User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma';
import { I18nService } from 'nestjs-i18n';
import { EmailAuthDto } from '../dto/email-auth.dto';
import { TokenService } from './token.service';

@Injectable()
export class AccountValidationService {

  constructor(
    private dbConfigService: DbConfigService,
    private prismaService: PrismaService,
    private tokenService: TokenService,
    private i18n: I18nService,
    private mailService: MailsService
  ) { }

/*
** Account validation: Email address validation process
*/

async accountValidationEmail(result: string, email: string, lang: string): Promise<string> {
  // if account validation needed, send the email with link to validate the account
  // Verify if the registration need a validation by email
  result = "USER_VALIDATION_NOT_NEEDED"
  const accountValidation = await this.dbConfigService.searchConfigParam( "ACCOUNT_VALIDATION_EMAIL" );
  if(accountValidation === "1") {
    // Send the validation email
    const emailAccountValidation = { email : email};
    // Sending account validation email with the link
    const validationEmailSend = await this.sendEmailAccountValidation(emailAccountValidation, lang)
    if(!validationEmailSend) {
      result = "USER_VALIDATION_ERROR"

    } else {
      result = "USER_TO_VALIDATE"
    }
  }
  return result;
}

  // Sending an account validation email with the link
  async sendEmailAccountValidation(emailAccountValidation: EmailAuthDto, lang: string): Promise<boolean> {
    // Register email always with lower case
    emailAccountValidation.email = emailAccountValidation.email.toLowerCase();
    // Verify the email is an email and is from an accepted domain (the process send directly the error if needed)
    await this.mailService.emailValidationProcess(emailAccountValidation.email, lang);
    // Verify if the user exist
    const userExist = await this.prismaService.user.findUnique({ where: { email: emailAccountValidation.email } });
    if (!userExist) throw new HttpException(await this.i18n.translate("users.USER_EMAIL_NOT_FOUND",{ lang: lang, }), 400);
    // Need to manage soft deleted user
    if(userExist?.isDeletedDT != null) throw new HttpException(await this.i18n.translate("users.USER_DELETED",{ lang: lang, }), 400);
    // Create the account validation token
    const tokenAccountValidation = await this.createAccountValidationToken(userExist.id, lang);
    // If the token has been created, send the email
    if (tokenAccountValidation && tokenAccountValidation.emailToken) {
      // Config data for the email to send with the token
      const emailSender = await this.dbConfigService.searchConfigParam( "EMAIL_NOREPLY" );
      const hostWebAddress = await this.dbConfigService.searchConfigParam( "API_URL_BACKEND");

      // Email data construction and translate
      const noreply = await this.i18n.translate("auths.NOREPLYEMAIL",{ lang: lang, })
      const subjectEmail =  await this.i18n.translate("auths.SUBJECTEMAILACCOUNTVALIDATION",{ lang: lang, })
      const textEmail = await this.i18n.translate("auths.TEXTEMAILACCOUNTVALIDATION",{ lang: lang, })
      const htmlEmail = await this.i18n.translate("auths.HTMLEMAILACCOUNTVALIDATION",{ lang: lang, })
      const emailData = {
        fromEmail: `${noreply} <${emailSender}>` ,
        toEmail: emailAccountValidation.email,
        subjectEmail: `${subjectEmail}`,
        textEmail: `${textEmail}`,
        htmlEmail: `${htmlEmail} <a href='${hostWebAddress}/auths/auth/valid-account/${tokenAccountValidation.emailToken}'>Click here</a>` // html body
      }

      // Send the email with the link
      const sendMail = await this.mailService.sendEmailToken(emailData);
      if (!sendMail) throw new HttpException(await this.i18n.translate("auths.EMAIL_TOKEN_CRASH",{ lang: lang, }), 400);
      return sendMail

    } else throw new HttpException(await this.i18n.translate("auths.ACCOUNT_VALIDATION_ERROR",{ lang: lang, }), 400);
  }

  // Create a token for the account validation token
  async createAccountValidationToken(userId: string, lang:string ): Promise<Token> {
    const emailToken = await this.tokenService.generateEmailToken()
    const createOrUpdateToken = await this.tokenService.mgtToken(userId, "ACCOUNT", emailToken , false )
    if(!createOrUpdateToken) throw new HttpException(await this.i18n.translate("auths.ACCOUNT_VALIDATION_ERROR",{ lang: lang, }), 400);
    const newAccountValidation = await this.prismaService.token.findFirst({where: {userId: { equals: userId }, type: { equals:TokenType.ACCOUNT },}});
    if (newAccountValidation) {
      return newAccountValidation
    } else {
      throw new HttpException(await this.i18n.translate("auths.ACCOUNT_VALIDATION_ERROR",{ lang: lang, }), 400);
    }
  }

  // Verify that the token received with the account validation link is valid and in delay (used by controlers)
  async verifyAccountValidationToken(token: string, lang: string): Promise<Token> {
    // Search for the token
    const accountValidation = await this.prismaService.token.findUnique({ where: { emailToken: token } });
    // No token found :
    if (!accountValidation) throw new HttpException(await this.i18n.translate("auths.ACCOUNT_VALIDATION_BAD_TOKEN",{ lang: lang, }), 400);
    // Verify the token still valid (valid = true)
    // Verify the token still valid (time delay)
    const isAccountValidationTokenDelayOver = (accountValidation.expiration < new Date());
    if (isAccountValidationTokenDelayOver || !accountValidation.valid ) throw new HttpException(await this.i18n.translate("auths.ACCOUNT_VALIDATION_BAD_TOKEN",{ lang: lang, }), 400);
    // Need to unvalid the token (token only one use)
    await this.prismaService.token.update({
      where: {
          id: accountValidation.id,
      },
      data: {
          valid: false,
      },
    });
      return accountValidation;
  }

  async editUserAccountValidStatute(userId: string): Promise<User> {
  // We do suppose that the user exist
    const userValidated = await this.prismaService.user.update({
      where: {
        id: userId,
    },
    data: {
        isValidated: new Date(),
    },
    })
    return userValidated
  }

}
