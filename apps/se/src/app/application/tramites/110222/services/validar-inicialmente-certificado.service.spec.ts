import { TestBed } from '@angular/core/testing';

import { ValidarInicialmenteCertificadoService } from './validar-inicialmente-certificado.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ValidarInicialmenteCertificadoService', () => {
  let service: ValidarInicialmenteCertificadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ValidarInicialmenteCertificadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
