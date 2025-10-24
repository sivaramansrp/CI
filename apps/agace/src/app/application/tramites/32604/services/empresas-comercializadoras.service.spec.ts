
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { EmpresasComercializadorasService } from './empresas-comercializadoras.service';

describe('EmpresasComercializadorasService', () => {
  let service: EmpresasComercializadorasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(EmpresasComercializadorasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
