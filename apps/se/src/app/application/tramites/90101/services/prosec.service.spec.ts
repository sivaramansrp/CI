import { TestBed } from '@angular/core/testing';

import { ProsecService } from './prosec.service';

describe('ProsecService', () => {
  let service: ProsecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProsecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
