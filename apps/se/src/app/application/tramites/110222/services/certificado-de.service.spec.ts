import { TestBed } from '@angular/core/testing';

import { CertificadoDeService } from './certificado-de.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CertificadoDeService', () => {
  let service: CertificadoDeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CertificadoDeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
