// import { ApiInterfacesModule } from '@my-app/api-interfaces';
import { MailsModule, MailsService } from '@be/mails';
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '@prisma/prisma';

import { CommonModule, StringUtilities } from '@be/common';
import { AuthsController } from './auths.controller';
import { AuthsService } from './auths.service';
import { JwtStrategy } from './guards/jwt-strategy';
import { LocalStrategy } from './guards/local.strategy';
import { AccountValidationService } from './services/account-validation.service';
import { LoginwithpwdService } from './services/loginwithpwd.service';
import { TokenService } from './services/token.service';
import { UserAuthUtilityService } from './services/user-auth-utility.service';

@Global()
@Module({
  imports: [
    PrismaModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env['JWT_SECRET'],
      signOptions: { expiresIn: process.env['JWT_VALIDITY_DURATION'] },
    }),
    MailsModule,
    CommonModule,
    // ApiInterfacesModule,
  ],
  controllers: [AuthsController],
  providers: [
    AuthsService,
    TokenService,
    JwtStrategy,
    LocalStrategy,
    LoginwithpwdService,
    MailsService,
    UserAuthUtilityService,
    StringUtilities,
    AccountValidationService,
  ],
  exports: [AuthsService],
})
export class AuthsModule {}
