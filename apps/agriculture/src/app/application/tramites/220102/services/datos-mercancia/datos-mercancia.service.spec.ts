import { TestBed } from '@angular/core/testing';

import { DatosMercanciaService } from './datos-mercancia.service';

describe('DatosMercanciaService', () => {
  let service: DatosMercanciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosMercanciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
