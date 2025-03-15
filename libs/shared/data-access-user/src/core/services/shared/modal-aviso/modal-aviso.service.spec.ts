import { TestBed } from '@angular/core/testing';

import { ModalAvisoService } from './modal-aviso.service';

describe('ModalConfirmarService', () => {
  let service: ModalAvisoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalAvisoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
