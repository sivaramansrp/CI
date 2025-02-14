import { TestBed } from '@angular/core/testing';

import { PeximService } from './pexim.service';

describe('PeximService', () => {
  let service: PeximService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeximService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
