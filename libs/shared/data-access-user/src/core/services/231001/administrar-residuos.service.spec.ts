import { TestBed } from '@angular/core/testing';

import { AdministrarResiduosService } from './administrar-residuos.service';

describe('AdministrarResiduosService', () => {
  let service: AdministrarResiduosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministrarResiduosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
