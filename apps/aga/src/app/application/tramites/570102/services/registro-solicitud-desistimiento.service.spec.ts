import { TestBed } from '@angular/core/testing';

import { RegistroSolicitudDesistimientoService } from './registro-solicitud-desistimiento.service';

describe('RegistroSolicitudDesistimientoService', () => {
  let service: RegistroSolicitudDesistimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroSolicitudDesistimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
