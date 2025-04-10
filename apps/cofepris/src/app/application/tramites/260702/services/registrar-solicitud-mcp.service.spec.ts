import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { RegistrarSolicitudMcpService } from './registrar-solicitud-mcp.service';

describe('RegistrarSolicitudMcpService', () => {
  let service: RegistrarSolicitudMcpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient()
    ]
    });
    service = TestBed.inject(RegistrarSolicitudMcpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
