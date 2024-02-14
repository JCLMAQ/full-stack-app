import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Strategy } from 'passport-local';
import { AuthsService } from '../auths.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthsService
    ) {
    super({
      usernameField: 'email'
    });
  }

  async validate(username: string, password: string): Promise<User | null> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException("No user found");
    }
    if (user.isDeletedDT != null) {
      throw new UnauthorizedException("User is deleted");
    }
    if (user.isDeleted) { // Zen soft delete case management
      throw new UnauthorizedException("User is deleted");
    }
    if (user.isSuspended != null) {
      throw new UnauthorizedException("User is suspended");
    }
    return user;
  }

}
