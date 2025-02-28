import { TestBed } from '@angular/core/testing';

import { DonacionesExtranjerasService } from './donaciones-extranjeras.service';

describe('DonacionesExtranjerasService', () => {
  let service: DonacionesExtranjerasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonacionesExtranjerasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
