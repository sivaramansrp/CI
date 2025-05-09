import { TestBed } from '@angular/core/testing';

import { CancelacionGarantiaService } from './cancelacion-garantia.service';

describe('CancelacionGarantiaService', () => {
  let service: CancelacionGarantiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CancelacionGarantiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
