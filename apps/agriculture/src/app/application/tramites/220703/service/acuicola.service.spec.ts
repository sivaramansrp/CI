import { TestBed } from '@angular/core/testing';

import { AcuicolaService } from './acuicola.service';

describe('AcuicolaService', () => {
  let service: AcuicolaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcuicolaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
