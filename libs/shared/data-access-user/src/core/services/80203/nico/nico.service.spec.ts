import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NicoService } from './nico.service';
import { Catalogo } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';

describe('NicoService', () => {
  let service: NicoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NicoService]
    });
    service = TestBed.inject(NicoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch NICO menu desplegable', () => {
    const dummyData: Catalogo[] = [
      { id: 1, descripcion: 'Kilogramo', dpi: 'Nacional' },
      { id: 2, descripcion: 'Litro', dpi: 'Internacional' }
    ];

    service.obtenerMenuDesplegable('nico.json').subscribe(data => {
      expect(data.length).toBe(2);
      expect(data).toEqual(dummyData);
    });

    const req = httpMock.expectOne('/assets/json/80203/nico.json');
    expect(req.request.method).toBe('GET');
    req.flush({ data: dummyData });
  });

  it('should handle error', () => {
    const errorMessage = 'Error al obtener los datos';

    service.obtenerMenuDesplegable('nico.json').subscribe(
      () => fail('should have failed with the error'),
      (error) => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpMock.expectOne('/assets/json/80203/nico.json');
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });
});