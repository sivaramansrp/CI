import { TestBed } from '@angular/core/testing';

import { ImmexRegistroDeSolicitudModalityService } from './immex-registro-de-solicitud-modality.service';

describe('ImmexRegistroDeSolicitudModalityService', () => {
  let service: ImmexRegistroDeSolicitudModalityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImmexRegistroDeSolicitudModalityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
