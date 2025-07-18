import { TestBed } from '@angular/core/testing';

import { RubroTransporteFerrovarioService } from './rubro-transporte-ferrovario.service';

describe('RubroTransporteFerrovarioService', () => {
  let service: RubroTransporteFerrovarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RubroTransporteFerrovarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
