import { Test, TestingModule } from '@nestjs/testing';
import { AccountValidationService } from './account-validation.service';

describe('AccountValidationService', () => {
  let service: AccountValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountValidationService],
    }).compile();

    service = module.get<AccountValidationService>(AccountValidationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
