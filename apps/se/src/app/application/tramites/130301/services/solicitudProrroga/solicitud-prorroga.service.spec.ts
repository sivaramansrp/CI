import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SolicitudProrrogaService } from './solicitud-prorroga.service';
import {
  RespuestaDatos,
  RequestDatosDelTramite,
  RespuestaTabla,
  RequestPartidasForma,
  RequestCertificadoKimberleyForma,
  RequestProrrogasForma,
} from '@libs/shared/data-access-user/src/core/models/130301/solicitud-prorroga.model';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';

describe('SolicitudProrrogaService', () => {
  let service: SolicitudProrrogaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SolicitudProrrogaService],
    });
    service = TestBed.inject(SolicitudProrrogaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debe obtener los datos del formulario de solicitud', () => {
    const mockResponse: RespuestaDatos = { data: 'mockData' } as unknown as RespuestaDatos;

    service.obtenerFormDatos().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/130301/solicitud-forma.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debe obtener los datos del formulario de "Datos del Trámite"', () => {
    const mockResponse: RequestDatosDelTramite = { data: 'mockData' } as unknown as RequestDatosDelTramite;

    service.obtenerDelTramiteFormDatos().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/130301/datos-del-tramite.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debe obtener los datos de la tabla de partidas', () => {
    const mockResponse: RespuestaTabla = { data: 'mockData' } as unknown as RespuestaTabla;

    service.obtenerTablaDatos().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/130301/partidas-tabla.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debe obtener los datos del formulario de partidas', () => {
    const mockResponse: RequestPartidasForma = { data: 'mockData' } as unknown as RequestPartidasForma;

    service.obtenerPartidasFormDatos().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/130301/partidas-forma.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debe obtener los datos del formulario de Certificado Kimberley', () => {
    const mockResponse: RequestCertificadoKimberleyForma = { data: 'mockData' } as unknown as RequestCertificadoKimberleyForma;

    service.obtenerCertificadoKimberleyFormDatos().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/130301/certificadoKimberley-forma.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debe obtener la lista de estados', () => {
    const mockResponse: RespuestaCatalogos = { data: 'mockData' } as unknown as RespuestaCatalogos;

    service.obtenerEstadoList().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/130301/seleccion.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debe obtener los datos del formulario de prórrogas', () => {
    const mockResponse: RequestProrrogasForma = { data: 'mockData' } as unknown as RequestProrrogasForma;

    service.obtenerProrrogasFormDatos().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/130301/prorrogas-forma.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
