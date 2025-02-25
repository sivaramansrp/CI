import { TestBed } from '@angular/core/testing';

import { CertificadoZoosanitarioServiceService } from './certificado-zoosanitario.service';

describe('CertificadoZoosanitarioServiceService', () => {
  let service: CertificadoZoosanitarioServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CertificadoZoosanitarioServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});