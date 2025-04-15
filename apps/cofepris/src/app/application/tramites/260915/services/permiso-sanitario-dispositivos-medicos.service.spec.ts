import { TestBed } from '@angular/core/testing';

import { PermisoSanitarioDispositivosMedicosService } from './permiso-sanitario-dispositivos-medicos.service';

describe('PermisoSanitarioDispositivosMedicosService', () => {
  let service: PermisoSanitarioDispositivosMedicosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermisoSanitarioDispositivosMedicosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
