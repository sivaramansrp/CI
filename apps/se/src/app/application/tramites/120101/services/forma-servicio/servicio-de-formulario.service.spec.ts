import { TestBed } from '@angular/core/testing';

import { ServicioDeFormularioService } from './servicio-de-formulario.service';

describe('ServicioDeFormularioService', () => {
  let service: ServicioDeFormularioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioDeFormularioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
