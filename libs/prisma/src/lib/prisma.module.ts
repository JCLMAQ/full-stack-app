import { Global, Module } from '@nestjs/common';
import { EnhancedPrismaService } from './enhanced-prisma.service';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  controllers: [],
  providers: [PrismaService, EnhancedPrismaService],
  exports: [PrismaService, EnhancedPrismaService],
})
export class PrismaModule {}
