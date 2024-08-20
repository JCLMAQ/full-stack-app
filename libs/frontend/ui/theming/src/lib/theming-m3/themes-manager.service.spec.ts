import { TestBed } from '@angular/core/testing';

import { ThemesManagerService } from './themes-manager.service';

describe('ThemesManagerService', () => {
  let service: ThemesManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemesManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
