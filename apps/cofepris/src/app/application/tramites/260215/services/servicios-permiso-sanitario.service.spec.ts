import { TestBed } from '@angular/core/testing';

import { ServiciosPermisoSanitarioService } from './servicios-permiso-sanitario.service';

describe('ServiciosPermisoSanitarioService', () => {
  let service: ServiciosPermisoSanitarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosPermisoSanitarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
