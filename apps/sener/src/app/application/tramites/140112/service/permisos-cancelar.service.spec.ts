import { TestBed } from '@angular/core/testing';

import { PermisosCancelarService } from './permisos-cancelar.service';

describe('PermisosCancelarService', () => {
  let service: PermisosCancelarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermisosCancelarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
