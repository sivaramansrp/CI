import { TestBed } from '@angular/core/testing';

import { ImmerModificacionService } from './immer-modificacion.service';

describe('ImmerModificacionService', () => {
  let service: ImmerModificacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImmerModificacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
