import { TestBed } from '@angular/core/testing';

import { ValidacionDeFormularioService } from './validacion-de-formulario.service';


describe('ValidacionDeFormularioService', () => {
  let service: ValidacionDeFormularioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidacionDeFormularioService],
    });
    service = TestBed.inject(ValidacionDeFormularioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
