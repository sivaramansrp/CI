import { TestBed } from '@angular/core/testing';

import { RegistroSolicitudServiceService } from './registro-solicitud-service.service';

describe('RegistroSolicitudServiceService', () => {
  let service: RegistroSolicitudServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroSolicitudServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
