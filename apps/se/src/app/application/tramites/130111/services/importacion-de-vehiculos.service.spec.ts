import { TestBed } from '@angular/core/testing';

import { ImportacionDeVehiculosService } from './importacion-de-vehiculos.service';

describe('ImportacionDeVehiculosService', () => {
  let service: ImportacionDeVehiculosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportacionDeVehiculosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
