import { TestBed } from '@angular/core/testing';

import { Service260101Service } from './service260101.service';

describe('Service260101Service', () => {
  let service: Service260101Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Service260101Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
