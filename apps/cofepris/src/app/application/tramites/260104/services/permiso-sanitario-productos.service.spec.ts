import { TestBed } from '@angular/core/testing';

import { PermisoSanitarioProductosService } from './permiso-sanitario-productos.service';

describe('PermisoSanitarioProductosService', () => {
  let service: PermisoSanitarioProductosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermisoSanitarioProductosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
