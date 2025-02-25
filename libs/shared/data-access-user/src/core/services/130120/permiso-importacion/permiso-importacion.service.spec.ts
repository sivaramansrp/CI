import { TestBed } from '@angular/core/testing';

import { PermisoImportacionService } from './permiso-importacion.service';

describe('PermisoImportacionService', () => {
  let service: PermisoImportacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermisoImportacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
