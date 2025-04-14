import { TestBed } from '@angular/core/testing';

import { ExportacionDeDiamantesEnBrutoService } from './exportacion-de-diamantes-en-bruto.service';

describe('ExportacionDeDiamantesEnBrutoService', () => {
  let service: ExportacionDeDiamantesEnBrutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportacionDeDiamantesEnBrutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
