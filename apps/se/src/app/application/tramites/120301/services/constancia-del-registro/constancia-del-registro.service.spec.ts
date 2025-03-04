import { TestBed } from '@angular/core/testing';

import { ConstanciaDelRegistroService } from './constancia-del-registro.service';

describe('ConstanciaDelRegistroService', () => {
  let service: ConstanciaDelRegistroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConstanciaDelRegistroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});