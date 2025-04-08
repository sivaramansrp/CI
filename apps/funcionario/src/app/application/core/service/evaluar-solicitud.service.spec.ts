import { TestBed } from '@angular/core/testing';

import { EvaluarSolicitudService } from './evaluar-solicitud.service';

describe('EvaluarSolicitudService', () => {
  let service: EvaluarSolicitudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluarSolicitudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
