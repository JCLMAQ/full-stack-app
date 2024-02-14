import { BcryptService, CommonModule, HashingService } from '@be/common';
import jwtConfig from '@be/jwtconfig';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '@prisma/prisma';
import { ApiKeysRepository } from './authentication/api-keys/api-key.repository';
import { ApiKeysService } from './authentication/api-keys/api-keys.service';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { AccessTokenGuard } from './authentication/guards/access-token/access-token.guard';
import { ApiKeyGuard } from './authentication/guards/api-key/api-key.guard';
import { AuthenticationGuard } from './authentication/guards/authentication/authentication.guard';
import { OtpAuthenticationService } from './authentication/otp-authentication/otp-authentication.service';
import { InvalidatedRefreshTokenError } from './authentication/refresh-token-ids.storage/invalid-refresh-token.error';
import { RefreshTokenIdsStorage } from './authentication/refresh-token-ids.storage/refresh-token-ids.storage';
import { RefreshTokenIdsStorageService } from './authentication/refresh-token-ids.storage/refresh-token-ids.storage.service';
import { PermissionsGuard } from './authorization/guards/permissions/permissions.guard';
import { PoliciesGuard } from './authorization/guards/polycies/policies.guard';
import { RolesGuard } from './authorization/guards/roles/roles.guard';
import { PolicyHandlerStorage } from './authorization/policies/policy-handlers.storage';
// import { BcryptService } from './hashing/bcrypt.service';
// import { HashingService } from './hashing/hashing.service';

@Module({
  imports: [
    // UsersModule,
    PrismaModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    CommonModule,
  ],
  providers: [
   {
      provide: HashingService,
      useClass: BcryptService, // 👈
    },

  // All routes need authentication unles mark with @Public
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },

    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PoliciesGuard,
    },
    AccessTokenGuard,
    ApiKeyGuard,
    AuthenticationService,
    ApiKeysService,
    ApiKeysRepository,
    PolicyHandlerStorage,
    RefreshTokenIdsStorageService,
    RefreshTokenIdsStorage,
    InvalidatedRefreshTokenError,
    OtpAuthenticationService,
  ],
  controllers: [AuthenticationController],
})
export class IamModule {}
