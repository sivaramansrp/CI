import { TestBed } from '@angular/core/testing';

import { PhytosanitaryReexportacionService } from './phytosanitary-reexportacion.service';

describe('PhytosanitaryReexportacionService', () => {
  let service: PhytosanitaryReexportacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhytosanitaryReexportacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
