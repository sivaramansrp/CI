import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AvisoService } from './aviso.service';
import { RespuestaCatalogos } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';

describe('AvisoService', () => {
  let service: AvisoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AvisoService]
    });
    service = TestBed.inject(AvisoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch fraccion arancelaria catalogo', () => {
    const mockResponse: RespuestaCatalogos = {
      code: 200,
      data: [
        { id: 1, descripcion: 'Catalogo 1' },
        { id: 2, descripcion: 'Catalogo 2' }
      ],
      message: 'Success'
    };

    service.getFraccionArancelariaCatalogo('someCatalogo').subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/32502/fraccion-arancelaria-catalogo.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch fraccion regla catalogo', () => {
    const mockResponse: RespuestaCatalogos = {
      code: 200,
      data: [
        { id: 1, descripcion: 'Regla 1' },
        { id: 2, descripcion: 'Regla 2' }
      ],
      message: 'Success'
    };

    service.getFraccionReglaCatalogo('someCatalogo').subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/32502/fraccion-regla-catalogo.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});