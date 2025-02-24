import { TestBed } from '@angular/core/testing';

import { FacturasAsociadasService } from './facturas-asociadas.service';

describe('FacturasAsociadasService', () => {
  let service: FacturasAsociadasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturasAsociadasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});