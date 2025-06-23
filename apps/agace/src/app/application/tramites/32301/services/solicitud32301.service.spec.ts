import { TestBed } from '@angular/core/testing';

import { Solicitud32301Service } from './solicitud32301.service';

describe('Solicitud32301Service', () => {
  let service: Solicitud32301Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Solicitud32301Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
