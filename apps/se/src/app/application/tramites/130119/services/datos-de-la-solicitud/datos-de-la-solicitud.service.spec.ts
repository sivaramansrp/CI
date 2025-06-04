import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DatosDeLaSolicitudService } from './datos-de-la-solicitud.service';
import { CatalogoResponse } from '@libs/shared/data-access-user/src';
import { Tramite130119Store } from '../../estados/store/tramite130119.store';
import { Tramite130119State } from '../../estados/store/tramite130119.store';

describe('DatosDeLaSolicitudService', () => {
  let service: DatosDeLaSolicitudService;
  let httpMock: HttpTestingController;
  let mockStore: any;

  beforeEach(() => {
    mockStore = {
      establecerDatos: jest.fn()
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DatosDeLaSolicitudService,
        { provide: Tramite130119Store, useValue: mockStore }
      ]
    });

    service = TestBed.inject(DatosDeLaSolicitudService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('getRegimen debe realizar una solicitud HTTP GET y retornar los datos esperados', () => {
    const MOCK_RESPONSE: CatalogoResponse[] = [{ id: 1, descripcion: 'Régimen 1' }];

    service.getRegimen().subscribe((data) => {
      expect(data).toEqual(MOCK_RESPONSE);
    });

    const REQ = httpMock.expectOne('./assets/json/130119/regimen.json');
    expect(REQ.request.method).toBe('GET');
    REQ.flush(MOCK_RESPONSE);
  });

  it('getClasificacionDeRegimen debe realizar una solicitud HTTP GET y retornar los datos esperados', () => {
    const MOCK_RESPONSE: CatalogoResponse[] = [{ id: 2, descripcion: 'Clasificación 1' }];

    service.getClasificacionDeRegimen().subscribe((data) => {
      expect(data).toEqual(MOCK_RESPONSE);
    });

    const REQ = httpMock.expectOne('./assets/json/130119/clasificacion-de-regimen.json');
    expect(REQ.request.method).toBe('GET');
    REQ.flush(MOCK_RESPONSE);
  });

  it('getFraccionArancelaria debe realizar una solicitud HTTP GET y retornar los datos esperados', () => {
    const MOCK_RESPONSE: CatalogoResponse[] = [{ id: 3, descripcion: 'Fracción 1' }];

    service.getFraccionArancelaria().subscribe((data) => {
      expect(data).toEqual(MOCK_RESPONSE);
    });

    const REQ = httpMock.expectOne('./assets/json/130119/fraccion-arancelaria.json');
    expect(REQ.request.method).toBe('GET');
    REQ.flush(MOCK_RESPONSE);
  });

  it('getPais debe realizar una solicitud HTTP GET y retornar los datos esperados', () => {
    const MOCK_RESPONSE: CatalogoResponse[] = [{ id: 4, descripcion: 'País 1' }];

    service.getPais().subscribe((data) => {
      expect(data).toEqual(MOCK_RESPONSE);
    });

    const REQ = httpMock.expectOne('./assets/json/130119/pais.json');
    expect(REQ.request.method).toBe('GET');
    REQ.flush(MOCK_RESPONSE);
  });

  it('getEstado debe realizar una solicitud HTTP GET y retornar los datos esperados', () => {
    const MOCK_RESPONSE: CatalogoResponse[] = [{ id: 5, descripcion: 'Estado 1' }];

    service.getEstado().subscribe((data) => {
      expect(data).toEqual(MOCK_RESPONSE);
    });

    const REQ = httpMock.expectOne('./assets/json/130119/estado.json');
    expect(REQ.request.method).toBe('GET');
    REQ.flush(MOCK_RESPONSE);
  });

  it('getRepresentacionfederal debe realizar una solicitud HTTP GET y retornar los datos esperados', () => {
    const MOCK_RESPONSE: CatalogoResponse[] = [{ id: 6, descripcion: 'Representación Federal 1' }];

    service.getRepresentacionfederal().subscribe((data) => {
      expect(data).toEqual(MOCK_RESPONSE);
    });

    const REQ = httpMock.expectOne('./assets/json/130119/representacion-federal.json');
    expect(REQ.request.method).toBe('GET');
    REQ.flush(MOCK_RESPONSE);
  });

  it('obtenerDatosDeLaSolicitud debe realizar una solicitud HTTP GET y retornar los datos esperados', () => {
    const MOCK_RESPONSE: Tramite130119State = {
      descripcion: 'Descripción',
      fraccionArancelaria: 'Fracción',
      umt: 'UMT',
      cantidad: 'Cantidad',
      valorFacturaUSD: 'Valor',
      paisOrigen: 'País Origen',
      paisExportador: 'País Exportador',
      numeroFactura: 'Factura',
      fechaExpedicionFactura: 'Fecha',
      observaciones: 'Observaciones',
      regimen: '',
      clasificacionDeRegimen: '',
      estado: '',
      representacionFederal: ''
    };

    service.obtenerDatosDeLaSolicitud().subscribe((data) => {
      expect(data).toEqual(MOCK_RESPONSE);
    });

    const REQ = httpMock.expectOne('./assets/json/130119/datos.json');
    expect(REQ.request.method).toBe('GET');
    REQ.flush(MOCK_RESPONSE);
  });

  it('establecerDatosDeLaSolicitud debe llamar al método establecerDatos del store con los datos proporcionados', () => {
    const MOCK_DATOS: Tramite130119State = {
      descripcion: 'Descripción',
      fraccionArancelaria: 'Fracción',
      umt: 'UMT',
      cantidad: 'Cantidad',
      valorFacturaUSD: 'Valor',
      paisOrigen: 'País Origen',
      paisExportador: 'País Exportador',
      numeroFactura: 'Factura',
      fechaExpedicionFactura: 'Fecha',
      observaciones: 'Observaciones',
      regimen: '',
      clasificacionDeRegimen: '',
      estado: '',
      representacionFederal: ''
    };

    service.establecerDatosDeLaSolicitud(MOCK_DATOS);
    expect(mockStore.establecerDatos).toHaveBeenCalledWith({ ...MOCK_DATOS });
  });
});