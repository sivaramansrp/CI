import { TestBed } from '@angular/core/testing';

import { EconomicoService } from './economico.service';

describe('EconomicoService', () => {
  let service: EconomicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EconomicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
