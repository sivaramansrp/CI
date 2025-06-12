import { TestBed } from '@angular/core/testing';

import { AgregarDestinatarioService } from './agregar-destinatario.service';

describe('AgregarDestinatarioService', () => {
  let service: AgregarDestinatarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgregarDestinatarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
