import { TestBed } from '@angular/core/testing';

import { RegistroSolicitudService } from './registro-solicitud-service.service';

describe('RegistroSolicitudServiceService', () => {
  let service: RegistroSolicitudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroSolicitudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
