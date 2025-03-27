import { TestBed } from '@angular/core/testing';

import { CamCertificadoService } from './cam-certificado.service';

describe('CamCertificadoService', () => {
  let service: CamCertificadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CamCertificadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
