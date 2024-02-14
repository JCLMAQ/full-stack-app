import { DbConfigService } from '@be/db-config';
import { TimeUtilService } from '@be/time-util';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Token, TokenType } from '@prisma/client';
import { PrismaService } from '@prisma/prisma';
// import * as MilliSecond from 'ms';
import MilliSecond = require("ms");


@Injectable()
export class TokenService {

constructor(
  private readonly dbConfigService: DbConfigService,
  private prismaService: PrismaService,
  private jwtService: JwtService,
  private timeUtilitiesService: TimeUtilService
) { }

// Generate a random 8 digit number as the email token. ! token are to be unique so need to be run until an unique one is created...
async generateEmailToken(): Promise<string> {
  let emailToken = Math.floor(10000000 + Math.random() * 90000000).toString();
  let tokenAlreadyExist = await this.prismaService.token.findFirst({
    where: {
      emailToken: { equals: emailToken }
    }
  });
  // Create a new emailToken if already exist
  while (
    tokenAlreadyExist != null && typeof(tokenAlreadyExist) == "object"
  ) {
    emailToken = Math.floor(10000000 + Math.random() * 90000000).toString()
    tokenAlreadyExist = await this.prismaService.token.findFirst({
    where: {
      emailToken: { equals: emailToken}
    }});
  }
  return emailToken
}

// Generate the expiration time of the email token (pwdless and forgotpwd email and new accuont validation)
async emailTokenExpiration(usageType: string): Promise<Date> {
  let expirationTime: string;
  switch(usageType) {
    case "EMAIL": {
      expirationTime = "EMAIL_TOKEN_EXPIRATION"
      break;
    }
    case "FORGOTPWD": {
      expirationTime = "FORGOTPWD_TOKEN_EXPIRATION"
      break;
    }
    case "ACCOUNTVALIDATION": {
      expirationTime = "ACCOUNT_VALIDATION_TOKEN_EXPIRATION"
      break;
    }
    default: {
      expirationTime = "EMAIL_TOKEN_EXPIRATION"
      break;
    }
  }
  const tokenExpirationTime = await this.dbConfigService.searchConfigParam( expirationTime );
  const milliSecondToAdd = MilliSecond(tokenExpirationTime);
  const currentDate = new Date();
  const tokenExpirationDate = new Date(currentDate.getTime()+ milliSecondToAdd);
  return tokenExpirationDate
}

/*
JWT part
*/

// Generate a signed JWT token with the tokenId in the payload
async generateAuthToken(userEmail: string, userId: string, role: string): Promise<object> {
  const jwtPayload = { username: userEmail, sub: userId, role: role}
  return  {
    access_token: this.jwtService.sign(jwtPayload)
  }
}

// Generate the expiration time of the JWT token
async jwtTokenExpiration() {
  const delayToAdd = await this.dbConfigService.searchConfigParam( "JWT_VALIDITY_DURATION" );
  // const delayToAdd = this.configService.get<string>("JWT_VALIDITY_DURATION")
  const milliSecondToAdd = MilliSecond(delayToAdd);
  const currentDate = new Date();
  const jwtTokenExpirationDate =  new Date(currentDate.getTime()+ milliSecondToAdd);
  return jwtTokenExpirationDate
}

// Update or create the API or EMAIL or FORGOTPWD or ACCOUNT validation token
async mgtToken(userId: string, tokenType: TokenType, emailToken: string, logout: boolean): Promise<Token > {
  // For logout:  logout is true, valid has to be false

  // Email token has to be unique, so for API token use the userId to fill it
  if(emailToken === ""){ emailToken = userId };

  // Find the token with the userid and the type
  let tokenExist = await this.prismaService.token.findFirst({
    where: {
      userId: { equals: userId },
      type: { equals:tokenType },
    }
  })

  let tokenId = 0
  let tokenExpiration= new Date();

  if(!tokenExist) {
    tokenId = 0;
  } else {
    tokenId = tokenExist.id;
    tokenExpiration = tokenExist.expiration
  }
  // Define the token expiration time
  // Do not change it if logout
  if(!logout) {
    switch(tokenType) {
      case "EMAIL": {
        tokenExpiration = await this.emailTokenExpiration( "EMAIL_TOKEN_EXPIRATION")
        break;
      }
      case "FORGOT": {
        tokenExpiration = await this.emailTokenExpiration( "FORGOTPWD_TOKEN_EXPIRATION")
        break;
      }
      case "ACCOUNT": {
        tokenExpiration = await this.emailTokenExpiration( "ACCOUNT_VALIDATION_TOKEN_EXPIRATION")
        break;
      }
      case "API": {
        tokenExpiration = await this.jwtTokenExpiration() // By default the expiration is the "EMAIL_TOKEN_EXPIRATION" one
        break;
      }
      default: {
        tokenExpiration = await this.emailTokenExpiration( "EMAIL_TOKEN_EXPIRATION")
        break;
      }
    }
  }

  // Create or update a longlived token record
  tokenExist = await this.prismaService.token.upsert({
    where: {
      id: tokenId
    },
    update: {
      emailToken,
      type: tokenType,
      expiration: tokenExpiration,
      valid: !logout
    },
    create: {
      emailToken,
      type: tokenType,
      expiration: tokenExpiration,
      userId: userId,
      valid: !logout
    }
  })
  return tokenExist
}

  async invalidEmailToken(userId: string){
    // Reinit the emailToken - keep the token record for the email, and scratch the token
    const tokenEmailExist = await this.prismaService.token.findFirst({
      where: {
        userId: { equals: userId },
        type: { equals:TokenType.EMAIL },
      }
    })
    if(tokenEmailExist) {
      const tokenEmailId = tokenEmailExist.id;
      // const delayMilliSecond =
      const delayValue = await this.dbConfigService.searchConfigParam( "EMAIL_TOKEN_EXPIRATION" )
      const delayMilliSecond = (MilliSecond(delayValue))*2;
      const newExpirationDate = await this.timeUtilitiesService.dateLessDelay(tokenEmailExist.expiration, delayMilliSecond)
      // Update a longlived token record
      await this.prismaService.token.update({
        where: {
          id: tokenEmailId
        },
        data: {
          emailToken: "",
          expiration: newExpirationDate,
          valid: false
        }
      })
    }
  }

}
