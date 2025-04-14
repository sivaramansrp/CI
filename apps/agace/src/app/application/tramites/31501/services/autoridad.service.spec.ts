import { TestBed } from '@angular/core/testing';

import { AutoridadService } from './autoridad.service';

describe('AutoridadService', () => {
  let service: AutoridadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoridadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
