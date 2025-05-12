import { TestBed } from '@angular/core/testing';

import { CamCertificadoService } from './cam-certificado.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CamCertificadoService', () => {
  let service: CamCertificadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CamCertificadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
