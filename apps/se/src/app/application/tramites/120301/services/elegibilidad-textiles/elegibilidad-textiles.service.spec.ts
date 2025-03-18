import { TestBed } from '@angular/core/testing';
import { ElegibilidadTextilesService } from './elegibilidad-textiles.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ElegibilidadTextilesService', () => {
  let service: ElegibilidadTextilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ElegibilidadTextilesService] // Services should be in providers, not declarations
    });

    service = TestBed.inject(ElegibilidadTextilesService); // Use inject instead of createComponent
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
