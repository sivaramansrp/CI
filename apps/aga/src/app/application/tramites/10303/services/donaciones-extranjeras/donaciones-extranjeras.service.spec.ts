import { TestBed } from '@angular/core/testing';

import { ContribuyenteRespuesta, ManifiestosRespuesta, BasicRequerimientosRespuesta } from '../../models/donaciones-extranjeras.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DonacionesExtranjerasService } from './donaciones-extranjeras.service';
import { RespuestaCatalogos } from 'libs/shared/data-access-user/src/core/models/shared/catalogos.model';

describe('DonacionesExtranjerasService', () => {
  let service: DonacionesExtranjerasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonacionesExtranjerasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
describe('DonacionesExtranjerasService', () => {
  let service: DonacionesExtranjerasService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DonacionesExtranjerasService]
    });
    service = TestBed.inject(DonacionesExtranjerasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch manifiestos', () => {
    const mockResponse: ManifiestosRespuesta = { data: [] };

    service.getManifiestos().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/10303/manifiestos.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch basic requerimientos', () => {
    const mockResponse: BasicRequerimientosRespuesta = { data: [] };

    service.getBasicoRequerimientos().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/10303/basic-requerimientos.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch aduana', () => {
    const mockResponse: RespuestaCatalogos = { code:200, data: [], message: 'Success' };

    service.getAduana('catalogo').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/10303/aduana.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch destino donacion', () => {
    const mockResponse: RespuestaCatalogos = { code:200, data: [], message: 'Success' };

    service.getDestinoDonacion('catalogo').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/10303/destino-donacion.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch tipo de mercancia', () => {
    const mockResponse: RespuestaCatalogos = { code:200, data: [], message: 'Success' };

    service.getTipoDeMercancia('catalogo').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/10303/tipo-de-mercancia.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch unidad de medida', () => {
    const mockResponse: RespuestaCatalogos = { code:200, data: [], message: 'Success' };

    service.getUnidadMedida('catalogo').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/10303/umc.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch umt', () => {
    const mockResponse: RespuestaCatalogos = { code:200, data: [], message: 'Success' };

    service.getUmt('catalogo').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/10303/umt.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch procedencia otro', () => {
    const mockResponse: RespuestaCatalogos = { code:200, data: [], message: 'Success' };

    service.getProcedenciaOtro('catalogo').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/10303/procedencia-otro.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch condicion mercancia', () => {
    const mockResponse: RespuestaCatalogos = { code:200, data: [], message: 'Success' };

    service.getCondicionMercancia('catalogo').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/10303/condicion-mercancia.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch pais origen medicamento', () => {
    const mockResponse: RespuestaCatalogos = { code:200, data: [], message: 'Success' };

    service.getPaisOrigenMedicamento('catalogo').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/10303/pais-origen-medicamento.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch pais procedencia medicamento', () => {
    const mockResponse: RespuestaCatalogos = { code:200, data: [], message: 'Success' };

    service.getPaisProcedenciaMedicamento('catalogo').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/10303/pais-procedencia-medicamento.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch paises', () => {
    const mockResponse: RespuestaCatalogos = { code:200, data: [], message: 'Success' };

    service.getPaises('catalogo').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/10303/paises.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch documento residencia', () => {
    const mockResponse: RespuestaCatalogos = { code:200, data: [], message: 'Success' };

    service.getDocumentoResidencia('catalogo').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/10303/documento-residencia.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch contribuyente by RFC', () => {
    const mockResponse: ContribuyenteRespuesta = { data: [] };

    service.buscarContribuyente('XAXX010101000').subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/10303/donatario-datos.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});