import { TestBed } from '@angular/core/testing';

import { ControlPermisosPreviosExportacionService } from './control-permisos-previos-exportacion.service';

describe('ExportacionMineralesDeHierroService', () => {
  let service: ControlPermisosPreviosExportacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlPermisosPreviosExportacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
