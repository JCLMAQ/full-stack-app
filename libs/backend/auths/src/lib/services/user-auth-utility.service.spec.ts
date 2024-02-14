import { Test, TestingModule } from '@nestjs/testing';
import { UserAuthUtilityService } from './user-auth-utility.service';

describe('UserAuthUtilityService', () => {
  let service: UserAuthUtilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAuthUtilityService],
    }).compile();

    service = module.get<UserAuthUtilityService>(UserAuthUtilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
