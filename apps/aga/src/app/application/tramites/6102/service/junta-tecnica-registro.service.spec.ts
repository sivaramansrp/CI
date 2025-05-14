import { TestBed } from '@angular/core/testing';

import { JuntaTecnicaRegistroService } from './junta-tecnica-registro.service';

describe('JuntaTecnicaRegistroService', () => {
  let service: JuntaTecnicaRegistroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JuntaTecnicaRegistroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
