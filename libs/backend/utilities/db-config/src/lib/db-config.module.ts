import { Module, Global } from '@nestjs/common';
import { DbConfigController } from './db-config.controller';
import { DbConfigService } from './db-config.service';

@Global()
@Module({
  controllers: [DbConfigController],
  providers: [DbConfigService],
  exports: [DbConfigService],
})
export class DbConfigModule {}
