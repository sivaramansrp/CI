import { TestBed } from '@angular/core/testing';

import { ExencionDeImpuestosService } from './exencion-de-impuestos.service';

describe('ExencionDeImpuestosService', () => {
  let service: ExencionDeImpuestosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExencionDeImpuestosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  }); 
});
