import { TestBed } from '@angular/core/testing';

import { CapturaSolicitudeService } from './captura-solicitude.service';

describe('CapturaSolicitudeService', () => {
  let service: CapturaSolicitudeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapturaSolicitudeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
