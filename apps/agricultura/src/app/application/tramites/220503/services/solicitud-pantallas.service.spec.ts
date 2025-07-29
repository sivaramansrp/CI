import { TestBed } from '@angular/core/testing';
import { SolicitudPantallasService } from './solicitud-pantallas.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { CargarDatosIniciales, TipoContenedor } from '../models/solicitud-pantallas.model';
import { DatosDelTramiteRealizar } from '../models/solicitud-pantallas.model';

describe('SolicitudPantallasService', () => {
  let service: SolicitudPantallasService;
  let httpClientMock: jest.Mocked<HttpClient>;

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn().mockReturnValue(of({ test: 'data' }))
    } as any;

    TestBed.configureTestingModule({
      providers: [
        SolicitudPantallasService,
        { provide: HttpClient, useValue: httpClientMock }
      ]
    });

    service = TestBed.inject(SolicitudPantallasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http.get with correct URL in getData', () => {
    const mockResponse = { test: 'data' } as any;
    httpClientMock.get.mockReturnValue(of(mockResponse));

    const result$ = service.getData();

    expect(httpClientMock.get).toHaveBeenCalledWith(service['dataUrl']);
    result$.subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
  });

  it('should call http.get with correct URL in getDataDatosDelTramite', () => {
    const mockResponse = { test: 'data' } as any;
    httpClientMock.get.mockReturnValue(of(mockResponse));

    const result$ = service.getDataDatosDelTramite();

    expect(httpClientMock.get).toHaveBeenCalledWith(service['dataUrl']);
    result$.subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
  });

  it('should call http.get with correct URL in getDataResponsableInspeccion', () => {
    const mockResponse = { test: 'data' } as any;
    httpClientMock.get.mockReturnValue(of(mockResponse));

    const result$ = service.getDataResponsableInspeccion();

    expect(httpClientMock.get).toHaveBeenCalledWith(service['dataUrl']);
    result$.subscribe(data => {
      expect(data).toEqual(mockResponse);
    });
  });

  it('should call getData in constructor', () => {
    // The constructor calls getData, so we verify it was called during service creation
    expect(httpClientMock.get).toHaveBeenCalled();
  });

  it('should have correct dataUrl property', () => {
    expect(service['dataUrl']).toBe('../../../assets/json/220503/solicitud-pantallas-mock-data.json');
  });

  it('should return observable from getData method', () => {
    const result = service.getData();
    
    expect(result).toBeDefined();
    expect(typeof result.subscribe).toBe('function');
  });

  it('should return observable from getDataDatosDelTramite method', () => {
    const result = service.getDataDatosDelTramite();
    
    expect(result).toBeDefined();
    expect(typeof result.subscribe).toBe('function');
  });

  it('should return observable from getDataResponsableInspeccion method', () => {
    const result = service.getDataResponsableInspeccion();
    
    expect(result).toBeDefined();
    expect(typeof result.subscribe).toBe('function');
  });
});