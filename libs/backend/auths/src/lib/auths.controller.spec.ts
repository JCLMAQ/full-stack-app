import { Test } from '@nestjs/testing';
import { AuthsController } from './auths.controller';
import { AuthsService } from './auths.service';

describe('AuthsController', () => {
  let controller: AuthsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthsService],
      controllers: [AuthsController],
    }).compile();

    controller = module.get(AuthsController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
