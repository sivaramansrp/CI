import { TestBed } from '@angular/core/testing';

import { PhytosanitaryExportacionService } from './phytosanitary-exportacion.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PhytosanitaryReexportacionService', () => {
  let service: PhytosanitaryExportacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PhytosanitaryExportacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
