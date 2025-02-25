import { TestBed } from '@angular/core/testing';

import { CambioModalidadService } from './cambio-modalidad.service';

describe('CambioModalidadService', () => {
  let service: CambioModalidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CambioModalidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
