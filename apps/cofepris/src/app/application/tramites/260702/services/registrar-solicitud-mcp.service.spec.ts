import { TestBed } from '@angular/core/testing';

import { RegistrarSolicitudMcpService } from './registrar-solicitud-mcp.service';

describe('RegistrarSolicitudMcpService', () => {
  let service: RegistrarSolicitudMcpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrarSolicitudMcpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
