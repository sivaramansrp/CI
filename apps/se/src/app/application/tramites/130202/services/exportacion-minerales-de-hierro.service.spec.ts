import { TestBed } from '@angular/core/testing';

import { ExportacionMineralesDeHierroService } from './exportacion-minerales-de-hierro.service';

describe('ExportacionMineralesDeHierroService', () => {
  let service: ExportacionMineralesDeHierroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportacionMineralesDeHierroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
