import { TestBed } from '@angular/core/testing';

import { ImportacionDeAcuiculturaService } from './importacion-de-acuicultura.service';

describe('ImportacionDeAcuiculturaService', () => {
  let service: ImportacionDeAcuiculturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportacionDeAcuiculturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
