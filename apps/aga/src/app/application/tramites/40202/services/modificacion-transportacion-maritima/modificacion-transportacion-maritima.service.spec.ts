import { TestBed } from '@angular/core/testing';

import { ModificacionTransportacionMaritimaService } from './modificacion-transportacion-maritima.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ModificacionTransportacionMaritimaService', () => {
  let service: ModificacionTransportacionMaritimaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ModificacionTransportacionMaritimaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
