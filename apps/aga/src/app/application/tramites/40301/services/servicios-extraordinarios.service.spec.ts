import { TestBed } from '@angular/core/testing';

import { ServiciosExtraordinariosService } from './servicios-extraordinarios.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ServiciosExtraordinariosService', () => {
  let service: ServiciosExtraordinariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ServiciosExtraordinariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
