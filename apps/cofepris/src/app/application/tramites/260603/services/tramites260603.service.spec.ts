import { TestBed } from '@angular/core/testing';

import { Tramites260603Service } from './tramites260603.service';

describe('Tramites260603Service', () => {
  let service: Tramites260603Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Tramites260603Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
