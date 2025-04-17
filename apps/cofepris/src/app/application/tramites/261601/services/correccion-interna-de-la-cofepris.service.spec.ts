import { TestBed } from '@angular/core/testing';

import { CorreccionInternaDeLaCofeprisService } from './correccion-interna-de-la-cofepris.service';

describe('CorreccionInternaDeLaCofeprisService', () => {
  let service: CorreccionInternaDeLaCofeprisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorreccionInternaDeLaCofeprisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
