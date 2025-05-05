import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DomicilioDelEstablecimientoService } from './domicilio-del-establecimiento.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DomicilioDelEstablecimientoService', () => {
  let service: DomicilioDelEstablecimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [],
      providers: []
    }).compileComponents();
    service = TestBed.inject(DomicilioDelEstablecimientoService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
