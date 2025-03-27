import { TestBed } from '@angular/core/testing';

import { PagoDeDerechosService } from './pago-de-derechos.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
describe('PagoDeDerechosService', () => {
  let service: PagoDeDerechosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting() 
      ]
    });
    service = TestBed.inject(PagoDeDerechosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
