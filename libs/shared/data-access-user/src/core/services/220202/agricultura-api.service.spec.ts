import { TestBed } from '@angular/core/testing';

import { AgricultureApiService } from './agriculture-api.service';

describe('AgricultureApiService', () => {
  let service: AgricultureApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgricultureApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});