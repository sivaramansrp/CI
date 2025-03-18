import { TestBed } from '@angular/core/testing';

import { PagoDeDerechosService } from './pago-de-derechos.service';

describe('PagoDeDerechosService', () => {
  let service: PagoDeDerechosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagoDeDerechosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
