import { TestBed } from '@angular/core/testing';

import { CancelacionGarantiaService } from './cancelacion-garantia.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CancelacionGarantiaService', () => {
  let service: CancelacionGarantiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CancelacionGarantiaService]
    });
    service = TestBed.inject(CancelacionGarantiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
