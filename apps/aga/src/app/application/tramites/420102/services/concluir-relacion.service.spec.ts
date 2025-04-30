import { TestBed } from '@angular/core/testing';

import { ConcluirRelacionService } from './concluir-relacion.service';

describe('ConcluirRelacionService', () => {
  let service: ConcluirRelacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConcluirRelacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
