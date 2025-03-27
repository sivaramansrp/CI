import { TestBed } from '@angular/core/testing';

import { PagoDeDerechos260402Service } from './pago-de-derechos-260402.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
describe('PagoDeDerechosService', () => {
  let service: PagoDeDerechos260402Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting() 
      ]
    });
    service = TestBed.inject(PagoDeDerechos260402Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
