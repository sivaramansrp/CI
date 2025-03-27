import { TestBed } from '@angular/core/testing';

import { ImportacionMaterialDeInvestigacionCientificaService } from './importacion-material-de-investigacion-cientifica.service';

describe('ImportacionMaterialDeInvestigacionCientificaService', () => {
  let service: ImportacionMaterialDeInvestigacionCientificaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportacionMaterialDeInvestigacionCientificaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
