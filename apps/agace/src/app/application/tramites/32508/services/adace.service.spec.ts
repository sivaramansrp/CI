import { TestBed } from '@angular/core/testing';

import { AdaceService } from './adace.service';

describe('AdaceService', () => {
  let service: AdaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
