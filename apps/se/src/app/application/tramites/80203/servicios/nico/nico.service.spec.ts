import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NicoService } from './nico.service';
import { HttpClient } from '@angular/common/http';
import { Catalogo, RespuestaCatalogos } from '@ng-mf/data-access-user';

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

  it('should return menu options from JSON file', () => {
    const fileName = 'nico-menu.json';
    const mockResponse: RespuestaCatalogos = {
      code: 200,
      message: 'Success',
      data: [
        { id: 1, descripcion: 'Opción 1' },
        { id: 2, descripcion: 'Opción 2' }
      ]
    };

    service.obtenerMenuDesplegable(fileName).subscribe((result) => {
      expect(result).toEqual(mockResponse.data);
    });

    const req = httpMock.expectOne('/assets/json/80203/nico-menu.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});