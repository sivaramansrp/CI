import { TestBed } from '@angular/core/testing';

import { CancelacionDeAutorizacionesService } from './cancelacion-de-autorizaciones.service';

describe('CancelacionDeAutorizacionesService', () => {
  let service: CancelacionDeAutorizacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CancelacionDeAutorizacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
