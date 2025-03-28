import { TestBed } from '@angular/core/testing';

import { PagoDeDerechosEntradaService } from './pago-de-derechos-entrada.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
describe('PagoDeDerechosService', () => {
  let service: PagoDeDerechosEntradaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting() 
      ]
    });
    service = TestBed.inject(PagoDeDerechosEntradaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
