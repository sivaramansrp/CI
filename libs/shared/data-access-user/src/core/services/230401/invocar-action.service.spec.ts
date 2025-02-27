import { TestBed } from '@angular/core/testing';

import { InvocarActionService } from './invocar-action.service';

describe('InvocarActionService', () => {
  let service: InvocarActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvocarActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
