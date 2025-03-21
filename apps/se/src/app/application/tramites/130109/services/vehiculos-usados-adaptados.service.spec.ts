import { TestBed } from '@angular/core/testing';

import { VehiculosUsadosAdaptadosService } from './vehiculos-usados-adaptados.service';

describe('VehiculosUsadosAdaptadosService', () => {
  let service: VehiculosUsadosAdaptadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiculosUsadosAdaptadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
