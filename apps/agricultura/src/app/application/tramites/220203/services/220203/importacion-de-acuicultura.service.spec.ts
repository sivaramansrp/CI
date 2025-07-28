// importacion-de-acuicultura.service.spec.ts
import { HttpClient } from '@angular/common/http';
import { SeccionLibStore } from '@ng-mf/data-access-user';
import { of } from 'rxjs';
import { AcuiculturaStore } from '../../estados/220203/sanidad-certificado.store';
import { ImportacionDeAcuiculturaService } from './importacion-de-acuicultura.service';

describe('ImportacionDeAcuiculturaService', () => {
  let service: ImportacionDeAcuiculturaService;
  let httpClientMock: Partial<HttpClient>;
  let acuiculturaStoreMock: Partial<AcuiculturaStore>;
  let seccionStoreMock: Partial<SeccionLibStore>;

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn()
    };

    acuiculturaStoreMock = {
      _select: jest.fn(),
      actualizarPagoDeDerechos: jest.fn(),
      actualizarFormularioMovilizacion: jest.fn(),
      actualizarDatosMercancia: jest.fn(),
      limpiarFormulario: jest.fn(),
      actualizarTodoElEstado: jest.fn(),
      actualizarSoloRealizarGroup: jest.fn(),
      updateTercerosRelacionados: jest.fn(),
    };

    seccionStoreMock = {
      // mock any needed methods here (currently none called)
    };

    service = new ImportacionDeAcuiculturaService(
      httpClientMock as HttpClient,
      acuiculturaStoreMock as AcuiculturaStore,
      seccionStoreMock as SeccionLibStore
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('obtenerDetallesDelCatalogo should call http.get with correct url', () => {
    const file = 'catalogo.json';
    const mockResponse = { data: 'test' };
    (httpClientMock.get as jest.Mock).mockReturnValue(of(mockResponse));

    service.obtenerDetallesDelCatalogo(file).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    expect(httpClientMock.get).toHaveBeenCalledWith('assets/json/220203/' + file);
  });

  it('obtenerDatos should return observable from store', () => {
    const mockData = { some: 'state' };
    (acuiculturaStoreMock._select as jest.Mock).mockReturnValue(of(mockData));

    const obs$ = service.obtenerDatos();
    obs$.subscribe(data => {
      expect(data).toEqual(mockData);
    });

    expect(acuiculturaStoreMock._select).toHaveBeenCalled();
  });

  it('actualizarPagoDeDerechos should call store method', () => {
    const pago = { monto: 1000 };
    service.actualizarPagoDeDerechos(pago as any);
    expect(acuiculturaStoreMock.actualizarPagoDeDerechos).toHaveBeenCalledWith(pago);
  });

  it('actualizarFormularioMovilizacion should call store method', () => {
    const movilizacion = { campo: 'valor' };
    service.actualizarFormularioMovilizacion(movilizacion as any);
    expect(acuiculturaStoreMock.actualizarFormularioMovilizacion).toHaveBeenCalledWith(movilizacion);
  });

  it('actualizarDatosMercancia should call store method', () => {
    const grupo = { grupo: 'datos' };
    service.actualizarDatosMercancia(grupo as any);
    expect(acuiculturaStoreMock.actualizarDatosMercancia).toHaveBeenCalledWith(grupo);
  });

  it('limpiarFormulario should call store limpiarFormulario', () => {
    service.limpiarFormulario();
    expect(acuiculturaStoreMock.limpiarFormulario).toHaveBeenCalled();
  });

  it('getAcuiculturaData should call http.get with correct url', () => {
    const mockResponse = { data: 'mock' };
    (httpClientMock.get as jest.Mock).mockReturnValue(of(mockResponse));
    service.getAcuiculturaData().subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
    expect(httpClientMock.get).toHaveBeenCalledWith('assets/json/220203/acuicultura_forma.json');
  });

  it('actualizarEstadoFormulario should await store actualizarTodoElEstado', async () => {
    (acuiculturaStoreMock.actualizarTodoElEstado as jest.Mock).mockResolvedValue(undefined);

    await service.actualizarEstadoFormulario({} as any);
    expect(acuiculturaStoreMock.actualizarTodoElEstado).toHaveBeenCalledWith({});
  });

  it('actualizarSoloRealizarGroup should call store actualizarSoloRealizarGroup', () => {
    const grupo = { grupo: 'realizar' };
    service.actualizarSoloRealizarGroup(grupo as any);
    expect(acuiculturaStoreMock.actualizarSoloRealizarGroup).toHaveBeenCalledWith(grupo);
  });

  it('updateTercerosRelacionado should call store updateTercerosRelacionados', () => {
    const terceros = [{ id: 1 }, { id: 2 }];
    service.updateTercerosRelacionado(terceros as any);
    expect(acuiculturaStoreMock.updateTercerosRelacionados).toHaveBeenCalledWith(terceros);
  });

  it('getAllDatosForma should return observable from store', () => {
    const mockState = { stateKey: 'value' };
    (acuiculturaStoreMock._select as jest.Mock).mockReturnValue(of(mockState));
    service.getAllDatosForma().subscribe(res => {
      expect(res).toEqual(mockState);
    });
    expect(acuiculturaStoreMock._select).toHaveBeenCalled();
  });
});
