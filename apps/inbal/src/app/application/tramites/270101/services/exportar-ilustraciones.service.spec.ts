import { TestBed } from '@angular/core/testing';

import { ExportarIlustracionesService } from './exportar-ilustraciones.service';

describe('ExportarIlustracionesService', () => {
  let service: ExportarIlustracionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportarIlustracionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
