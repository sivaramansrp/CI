import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CertificadoZoosanitarioServiceService } from './certificado-zoosanitario.service';

describe('CertificadoZoosanitarioServiceService', () => {
  let service: CertificadoZoosanitarioServiceService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CertificadoZoosanitarioServiceService]
    });
    
    service = TestBed.inject(CertificadoZoosanitarioServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should have a defined service', () => {
    expect(service).toBeDefined();
  });
});