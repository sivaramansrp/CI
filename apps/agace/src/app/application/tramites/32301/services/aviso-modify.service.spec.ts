import { TestBed } from '@angular/core/testing';

import { AvisoModifyService } from './aviso-modify.service';

describe('AvisoModifyService', () => {
  let service: AvisoModifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvisoModifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
