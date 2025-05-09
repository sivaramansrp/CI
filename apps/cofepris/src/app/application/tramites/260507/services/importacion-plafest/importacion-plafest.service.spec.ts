import { TestBed } from '@angular/core/testing';

import { ImportacionPlafestService } from './importacion-plafest.service';

describe('ImportacionPlafestService', () => {
  let service: ImportacionPlafestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImportacionPlafestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
