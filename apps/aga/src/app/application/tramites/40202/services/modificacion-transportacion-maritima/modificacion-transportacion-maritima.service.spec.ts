import { TestBed } from '@angular/core/testing';

import { ModificacionTransportacionMaritimaService } from './modificacion-transportacion-maritima.service';

describe('ModificacionTransportacionMaritimaService', () => {
  let service: ModificacionTransportacionMaritimaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModificacionTransportacionMaritimaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
