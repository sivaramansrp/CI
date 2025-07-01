import { TestBed } from '@angular/core/testing';

import { TercerosService } from './terceros.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TercerosService', () => {
  let service: TercerosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TercerosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
