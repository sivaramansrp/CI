import { TestBed } from '@angular/core/testing';

import { SolicitudDeRegistroInvocarService } from './solicitud-de-registro-invocar.service';

describe('SolicitudDeRegistroInvocarService', () => {
  let service: SolicitudDeRegistroInvocarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudDeRegistroInvocarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
