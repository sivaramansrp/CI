import { TestBed } from '@angular/core/testing';

import { SolicitudDeRegistroTplService } from './solicitud-de-registro-tpl.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SolicitudDeRegistroTplService', () => {
  let service: SolicitudDeRegistroTplService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SolicitudDeRegistroTplService],
    });
    service = TestBed.inject(SolicitudDeRegistroTplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
