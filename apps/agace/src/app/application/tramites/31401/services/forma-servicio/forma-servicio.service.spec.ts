import { TestBed } from '@angular/core/testing';

import { FormaServicioService } from './forma-servicio.service';

describe('FormaServicioService', () => {
  let service: FormaServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormaServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
