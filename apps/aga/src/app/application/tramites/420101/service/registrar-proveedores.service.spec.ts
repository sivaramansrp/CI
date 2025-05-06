import { TestBed } from '@angular/core/testing';

import { RegistrarProveedoresService } from './registrar-proveedores.service';

describe('RegistrarProveedoresService', () => {
  let service: RegistrarProveedoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrarProveedoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
