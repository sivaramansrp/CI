import { TestBed } from '@angular/core/testing';

import { AgriculturaApiService } from './agricultura-api.service';

describe('AgriculturaApiService', () => {
  let service: AgriculturaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgriculturaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
