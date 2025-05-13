import { TestBed } from '@angular/core/testing';

import { RegistroPoblacionalService } from './registro-poblacional.service';

describe('RegistroPoblacionalService', () => {
  let service: RegistroPoblacionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroPoblacionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
