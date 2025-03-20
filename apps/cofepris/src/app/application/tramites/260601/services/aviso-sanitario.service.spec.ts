import { TestBed } from '@angular/core/testing';

import { AvisoSanitarioService } from './aviso-sanitario.service';

describe('AvisoSanitarioService', () => {
  let service: AvisoSanitarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvisoSanitarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
