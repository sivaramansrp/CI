import { TestBed } from '@angular/core/testing';

import { SolicitudProrrogaService } from './solicitud-prorroga.service';

describe('SolicitudProrrogaService', () => {
  let service: SolicitudProrrogaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudProrrogaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
