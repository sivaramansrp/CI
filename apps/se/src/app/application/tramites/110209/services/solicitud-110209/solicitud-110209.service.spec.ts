import { TestBed } from '@angular/core/testing';

import { Solicitud110209Service } from './solicitud-110209.service';

describe('Solicitud110209Service', () => {
  let service: Solicitud110209Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Solicitud110209Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
