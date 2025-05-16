import { TestBed } from '@angular/core/testing';

import { ConsultaAvisoAcreditacionService } from './consulta-aviso-acreditacion.service';

describe('ConsultaAvisoAcreditacionService', () => {
  let service: ConsultaAvisoAcreditacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaAvisoAcreditacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
