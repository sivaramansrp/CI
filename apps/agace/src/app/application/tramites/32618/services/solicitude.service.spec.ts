import { TestBed } from '@angular/core/testing';

import { SolicitudeService } from './solicitude.service';

describe('SolicitudeService', () => {
  let service: SolicitudeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
