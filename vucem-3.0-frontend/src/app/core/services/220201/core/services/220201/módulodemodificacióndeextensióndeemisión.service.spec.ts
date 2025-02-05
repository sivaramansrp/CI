import { TestBed } from '@angular/core/testing';

import { MódulodeModificacióndeExtensióndeemisiónServiceService } from './módulodemodificacióndeextensióndeemisión.service';

describe('MódulodeModificacióndeExtensióndeemisiónServiceService', () => {
  let service: MódulodeModificacióndeExtensióndeemisiónServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MódulodeModificacióndeExtensióndeemisiónServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
