import { TestBed } from '@angular/core/testing';

import { DesistimientoSolicitudService } from './desistimiento-solicitud.service';

describe('DesistimientoSolicitudService', () => {
  let service: DesistimientoSolicitudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesistimientoSolicitudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
