import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AmpliacionServiciosService } from './ampliacion-servicios.service';
import { AmpliacionServiciosStore } from '../estados/tramite80205.store';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { Servicio, AmpliacionServiciosState } from '../models/datos-info.model';

describe('AmpliacionServiciosService', () => {
  let service: AmpliacionServiciosService;
  let httpMock: HttpTestingController;
  let store: AmpliacionServiciosStore;

  const mockStore = {
    setInfoRegistro: jest.fn(),
    setAduanaDeIngresoSeleccion: jest.fn(),
    setNumeroPrograma: jest.fn(),
    setRfcEmpresa: jest.fn(),
    setTiempoPrograma: jest.fn(),
    setDatosImmex: jest.fn(),
    setDatos: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AmpliacionServiciosService,
        { provide: AmpliacionServiciosStore, useValue: mockStore }
      ]
    });
    service = TestBed.inject(AmpliacionServiciosService);
    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(AmpliacionServiciosStore);
  });

  afterEach(() => {
    httpMock.verify();
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getDatos should fetch and map data', () => {
    const mockResponse = { data: [{ id: 1, descripcion: 'desc', tipode: 'tipo' }] };
    service.getDatos().subscribe(data => {
      expect(data).toEqual(mockResponse.data);
    });
    const req = httpMock.expectOne('assets/json/80205/ampliacion-servicios.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('obtenerIngresoSelectList should fetch and map data', () => {
    const mockResponse = { data: [{ id: 1, descripcion: 'desc' }] };
    service.obtenerIngresoSelectList().subscribe(data => {
      expect(data).toEqual(mockResponse.data);
    });
    const req = httpMock.expectOne('assets/json/80205/ampliacion-IMMEX-dropdown.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('actualizarEstadoFormulario should update store', () => {
    const mockState: AmpliacionServiciosState = {
      servicios: { seleccionaLaModalidad: '', folio: '', ano: '' },
      aduanaDeIngresoSelecion: { id: 1, descripcion: 'desc' },
      rfcEmpresa: 'RFC',
      numeroPrograma: '123',
      tiempoPrograma: '2024',
      tablaDatosIMMEX: [{ id: 1, descripcion: 'desc', tipode: 'tipo' }],
      tablaDatos: [{ Servicio: 'S', RegistroContribuyentes: 'RC', DenominaciónSocial: 'DS', NumeroIMMEX: 'N', AñoIMMEX: 'A' }]
    };
    service.actualizarEstadoFormulario(mockState);
    expect(store.setInfoRegistro).toHaveBeenCalledWith(mockState.servicios);
    expect(store.setAduanaDeIngresoSeleccion).toHaveBeenCalledWith(mockState.aduanaDeIngresoSelecion);
    expect(store.setNumeroPrograma).toHaveBeenCalledWith(mockState.numeroPrograma);
    expect(store.setRfcEmpresa).toHaveBeenCalledWith(mockState.rfcEmpresa);
    expect(store.setTiempoPrograma).toHaveBeenCalledWith(mockState.tiempoPrograma);
    expect(store.setDatosImmex).toHaveBeenCalledWith(mockState.tablaDatosIMMEX);
    expect(store.setDatos).toHaveBeenCalledWith(mockState.tablaDatos);
  });

  it('getServiciosData should fetch AmpliacionServiciosState', () => {
    const mockState: AmpliacionServiciosState = {
      servicios: { seleccionaLaModalidad: '', folio: '', ano: '' },
      aduanaDeIngresoSelecion: { id: 1, descripcion: 'desc' },
      rfcEmpresa: 'RFC',
      numeroPrograma: '123',
      tiempoPrograma: '2024',
      tablaDatosIMMEX: [],
      tablaDatos: []
    };
    service.getServiciosData().subscribe(data => {
      expect(data).toEqual(mockState);
    });
    const req = httpMock.expectOne('assets/json/80205/ampliacion-campo.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockState);
  });

  it('getTablaDatos should fetch Servicio[]', () => {
    const mockData = [{ id: 1, descripcion: 'desc', tipode: 'tipo' }];
    service.getTablaDatos().subscribe(data => {
      expect(data).toEqual(mockData);
    });
    const req = httpMock.expectOne('assets/json/80205/ampliaciaon-autrazidos.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});