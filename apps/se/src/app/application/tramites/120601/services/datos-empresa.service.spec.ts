import { TestBed } from '@angular/core/testing';
import { DatosEmpresaService } from './datos-empresa.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Tramite120601Store } from '../estados/tramite-120601.store';
import { Tramite120601Query } from '../estados/tramite-120601.query';

describe('DatosEmpresaService', () => {
  let service: DatosEmpresaService;
  let httpMock: any;
  let storeMock: any;
  let queryMock: any;

  beforeEach(() => {
    httpMock = { get: jest.fn() };
    storeMock = {
      setNacionalidad: jest.fn(),
      setPersona: jest.fn(),
      setCadenaDependencia: jest.fn(),
      setTipoDeEmpresa: jest.fn(),
      setActividadEconomicaClave: jest.fn(),
      setEstado: jest.fn(),
      setRepresentacion: jest.fn()
    };
    queryMock = {};

    TestBed.configureTestingModule({
      providers: [
        DatosEmpresaService,
        { provide: HttpClient, useValue: httpMock },
        { provide: Tramite120601Store, useValue: storeMock },
        { provide: Tramite120601Query, useValue: queryMock }
      ]
    });

    service = TestBed.inject(DatosEmpresaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('obtenerDatosTablaDeSocios should call http.get with correct URL', () => {
    httpMock.get.mockReturnValue(of([]));
    service.obtenerDatosTablaDeSocios().subscribe();
    expect(httpMock.get).toHaveBeenCalledWith('/assets/json/120601/datosSocios-table.json');
  });

  it('obtenerEstado should call http.get with correct URL', () => {
    httpMock.get.mockReturnValue(of([]));
    service.obtenerEstado().subscribe();
    expect(httpMock.get).toHaveBeenCalledWith('/assets/json/120601/tipoDeEmpresa.json');
  });

  it('obtenerDatosDeRepresentacionFederal should call http.get with correct URL', () => {
    httpMock.get.mockReturnValue(of([]));
    service.obtenerDatosDeRepresentacionFederal().subscribe();
    expect(httpMock.get).toHaveBeenCalledWith('/assets/json/120601/representacionFederal.json');
  });

  it('ObtenerTablaDeRepresentaciónFederal should call http.get with correct URL', () => {
    httpMock.get.mockReturnValue(of([]));
    service.ObtenerTablaDeRepresentaciónFederal().subscribe();
    expect(httpMock.get).toHaveBeenCalledWith('/assets/json/120601/representacionFederal-table.json');
  });

  it('getRegistroTomaMuestrasMercanciasData should call http.get with correct URL', () => {
    httpMock.get.mockReturnValue(of({}));
    service.getRegistroTomaMuestrasMercanciasData().subscribe();
    expect(httpMock.get).toHaveBeenCalledWith('/assets/json/120601/datosEmpresa.json');
  });

  it('actualizarEstadoFormulario should update store with FormSolicitud.datosImportadorExportador', () => {
    const datos = {
      FormSolicitud: {
        datosImportadorExportador: {
          nacionalidad: 'MX',
          persona: 'FISICA',
          cadenaDependencia: 'cadena'
        }
      },
      solicitudForm: undefined,
      representacionFederal: undefined
    };
    service.actualizarEstadoFormulario(datos as any);
    expect(storeMock.setNacionalidad).toHaveBeenCalledWith('MX');
    expect(storeMock.setPersona).toHaveBeenCalledWith('FISICA');
    expect(storeMock.setCadenaDependencia).toHaveBeenCalledWith('cadena');
  });

  it('actualizarEstadoFormulario should update store with solicitudForm.tipoDeEmpresa and actividadEconomicaClave', () => {
    const datos = {
      FormSolicitud: {},
      solicitudForm: {
        tipoDeEmpresa: { id: 5 },
        actividadEconomicaClave: 'clave'
      },
      representacionFederal: undefined
    };
    service.actualizarEstadoFormulario(datos as any);
    expect(storeMock.setTipoDeEmpresa).toHaveBeenCalledWith('5');
    expect(storeMock.setActividadEconomicaClave).toHaveBeenCalledWith('clave');
  });

  it('actualizarEstadoFormulario should update store with representacionFederal', () => {
    const datos = {
      FormSolicitud: {},
      solicitudForm: {},
      representacionFederal: {
        estado: { id: 7 },
        representacion: { id: 8 }
      }
    };
    service.actualizarEstadoFormulario(datos as any);
    expect(storeMock.setEstado).toHaveBeenCalledWith('7');
    expect(storeMock.setRepresentacion).toHaveBeenCalledWith('8');
  });
});