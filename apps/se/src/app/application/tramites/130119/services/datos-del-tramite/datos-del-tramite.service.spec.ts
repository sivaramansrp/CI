import { TestBed } from '@angular/core/testing';

import { DatosDelTramiteService } from './datos-del-tramite.service';

describe('DatosDelTramiteService', () => {
  let service: DatosDelTramiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosDelTramiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
