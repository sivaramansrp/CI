
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ImportadorExportadorService } from './importador-exportador.service';
import { Tramite80301Store } from '../estados/tramite80301.store';

describe('ImportadorExportadorService (Jest)', () => {
  let service: ImportadorExportadorService;
  let httpClientMock: jest.Mocked<HttpClient>;
  let storeMock: jest.Mocked<Tramite80301Store>;

  const mockResponse = {
    data: [{ id: 1, descripcion: 'Mock Descripción' }]
  };

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn()
    } as any;

    storeMock = {
      setAduana: jest.fn(),
      setAno: jest.fn(),
      setCondicion: jest.fn(),
      setPais: jest.fn(),
      setTipoDocumento: jest.fn(),
      setFechasSeleccionadas: jest.fn(),
      setDocumentos: jest.fn()
    } as any;

    service = new ImportadorExportadorService(httpClientMock, storeMock);
  });

  const testCases = [
    { method: 'getAduanaIngresara', storeMethod: 'setAduana', url: 'assets/json/80301/aduanaIngresara.json' },
    { method: 'getAno', storeMethod: 'setAno', url: 'assets/json/80301/ano.json' },
    { method: 'getCondicion', storeMethod: 'setCondicion', url: 'assets/json/80301/condicion.json' },
    { method: 'getPais', storeMethod: 'setPais', url: 'assets/json/80301/pais.json' },
    { method: 'getTipoDocumento', storeMethod: 'setTipoDocumento', url: 'assets/json/80301/tipodocumento.json' },
    { method: 'getFechasSeleccionadas', storeMethod: 'setFechasSeleccionadas', url: 'assets/json/80301/fechasSeleccionadas.json' },
    { method: 'getDocumentos', storeMethod: 'setDocumentos', url: 'assets/json/80301/documentos.json' }
  ];

  testCases.forEach(({ method, storeMethod, url }) => {
    it(`should call ${storeMethod} with response data on ${method}`, (done) => {
      httpClientMock.get.mockReturnValue(of(mockResponse));

      (service as any)[method]().subscribe((res: any) => {
        expect(httpClientMock.get).toHaveBeenCalledWith(url);
        expect(storeMock[storeMethod as keyof Tramite80301Store]).toHaveBeenCalledWith(mockResponse.data);
        expect(res).toEqual(mockResponse);
        done();
      });
    });
  });
});

