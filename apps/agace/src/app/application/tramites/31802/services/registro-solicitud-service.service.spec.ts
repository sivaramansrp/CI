import { TestBed } from '@angular/core/testing';
import { RegistroSolicitudService } from './registro-solicitud-service.service';

describe('RegistroSolicitudService', () => {
  let service: RegistroSolicitudService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistroSolicitudService],
    });
    service = TestBed.inject(RegistroSolicitudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});