import { TestBed } from '@angular/core/testing';

import { ExpedicionCertificadosFronteraService } from './expedicion-certificados-frontera.service';

describe('ExpedicionCertificadosFronteraService', () => {
  let service: ExpedicionCertificadosFronteraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpedicionCertificadosFronteraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
