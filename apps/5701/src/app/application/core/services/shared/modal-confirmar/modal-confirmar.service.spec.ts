import { TestBed } from '@angular/core/testing';

import { ModalConfirmarService } from './modal-confirmar.service';

describe('ModalConfirmarService', () => {
  let service: ModalConfirmarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalConfirmarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
