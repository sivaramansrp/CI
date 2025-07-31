import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AmpliacionServiciosService } from './ampliacion-servicios.service';
import { Tramite80206Store } from '../estados/tramite80206.store';
import { DatosResponse } from '../models/datos-info.model';
import { RespuestaCatalogos } from '@ng-mf/data-access-user';
import { AmpliacionServiciosState } from '../estados/tramite80206.store';

describe('AmpliacionServiciosService', () => {
  let service: AmpliacionServiciosService;
  let httpMock: HttpTestingController;
  let tramiteStoreMock: Partial<Tramite80206Store>;

  beforeEach(() => {
    tramiteStoreMock = {
      setInfoRegistro: jest.fn(),
      setRfcEmpresa: jest.fn(),
      setImportacion: jest.fn(),
      setCantidad: jest.fn(),
      setFraccionArancelaria: jest.fn(),
      setSeleccionaLaModalidad: jest.fn(),
      setSeleccionarRegla: jest.fn(),
      setSector: jest.fn(),
      setDatosSector: jest.fn(),
      setIsSelectedRegla: jest.fn(),
      setValor: jest.fn(),
      setDatosImmex: jest.fn(),
      setDatosImportacion: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AmpliacionServiciosService,
        { provide: Tramite80206Store, useValue: tramiteStoreMock },
      ],
    });

    service = TestBed.inject(AmpliacionServiciosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch datos from JSON', () => {
    const mockResponse: DatosResponse[] = [
      {
        code: 200,
        data: {
          idsubmanufacturer: '123',
          infoServicios: {
            seleccionaLaModalidad: 'Modalidad Test',
            folio: 'Folio 12345',
            ano: '2022',
          },
        },
      },
    ];

    service.getDatos().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/80206/ampliacion-anexo.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch regla select list from JSON', () => {
    const mockResponse: RespuestaCatalogos = {
      code: 200,
      data: [
        { id: 1, descripcion: 'Regla 1' },
        { id: 2, descripcion: 'Regla 2' },
      ],
      message: 'Success',
    };

    service.obtenerReglaSelectList().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/80206/seleccionar-regla-dropdown.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch sector select list from JSON', () => {
    const mockResponse: RespuestaCatalogos = {
      code: 200,
      data: [
        { id: 1, descripcion: 'Sector 1' },
        { id: 2, descripcion: 'Sector 2' },
      ],
      message: 'Success',
    };

    service.obtenerSectorSelectList().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/80206/sector-dropdown.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should update formulario state', () => {
    const mockState: AmpliacionServiciosState = {
      infoRegistro: { seleccionaLaModalidad: 'a',
      folio: 'b',
      ano: 'c'},
      datosImmex: [],
      datosImportacion: [],
      datosSector: [],
      datos: [],
      aduanaDeIngresoSelecion: '1',
      sectorSelecion: '2',
      formaValida: { isValid: true },
      fraccion: '1234.56.78',
      importacion: 'Importación Test',
      fraccionArancelaria: 'Fracción Test',
      cantidad: '100',
      valor: '1000',
      seleccionaLaModalidad: 'Modalidad Test',
      seleccionarRegla: 'Regla Test',
      sector: 'Sector Test',
      sectorDesplegable: [{ id: 1, descripcion: 'Sector 1' }],
      reglaSeleccionada: [{ id: 2, descripcion: 'Regla 2' }],
      isSelectedRegla: true,
    };

    service.actualizarEstadoFormulario(mockState);

    expect(tramiteStoreMock.setInfoRegistro).toHaveBeenCalledWith(mockState.infoRegistro);
    expect(tramiteStoreMock.setRfcEmpresa).toHaveBeenCalledWith(mockState.fraccion);
    expect(tramiteStoreMock.setImportacion).toHaveBeenCalledWith(mockState.importacion);
    expect(tramiteStoreMock.setCantidad).toHaveBeenCalledWith(mockState.cantidad);
    expect(tramiteStoreMock.setFraccionArancelaria).toHaveBeenCalledWith(mockState.fraccionArancelaria);
    expect(tramiteStoreMock.setSeleccionaLaModalidad).toHaveBeenCalledWith(mockState.seleccionaLaModalidad);
    expect(tramiteStoreMock.setSeleccionarRegla).toHaveBeenCalledWith(mockState.seleccionarRegla);
    expect(tramiteStoreMock.setSector).toHaveBeenCalledWith(mockState.sector);
    expect(tramiteStoreMock.setDatosSector).toHaveBeenCalledWith(mockState.datosSector);
    expect(tramiteStoreMock.setIsSelectedRegla).toHaveBeenCalledWith(mockState.isSelectedRegla);
    expect(tramiteStoreMock.setValor).toHaveBeenCalledWith(mockState.valor);
    expect(tramiteStoreMock.setDatosImmex).toHaveBeenCalledWith(mockState.datosImmex);
    expect(tramiteStoreMock.setDatosImportacion).toHaveBeenCalledWith(mockState.datosImportacion);
  });

  it('should fetch servicios data from JSON', () => {
    const mockResponse: AmpliacionServiciosState = {
      infoRegistro:{ seleccionaLaModalidad: 'a',
      folio: 'b',
      ano: 'c',},
      datosImmex: [],
      datosImportacion: [],
      datosSector: [],
      datos: [],
      aduanaDeIngresoSelecion: '1',
      sectorSelecion: '2',
      formaValida: { isValid: true },
      fraccion: '1234.56.78',
      importacion: 'Importación Test',
      fraccionArancelaria: 'Fracción Test',
      cantidad: '100',
      valor: '1000',
      seleccionaLaModalidad: 'Modalidad Test',
      seleccionarRegla: 'Regla Test',
      sector: 'Sector Test',
      sectorDesplegable: [{ id: 1, descripcion: 'Sector 1' }],
      reglaSeleccionada: [{ id: 2, descripcion: 'Regla 2' }],
      isSelectedRegla: true,
    };

    service.getServiciosData().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/80206/datos-previos.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});