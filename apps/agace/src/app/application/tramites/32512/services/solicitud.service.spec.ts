import { TestBed } from '@angular/core/testing';
import { SolicitudService } from './solicitud.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Catalogo } from '@libs/shared/data-access-user/src';

describe('SolicitudService', () => {
  let service: SolicitudService;
  let httpMock: HttpTestingController;

  const mockCatalogos: Catalogo[] = [
    { id: 1, descripcion: 'Catálogo 1' },
    { id: 2, descripcion: 'Catálogo 2' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SolicitudService],
    });

    service = TestBed.inject(SolicitudService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch entidad federativa catalog', () => {
    service.conseguirEntidadFederativa().subscribe((res) => {
      expect(res).toEqual(mockCatalogos);
    });

    const req = httpMock.expectOne(
      'assets/json/32512/entidad-federativa-catalogo.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockCatalogos);
  });

  it('should fetch municipio alcaldia catalog', () => {
    service.conseguirMunicipioAlcaldia().subscribe((res) => {
      expect(res).toEqual(mockCatalogos);
    });

    const req = httpMock.expectOne(
      'assets/json/32512/municipio-alcaldia-catalogo.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockCatalogos);
  });

  it('should fetch colonia catalog', () => {
    service.conseguirColonia().subscribe((res) => {
      expect(res).toEqual(mockCatalogos);
    });

    const req = httpMock.expectOne('assets/json/32512/colonia-catalogo.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockCatalogos);
  });
});
