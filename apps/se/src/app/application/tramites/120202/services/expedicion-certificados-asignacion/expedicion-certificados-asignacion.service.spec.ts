import { TestBed } from '@angular/core/testing';

import { ExpedicionCertificadosAsignacionService } from './expedicion-certificados-asignacion.service';

describe('ExpedicionCertificadosAsignacionService', () => {
  let service: ExpedicionCertificadosAsignacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpedicionCertificadosAsignacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
