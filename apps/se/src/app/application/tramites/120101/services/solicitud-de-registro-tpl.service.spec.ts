import { TestBed } from '@angular/core/testing';

import { SolicitudDeRegistroTplService } from './solicitud-de-registro-tpl.service';

describe('SolicitudDeRegistroTplService', () => {
  let service: SolicitudDeRegistroTplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudDeRegistroTplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
