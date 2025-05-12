import { TestBed } from '@angular/core/testing';

import { ZoosanitarioService } from './zoosanitario.service';

describe('ZoosanitarioService', () => {
  let service: ZoosanitarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZoosanitarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
