import { TestBed } from '@angular/core/testing';

import { ImportacionDefinitivaService } from './importacion-definitiva.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ImportacionDefinitivaService', () => {
  let service: ImportacionDefinitivaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ImportacionDefinitivaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
