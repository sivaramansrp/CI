import { TestBed } from '@angular/core/testing';

import { ElegibilidadTextilesService } from './elegibilidad-textiles.service';

describe('ElegibilidadTextilesService', () => {
  let service: ElegibilidadTextilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElegibilidadTextilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
