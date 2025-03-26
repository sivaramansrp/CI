import { TestBed } from '@angular/core/testing';

import { SanitarioService } from './sanitario.service';

describe('SanitarioService', () => {
  let service: SanitarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SanitarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
