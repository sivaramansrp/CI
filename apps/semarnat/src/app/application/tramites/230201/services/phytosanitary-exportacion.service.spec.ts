import { TestBed } from '@angular/core/testing';

import { PhytosanitaryExportacionService } from './phytosanitary-exportacion.service';

describe('PhytosanitaryReexportacionService', () => {
  let service: PhytosanitaryExportacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhytosanitaryExportacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
