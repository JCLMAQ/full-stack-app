import { Test, TestingModule } from '@nestjs/testing';
import { LoginwithpwdService } from './loginwithpwd.service';

describe('LoginwithpwdService', () => {
  let service: LoginwithpwdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginwithpwdService],
    }).compile();

    service = module.get<LoginwithpwdService>(LoginwithpwdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
