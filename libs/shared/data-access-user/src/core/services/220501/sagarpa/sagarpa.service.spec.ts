import { TestBed } from '@angular/core/testing';

import { SagarpaService } from './sagarpa.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SagarpaService', () => {
  let service: SagarpaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SagarpaService]
    });
    service = TestBed.inject(SagarpaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
