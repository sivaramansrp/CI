import { TestBed } from '@angular/core/testing';

import { ImportacionVehiculosNuevosService } from './importacion-vehiculos-nuevos.service';

describe('ImportacionVehiculosNuevosService', () => {
  let service: ImportacionVehiculosNuevosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportacionVehiculosNuevosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
