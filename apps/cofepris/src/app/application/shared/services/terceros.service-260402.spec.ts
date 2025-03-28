import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { Terceros260402Service } from './terceros-260402.service';

describe('Terceros260402Service', () => {
  let service: Terceros260402Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // Add HttpClientModule here
      providers: [Terceros260402Service], // Ensure the service is provided
    });

    service = TestBed.inject(Terceros260402Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
