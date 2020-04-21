import { TestBed } from '@angular/core/testing';

import { ErrorManagerService } from './error-manager.service';

describe('ErrorManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorManagerService = TestBed.get(ErrorManagerService);
    expect(service).toBeTruthy();
  });
});
