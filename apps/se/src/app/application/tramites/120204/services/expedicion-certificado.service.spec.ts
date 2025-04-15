import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ExpedicionCertificadoService } from './expedicion-certificado.service';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { DetalledelaLicitacion, DistribucionSaldo, LicitacionesDisponibles } from '../../../shared/models/expedicion-certificado.model';

describe('ExpedicionCertificadoService', () => {
  let service: ExpedicionCertificadoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExpedicionCertificadoService],
    });

    service = TestBed.inject(ExpedicionCertificadoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch entidad federativa data', () => {
    const mockResponse: Catalogo = { id: 1, descripcion: 'Entidad Federativa' };

    service.getEntidadFederativa().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/120204/entidad-federativa.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch representacion federal data', () => {
    const mockResponse: Catalogo = { id: 2, descripcion: 'Representacion Federal' };

    service.getRepresentacionFederal().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/120204/representacion-federal.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch detalles de la licitacion data', () => {
    const mockResponse: DetalledelaLicitacion = {
      "numeraDelicitacion":"002/2024",
      "fechaDelEventoDelicitacion":"2024-03-22",
      "descripcionDelProducto":"PANTALONES CON PETO Y TIRANTI 100% ALGODON"    
  };

    service.getDetallesDelalicitacion().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/120204/detalles-licitacion.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch distribucion saldo data', () => {
    const mockResponse: DistribucionSaldo = {
      "montoAExpedir":"",
      "montoAExpedirCheck":false,
      "montoDisponible":"9985",
      "totalAExpedir":""
  };

    service.getDistribucionSaldo().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/120204/distribucion-saldo.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch table data', () => {
    const mockResponse: LicitacionesDisponibles = {
      "numeroDeLicitacion":"002/2024 ",
      "fechaDeLicitacion":"2024-03-22 ",
      "descripcion":"",
      "montoAdjudicado":"9985",
      "fechaInicioVigencia":"2024-03-01",
      "fechaFinVigencia":"2024-12-31"
  };

    service.obtenerDatosTabla().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/120204/datos-de-la-tabla.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
