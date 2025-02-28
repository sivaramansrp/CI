import { TestBed } from '@angular/core/testing';

import { ProsecModificacionServiceTsService } from './prosec-modificacion.service.ts.service';

describe('ProsecModificacionServiceTsService', () => {
  let service: ProsecModificacionServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProsecModificacionServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
