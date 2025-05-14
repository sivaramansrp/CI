import { TestBed } from '@angular/core/testing';

import { ModificacionProgramaImmexBajaSubmanufactureraService } from './modificacion-programa-immex-baja-submanufacturera.service';
import { HttpClientModule } from '@angular/common/http';

describe('ModificacionProgramaImmexBajaSubmanufactureraService', () => {
  let service: ModificacionProgramaImmexBajaSubmanufactureraService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(ModificacionProgramaImmexBajaSubmanufactureraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
