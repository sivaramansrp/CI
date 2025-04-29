import { TestBed } from '@angular/core/testing';

import { ModificacionProgramaImmexBajaSubmanufactureraService } from './modificacion-programa-immex-baja-submanufacturera.service';

describe('ModificacionProgramaImmexBajaSubmanufactureraService', () => {
  let service: ModificacionProgramaImmexBajaSubmanufactureraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModificacionProgramaImmexBajaSubmanufactureraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
