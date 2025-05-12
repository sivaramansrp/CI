import { TestBed } from '@angular/core/testing';

import { DomicilioDelEstablecimientoService } from './domicilio-del-establecimiento.service';

describe('DomicilioDelEstablecimientoService', () => {
  let service: DomicilioDelEstablecimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomicilioDelEstablecimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
