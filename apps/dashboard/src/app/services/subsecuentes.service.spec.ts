import { TestBed } from '@angular/core/testing';

import { SubsecuentesService } from './subsecuentes.service';

describe('SubsecuentesService', () => {
  let service: SubsecuentesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubsecuentesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
