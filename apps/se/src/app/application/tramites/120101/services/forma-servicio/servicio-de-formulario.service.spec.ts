import { TestBed } from '@angular/core/testing';

import { ServicioDeFormularioService } from './servicio-de-formulario.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ServicioDeFormularioService', () => {
  let service: ServicioDeFormularioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServicioDeFormularioService],
    });
    service = TestBed.inject(ServicioDeFormularioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
