import { TestBed } from '@angular/core/testing';

import { IdleserviceService } from './idleservice.service';

describe('IdleserviceService', () => {
  let service: IdleserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdleserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
