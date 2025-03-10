import { TestBed } from '@angular/core/testing';

import { RenunciaDeDerechosAlServicioService } from './renuncia-de-derechos-al-servicio.service';

describe('RenunciaDeDerechosAlServicioService', () => {
  let service: RenunciaDeDerechosAlServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RenunciaDeDerechosAlServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
