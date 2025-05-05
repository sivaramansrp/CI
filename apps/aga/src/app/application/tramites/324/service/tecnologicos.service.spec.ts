import { TestBed } from '@angular/core/testing';

import { TecnologicosService } from './tecnologicos.service';

describe('TecnologicosService', () => {
  let service: TecnologicosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TecnologicosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
