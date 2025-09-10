import { TestBed } from '@angular/core/testing';
import { FirmaPasoService } from './firma-paso.service';

describe('FirmaPasoService', () => {
  let service: FirmaPasoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirmaPasoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
