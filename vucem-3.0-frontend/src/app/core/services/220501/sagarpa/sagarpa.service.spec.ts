import { TestBed } from '@angular/core/testing';

import { SagarpaService } from './sagarpa.service';

describe('SagarpaService', () => {
  let service: SagarpaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SagarpaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
