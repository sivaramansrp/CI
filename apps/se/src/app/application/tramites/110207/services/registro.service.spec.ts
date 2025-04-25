import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegistroService } from './registro.service';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { ColumnasTabla, SeleccionadasTabla } from '../models/registro.model';

describe('RegistroService', () => {
  let service: RegistroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegistroService],
    });

    service = TestBed.inject(RegistroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch tratado catalog', () => {
    const mockResponse: RespuestaCatalogos = { code: 200, data: [], message: 'Success' };

    service.getTratado().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/110207/tratado.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch pais catalog', () => {
    const mockResponse: RespuestaCatalogos = { code: 200, data: [], message: 'Success' };

    service.getPais().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/110207/pais.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch idioma catalog', () => {
    const mockResponse: RespuestaCatalogos = { code: 200, data: [], message: 'Success' };

    service.getIdioma().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/110207/idioma.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch pais destino catalog', () => {
    const mockResponse: RespuestaCatalogos = { code: 200, data: [], message: 'Success' };

    service.getPaisDestino().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/110207/pais.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch transporte catalog', () => {
    const mockResponse: RespuestaCatalogos = { code: 200, data: [], message: 'Success' };

    service.getTransporte().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/110207/pais.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch entidad catalog', () => {
    const mockResponse: RespuestaCatalogos = { code: 200, data: [], message: 'Success' };

    service.getEntidad().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/110207/entidad.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch representacion catalog', () => {
    const mockResponse: RespuestaCatalogos = { code: 200, data: [], message: 'Success' };

    service.getRepresentacion().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/110207/entidad.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch tipo factura catalog', () => {
    const mockResponse: RespuestaCatalogos = { code: 200, data: [], message: 'Success' };

    service.getTipoFactura().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/110207/tipofactura.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch UMC catalog', () => {
    const mockResponse: RespuestaCatalogos = { code: 200, data: [], message: 'Success' };

    service.getUMC().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/110207/umc.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch unidad medida catalog', () => {
    const mockResponse: RespuestaCatalogos = { code: 200, data: [], message: 'Success' };

    service.getUnidadMedida().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/110207/umc.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch catalog by ID', () => {
    const mockResponse = { code: 200, data: [], message: 'Success' };
    const catalogId = 1;

    service.getCatalogoById(catalogId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service.urlServerCatalogos}/${catalogId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch solicitudes tabla', () => {
    const mockResponse: ColumnasTabla[] = [];

    service.getSolicitudesTabla().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/110207/mercancia-disponsible.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch solicitudes data tabla', () => {
    const mockResponse: SeleccionadasTabla[] = [];

    service.getSolicitudesDataTabla().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/110207/mercancia-seleccionadas.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});