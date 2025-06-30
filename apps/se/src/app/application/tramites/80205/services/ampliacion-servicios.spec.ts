import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AmpliacionServiciosService } from './ampliacion-servicios.service';
import { AmpliacionServiciosStore } from '../estados/tramite80205.store';
import { AmpliacionServiciosState, Servicio} from '../models/datos-info.model';
import { Catalogo } from '@libs/shared/data-access-user/src';

describe('AmpliacionServiciosService', () => {
  let service: AmpliacionServiciosService;
  let httpMock: HttpTestingController;
  let tramiteStoreMock: Partial<AmpliacionServiciosStore>;

  beforeEach(() => {
    tramiteStoreMock = {
      setInfoRegistro: jest.fn(),
      setAduanaDeIngreso: jest.fn(),
      setNumeroPrograma: jest.fn(),
      setRfcEmpresa: jest.fn(),
      setTiempoPrograma: jest.fn(),
      setDatosImmex: jest.fn(),
      setDatos: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AmpliacionServiciosService,
        { provide: AmpliacionServiciosStore, useValue: tramiteStoreMock },
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
    const mockResponse: Servicio[] = [
      { descripiónDelServicio: 'Servicio 1', descripcion: 'Descripción 1', tipode: 'Tipo 1' },
      { descripiónDelServicio: 'Servicio 2', descripcion: 'Descripción 2', tipode: 'Tipo 2' },
    ];

    service.getDatos().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/80205/ampliacion-servicios.json');
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockResponse });
  });

  it('should fetch ingreso select list from JSON', () => {
    const mockResponse: Catalogo[] = [
      { id: 1, descripcion: 'Ingreso 1' },
      { id: 2, descripcion: 'Ingreso 2' },
    ];

    service.obtenerIngresoSelectList().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/80205/ampliacion-IMMEX-dropdown.json');
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockResponse });
  });

  it('should update formulario state', () => {
    const mockState: AmpliacionServiciosState = {
      servicios: { seleccionaLaModalidad: 'Modalidad Test', folio: 'Folio Test', ano: '2023' },
      aduanaDeIngresoSelecion: [{ id: 1, descripcion: 'Aduana 1' }],
      rfcEmpresa: 'RFC123456',
      numeroPrograma: '12345',
      tiempoPrograma: '12 meses',
      tablaDatos: [
        {
          Servicio: 'Servicio IMMEX 1',
          RegistroContribuyentes: 'RFC123',
          DenominaciónSocial: 'Empresa Test',
          NumeroIMMEX: 'IMMEX123',
          AñoIMMEX: '2023',
        },
      ],
      tablaDatosIMMEX: [
        { descripiónDelServicio: 'Servicio IMMEX Detallado', descripcion: 'Descripción Detallada', tipode: 'Tipo Detallado' },
      ],
    };

    service.actualizarEstadoFormulario(mockState);

    expect(tramiteStoreMock.setInfoRegistro).toHaveBeenCalledWith(mockState.servicios);
    expect(tramiteStoreMock.setAduanaDeIngreso).toHaveBeenCalledWith(mockState.aduanaDeIngresoSelecion);
    expect(tramiteStoreMock.setNumeroPrograma).toHaveBeenCalledWith(mockState.numeroPrograma);
    expect(tramiteStoreMock.setRfcEmpresa).toHaveBeenCalledWith(mockState.rfcEmpresa);
    expect(tramiteStoreMock.setTiempoPrograma).toHaveBeenCalledWith(mockState.tiempoPrograma);
    expect(tramiteStoreMock.setDatosImmex).toHaveBeenCalledWith(mockState.tablaDatosIMMEX);
    expect(tramiteStoreMock.setDatos).toHaveBeenCalledWith(mockState.tablaDatos);
  });

  it('should fetch servicios data from JSON', () => {
    const mockResponse: AmpliacionServiciosState = {
      servicios: { seleccionaLaModalidad: 'Modalidad Test', folio: 'Folio Test', ano: '2023' },
      aduanaDeIngresoSelecion: [{ id: 1, descripcion: 'Aduana 1' }],
      rfcEmpresa: 'RFC123456',
      numeroPrograma: '12345',
      tiempoPrograma: '12 meses',
      tablaDatos: [
        {
          Servicio: 'Servicio IMMEX 1',
          RegistroContribuyentes: 'RFC123',
          DenominaciónSocial: 'Empresa Test',
          NumeroIMMEX: 'IMMEX123',
          AñoIMMEX: '2023',
        },
      ],
      tablaDatosIMMEX: [
        { descripiónDelServicio: 'Servicio IMMEX Detallado', descripcion: 'Descripción Detallada', tipode: 'Tipo Detallado' },
      ],
    };

    service.getServiciosData().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/80205/ampliacion-campo.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});