import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TransportacionMaritimaService } from './transportacion-maritima.service';
import { RespuestaCaatTabla, RespuestaContribuyenteTabla, RespuestaContribuyentePMNTabla } from '../../models/transportacion-maritima.model';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';

describe('TransportacionMaritimaService', () => {
  let service: TransportacionMaritimaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransportacionMaritimaService],
    });

    service = TestBed.inject(TransportacionMaritimaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch the country catalog (getPaisCatalogo)', () => {
    const mockResponse: RespuestaCatalogos = { code: 200, data: [{ id: 1, descripcion: 'México' }], message: 'Success' };

    service.getPaisCatalogo().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/40402/pais-catalogo.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch the state catalog (getEstadoCatalogo)', () => {
    const mockResponse: RespuestaCatalogos = { code: 200, data: [{ id: 1, descripcion: 'Estado' }], message: 'Success' };

    service.getEstadoCatalogo().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/40402/estado-catalogo.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch the municipality catalog (getMunicipioCatalogo)', () => {
    const mockResponse: RespuestaCatalogos = { code: 200, data: [{ id: 1, descripcion: 'Municipio' }], message: 'Success' };

    service.getMunicipioCatalogo().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/40402/municipio-catalogo.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch the colony catalog (getColoniaCatalogo)', () => {
    const mockResponse: RespuestaCatalogos = { code: 200, data: [{ id: 1, descripcion: 'Colonia' }], message: 'Success' };

    service.getColoniaCatalogo().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/40402/colonia-catalogo.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch the CAAT company catalog (obtenerBuscarEmpresaCaat)', () => {
    const mockResponse: RespuestaCaatTabla = { 
      code: 200, 
      data: [
        { 
          rfc: 'RFC123',
          nombreDenominacionRazonSocial: 'Empresa 1',
          caat: 'CAAT123',
          perfilCaat: 'Perfil 1',
          inicioVigencia: '2025-01-01',
          finVigencia: '2025-12-31',
          pais: 'México',
         }
      ],
      message: 'Success'
    };

    service.obtenerBuscarEmpresaCaat().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/40402/buscar-empresa-caat.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});