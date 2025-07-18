import { TestBed } from '@angular/core/testing';

import { EmpresasComercializadorasService } from './empresas-comercializadoras.service';

describe('EmpresasComercializadorasService', () => {
  let service: EmpresasComercializadorasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpresasComercializadorasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
