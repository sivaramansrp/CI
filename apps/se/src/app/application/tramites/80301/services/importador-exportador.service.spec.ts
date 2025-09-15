import { TestBed } from '@angular/core/testing';
import { ImportadorExportadorService } from './importador-exportador.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Tramite80301Store } from '../estados/tramite80301.store';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ImportadorExportadorService', () => {
  let service: ImportadorExportadorService;
  let httpClientMock: jest.Mocked<HttpClient>;
  let storeMock: jest.Mocked<Tramite80301Store>;

  const mockResponse = { data: [{ id: 1, name: 'test' }] };

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

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ImportadorExportadorService,
        { provide: HttpClient, useValue: httpClientMock },
        { provide: Tramite80301Store, useValue: storeMock }
      ]
    });

    service = TestBed.inject(ImportadorExportadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAduanaIngresara should call http.get and store.setAduana', async () => {
    httpClientMock.get.mockReturnValue(of(mockResponse));
    await service.getAduanaIngresara().toPromise().then((res) => {
      expect(res).toEqual(mockResponse);
      expect(httpClientMock.get).toHaveBeenCalledWith('assets/json/80301/aduanaIngresara.json');
      expect(storeMock.setAduana).toHaveBeenCalledWith(JSON.stringify(mockResponse.data));
    });
  });

  it('getAno should call http.get and store.setAno', async () => {
    httpClientMock.get.mockReturnValue(of(mockResponse));
    await service.getAno().toPromise().then((res) => {
      expect(res).toEqual(mockResponse);
      expect(httpClientMock.get).toHaveBeenCalledWith('assets/json/80301/ano.json');
      expect(storeMock.setAno).toHaveBeenCalledWith(JSON.stringify(mockResponse.data));
    });
  });

  it('getCondicion should call http.get and store.setCondicion', async () => {
    httpClientMock.get.mockReturnValue(of(mockResponse));
    await service.getCondicion().toPromise().then((res) => {
      expect(res).toEqual(mockResponse);
      expect(httpClientMock.get).toHaveBeenCalledWith('assets/json/80301/condicion.json');
      expect(storeMock.setCondicion).toHaveBeenCalledWith(mockResponse.data);
    });
  });

  it('getPais should call http.get and store.setPais', async () => {
    httpClientMock.get.mockReturnValue(of(mockResponse));
    await service.getPais().toPromise().then((res) => {
      expect(res).toEqual(mockResponse);
      expect(httpClientMock.get).toHaveBeenCalledWith('assets/json/80301/pais.json');
      expect(storeMock.setPais).toHaveBeenCalledWith(mockResponse.data);
    });
  });

  it('getTipoDocumento should call http.get and store.setTipoDocumento', async () => {
    httpClientMock.get.mockReturnValue(of(mockResponse));
    await service.getTipoDocumento().toPromise().then((res) => {
      expect(res).toEqual(mockResponse);
      expect(httpClientMock.get).toHaveBeenCalledWith('assets/json/80301/tipodocumento.json');
      expect(storeMock.setTipoDocumento).toHaveBeenCalledWith(mockResponse.data);
    });
  });

  it('getFechasSeleccionadas should call http.get and store.setFechasSeleccionadas', async () => {
    httpClientMock.get.mockReturnValue(of(mockResponse));
    await service.getFechasSeleccionadas().toPromise().then((res) => {
      expect(res).toEqual(mockResponse);
      expect(httpClientMock.get).toHaveBeenCalledWith('assets/json/80301/fechasSeleccionadas.json');
      expect(storeMock.setFechasSeleccionadas).toHaveBeenCalledWith(mockResponse.data);
    });
  });

  it('getDocumentos should call http.get and store.setDocumentos', async () => {
    httpClientMock.get.mockReturnValue(of(mockResponse));
    await service.getDocumentos().toPromise().then((res) => {
      expect(res).toEqual(mockResponse);
      expect(httpClientMock.get).toHaveBeenCalledWith('assets/json/80301/documentos.json');
      expect(storeMock.setDocumentos).toHaveBeenCalledWith(mockResponse.data);
    });
  });
});
