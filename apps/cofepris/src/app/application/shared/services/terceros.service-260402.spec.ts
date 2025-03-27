import { TestBed } from '@angular/core/testing';
import { Terceros260402Service } from './terceros-260402.service';



describe('Terceros260402Service', () => {
  let service: Terceros260402Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Terceros260402Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
