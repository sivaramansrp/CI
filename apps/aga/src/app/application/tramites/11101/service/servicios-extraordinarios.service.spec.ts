import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TramiteFolioService } from '@libs/shared/data-access-user/src';

describe('TramiteFolioService', () => {
  let service: TramiteFolioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TramiteFolioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
