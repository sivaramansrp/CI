import { TestBed } from '@angular/core/testing';

import { DiamanteBrutoService } from './diamante-bruto.service';

describe('DiamanteBrutoService', () => {
  let service: DiamanteBrutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiamanteBrutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
