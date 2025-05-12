import { TestBed } from '@angular/core/testing';

import { LicitacionesDisponiblesService } from './licitacionesDisponibles.service';

describe('LicitacionesDisponiblesService', () => {
  let service: LicitacionesDisponiblesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LicitacionesDisponiblesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
