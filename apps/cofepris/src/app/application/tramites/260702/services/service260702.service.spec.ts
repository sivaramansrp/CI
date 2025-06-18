import { TestBed } from '@angular/core/testing';

import { Service260702Service } from './service260702.service';

describe('Service260702Service', () => {
  let service: Service260702Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Service260702Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
