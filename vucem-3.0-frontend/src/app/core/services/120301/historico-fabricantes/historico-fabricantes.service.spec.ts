import { TestBed } from '@angular/core/testing';

import { HistoricoFabricantesService } from './historico-fabricantes.service';

describe('HistoricoFabricantesService', () => {
  let service: HistoricoFabricantesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoricoFabricantesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
