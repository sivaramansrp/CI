import { TestBed } from '@angular/core/testing';

import { Service260601Service } from './service260601.service';

describe('Service260601Service', () => {
  let service: Service260601Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Service260601Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
