import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma';
import { Prisma, RefreshToken } from '@prisma/prisma-client-new';

@Injectable()
export class RefreshTokenIdsStorageService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.RefreshTokenCreateInput): Promise<RefreshToken> {
    const token = this.prisma.refreshToken.create({ data });
    return token;
  }
}
