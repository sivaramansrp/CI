import { TestBed } from '@angular/core/testing';

import { ModificacionProgramaImmexBajaSubmanufactureraService } from './modificacion-programa-immex-baja-submanufacturera.service';
import { HttpClientModule } from '@angular/common/http';

describe('ModificacionProgramaImmexBajaSubmanufactureraService', () => {
  let service: ModificacionProgramaImmexBajaSubmanufactureraService;

  beforeEach(async () => {
       await TestBed.configureTestingModule({
          imports: [HttpClientModule]
        }).compileComponents();
      });
      service = TestBed.inject(ModificacionProgramaImmexBajaSubmanufactureraService);

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
