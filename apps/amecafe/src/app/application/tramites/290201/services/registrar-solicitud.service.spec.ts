import { TestBed } from '@angular/core/testing';

import { RegistrarSolicitudService } from './registrar-solicitud.service';

describe('RegistrarSolicitudService', () => {
  let service: RegistrarSolicitudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrarSolicitudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
