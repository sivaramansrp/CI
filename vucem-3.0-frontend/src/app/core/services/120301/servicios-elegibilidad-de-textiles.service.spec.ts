import { TestBed } from '@angular/core/testing';

import { ServiciosElegibilidadDeTextilesService } from './servicios-elegibilidad-de-textiles.service';

describe('ServiciosElegibilidadDeTextilesService', () => {
  let service: ServiciosElegibilidadDeTextilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosElegibilidadDeTextilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
