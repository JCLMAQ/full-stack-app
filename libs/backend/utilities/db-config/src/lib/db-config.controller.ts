import { Controller } from '@nestjs/common';
import { DbConfigService } from './db-config.service';

@Controller('db-config')
export class DbConfigController {
  constructor(private dbConfigService: DbConfigService) {}
}
