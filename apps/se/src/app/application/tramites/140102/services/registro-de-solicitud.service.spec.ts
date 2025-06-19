import { TestBed } from '@angular/core/testing';

import { RegistroDeSolicitudService } from './registro-de-solicitud.service';

describe('RegistroDeSolicitudService', () => {
  let service: RegistroDeSolicitudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroDeSolicitudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
