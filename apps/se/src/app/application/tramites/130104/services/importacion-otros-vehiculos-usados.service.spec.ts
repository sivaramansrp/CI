import { TestBed } from '@angular/core/testing';

import { ImportacionOtrosVehiculosUsadosService } from './importacion-otros-vehiculos-usadosservice';

describe('ImportacionVehiculosNuevosService', () => {
  let service: ImportacionOtrosVehiculosUsadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportacionOtrosVehiculosUsadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
