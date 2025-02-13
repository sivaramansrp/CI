import { TestBed } from '@angular/core/testing';

import { FitosanitarioAgriculturaService } from './fitosanitario-agricultura.service';

describe('FitosanitarioAgriculturaService', () => {
  let service: FitosanitarioAgriculturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FitosanitarioAgriculturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
