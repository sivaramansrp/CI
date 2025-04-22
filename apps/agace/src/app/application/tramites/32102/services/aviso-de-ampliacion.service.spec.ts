import { TestBed } from '@angular/core/testing';

import { AvisoDeAmpliacionService } from './aviso-de-ampliacion.service';

describe('ConsultaAvisoAcreditacionService', () => {
  let service: AvisoDeAmpliacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvisoDeAmpliacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
