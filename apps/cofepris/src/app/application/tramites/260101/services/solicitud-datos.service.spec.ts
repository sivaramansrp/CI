import { TestBed } from '@angular/core/testing';
import { SolicitudDatosService } from './solicitud-datos.service';

describe('SolicitudDatosService', () => {
  let service: SolicitudDatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudDatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
