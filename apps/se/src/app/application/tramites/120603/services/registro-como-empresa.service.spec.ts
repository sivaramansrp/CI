import { TestBed } from '@angular/core/testing';

import { RegistroComoEmpresaService } from './registro-como-empresa.service';

describe('RegistroComoEmpresaService', () => {
  let service: RegistroComoEmpresaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroComoEmpresaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
