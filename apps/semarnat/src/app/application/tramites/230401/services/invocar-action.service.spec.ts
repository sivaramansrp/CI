import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InvocarActionService } from './invocar-action.service';
import { TestBed } from '@angular/core/testing';

describe('InvocarActionService', () => {
  let service: InvocarActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(InvocarActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
