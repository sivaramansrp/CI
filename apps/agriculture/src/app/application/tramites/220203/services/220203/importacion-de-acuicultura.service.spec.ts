import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ImportacionDeAcuiculturaService } from './importacion-de-acuicultura.service';

describe('ImportacionDeAcuiculturaService', () => {
  let service: ImportacionDeAcuiculturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Add HttpClientTestingModule here
    });
    service = TestBed.inject(ImportacionDeAcuiculturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
