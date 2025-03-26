import { TestBed } from '@angular/core/testing';

import { ValidarInicalmenteService } from './validar-inicalmente.service';

describe('ValidarInicalmenteService', () => {
  let service: ValidarInicalmenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidarInicalmenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
