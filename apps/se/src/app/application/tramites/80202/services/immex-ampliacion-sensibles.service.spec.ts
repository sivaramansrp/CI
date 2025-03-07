import { TestBed } from '@angular/core/testing';

import { ImmexAmpliacionSensiblesService } from './immex-ampliacion-sensibles.service';

describe('ImmexAmpliacionSensiblesService', () => {
  let service: ImmexAmpliacionSensiblesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImmexAmpliacionSensiblesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
