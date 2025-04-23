import { TestBed } from '@angular/core/testing';

import { PeruCertificadoService } from './peru-certificado.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PeruCertificadoService', () => {
  let service: PeruCertificadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PeruCertificadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
