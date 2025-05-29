import { TestBed } from '@angular/core/testing';

import { SolicitudPantallasService } from './solicitud-pantallas.service';

describe('SolicitudPantallasService', () => {
  let service: SolicitudPantallasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudPantallasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
