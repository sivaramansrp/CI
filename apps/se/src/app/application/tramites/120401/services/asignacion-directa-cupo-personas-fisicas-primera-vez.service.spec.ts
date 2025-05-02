import { TestBed } from '@angular/core/testing';

import { AsignacionDirectaCupoPersonasFisicasPrimeraVezService } from './asignacion-directa-cupo-personas-fisicas-primera-vez.service';
import { HttpClientModule } from '@angular/common/http';

describe('AsignacionDirectaCupoPersonasFisicasPrimeraVezService', () => {
  let service: AsignacionDirectaCupoPersonasFisicasPrimeraVezService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(
      AsignacionDirectaCupoPersonasFisicasPrimeraVezService
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
