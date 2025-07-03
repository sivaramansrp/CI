import { TestBed } from '@angular/core/testing';

import { EsquemaDeCertificacionService } from './esquema-de-certificacion.service';

describe('EsquemaDeCertificacionService', () => {
  let service: EsquemaDeCertificacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EsquemaDeCertificacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
