import { Test } from '@nestjs/testing';
import { AuthsService } from './auths.service';

describe('AuthsService', () => {
  let service: AuthsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthsService],
    }).compile();

    service = module.get(AuthsService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
