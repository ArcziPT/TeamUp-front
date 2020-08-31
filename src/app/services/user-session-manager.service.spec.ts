import { TestBed } from '@angular/core/testing';

import { UserSessionManagerService } from './user-session-manager.service';

describe('UserSessionManagerService', () => {
  let service: UserSessionManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSessionManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
