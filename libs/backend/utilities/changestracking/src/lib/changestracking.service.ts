import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';

@Injectable()
export class ChangestrackingService extends PrismaCrudService {
  constructor() {
    super({
      model: 'changestracking',
      allowedJoins: [],
      defaultJoins: [],
    });
  }
}
