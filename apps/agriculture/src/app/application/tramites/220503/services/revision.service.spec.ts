import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RevisionService } from './revision.service';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { PagoDeDerechos } from '../models/pago-de-derechos.model';
import { Solicitud220503State } from '../estados/tramites220503.store';
import { Movilizacion } from '../models/datos-generales.model';

describe('RevisionService', () => {
  let service: RevisionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RevisionService],
    });
    service = TestBed.inject(RevisionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch aduana ingreso data', () => {
    const mockResponse: RespuestaCatalogos = { 
      code: 200, 
      data: [], 
      message: 'Success' 
    };

    service.getAduanaIngreso().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/220503/aduana-ingreso.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch oficina inspección data', () => {
    const mockResponse: RespuestaCatalogos = { 
      code: 200, 
      data: [], 
      message: 'Success' 
    };

    service.getOficianaInspeccion().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/220503/oficiana-de-inspeccion.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch punto inspección data', () => {
    const mockResponse: RespuestaCatalogos = {    code: 200, 
      data: [], 
      message: 'Success'  };

    service.getPuntoInspeccion().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/220503/punto-de-inspeccion.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch establecimiento data', () => {
    const mockResponse: RespuestaCatalogos = {    code: 200, 
      data: [], 
      message: 'Success'  };

    service.getEstablecimiento().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/220503/establecimiento.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch régimen destinarán data', () => {
    const mockResponse: RespuestaCatalogos = {    code: 200, 
      data: [], 
      message: 'Success'  };

    service.getRegimenDestinaran().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/220503/regimen-destinaran.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch movilización nacional data', () => {
    const mockResponse: RespuestaCatalogos = {    code: 200, 
      data: [], 
      message: 'Success'  };

    service.getMovilizacionNacional().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/220503/movilizacion-nacional.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch punto verificación data', () => {
    const mockResponse: RespuestaCatalogos = {    code: 200, 
      data: [], 
      message: 'Success'  };

    service.getPuntoVerificacion().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/220503/punto-verificacion.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch empresa transportista data', () => {
    const mockResponse: RespuestaCatalogos = {    code: 200, 
      data: [], 
      message: 'Success'  };

    service.getEmpresaTransportista().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/220503/empresa-transportista.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch justificación data', () => {
    const mockResponse: RespuestaCatalogos = {    code: 200, 
      data: [], 
      message: 'Success'  };

    service.getJustificacion().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/220503/justificacion.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch banco data', () => {
    const mockResponse: RespuestaCatalogos = {    code: 200, 
      data: [], 
      message: 'Success'  };

    service.getBanco().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/220503/banco.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch pago de derechos data', () => {
    const mockResponse: PagoDeDerechos = {  
      exentoPagoNo: 1234,
      exentoPagoSi: "exentoPagoSi",
      justificacion: "justificacion",
      claveReferencia: "claveReferencia",
      cadenaDependencia: "cadenaDependencia",
      banco: 1234,
      llavePago: "llavePago",
      importePago: "importePago",
      fetchapago: "fetchapago" 
    };

    service.getPagoDeDerechos().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/220503/pago-de-derechos.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch datos de la solicitud data', () => {
    const mockResponse: Solicitud220503State = { 
      certificadosAutorizados: 0,
    horaDeInspeccion: 0,
    aduanaDeIngreso: 0,
    sanidadAgropecuaria: 0,
    puntoDeInspeccion: 0,
    fechaDeInspeccion: '',
    nombre: '',
    primerapellido: '',
    segundoapellido: '',
    mercancia: '',
    tipocontenedor: 0,
    transporteIdMedio: 0,
    identificacionTransporte: '',
    esSolicitudFerros: '',
    totalDeGuiasAmparadas: '',
    foliodel: '',
    aduanaIngreso: 0,
    oficinaInspeccion: 0,
    puntoInspeccion: 0,
    claveUCON: '',
    establecimientoTIF: '',
    numeroguia: '',
    regimen: 0,
    capturaDatosMercancia: 0,
    coordenadas: '',
    movilizacion: 0,
    transporte: '',
    punto: 0,
    nombreEmpresa: 0,
    fetchapago: '',
    exentoPagoNo: 0,
    justificacion: 0,
    claveReferencia: '',
    cadenaDependencia: '',
    banco: 0,
    llavePago: '',
    importePago: '',
    };

    service.getDatosDelaSolicitud().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/220503/datos-dela-solicitud.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch movilización data', () => {
    const mockResponse: Movilizacion = { 
      coordenadas: 'mock-coordinates',
      nombre: 'mock-name',
      medio: 'mock-medium',
      transporte: 'mock-transport',
      punto: 'mock-point'
    };

    service.getMovilizacion().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/220503/movilizacion.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});