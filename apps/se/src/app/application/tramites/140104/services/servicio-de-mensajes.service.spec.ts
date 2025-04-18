import { TestBed } from '@angular/core/testing';

import { ServicioDeMensajesService } from './servicio-de-mensajes.service';

describe('ServicioDeMensajesService', () => {
  let service: ServicioDeMensajesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioDeMensajesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
