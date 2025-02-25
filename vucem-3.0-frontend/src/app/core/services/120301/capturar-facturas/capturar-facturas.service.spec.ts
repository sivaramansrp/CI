import { TestBed } from '@angular/core/testing';

import { CapturarFacturasService } from './capturar-facturas.service';

describe('CapturarFacturasService', () => {
  let service: CapturarFacturasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapturarFacturasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
