import { TestBed } from '@angular/core/testing';

import { NacionalRegistroDelCafeExportadoresService } from './nacional-registro-del-cafe-exportadores.service';

describe('NacionalRegistroDelCafeExportadoresService', () => {
  let service: NacionalRegistroDelCafeExportadoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NacionalRegistroDelCafeExportadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
