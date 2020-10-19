import { TestBed } from '@angular/core/testing';

import { LightModeService } from './light-mode.service';

describe('LightModeService', () => {
  let service: LightModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LightModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
