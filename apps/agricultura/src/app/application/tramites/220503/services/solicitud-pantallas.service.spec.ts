import { TestBed } from '@angular/core/testing';
import { SolicitudPantallasService } from './solicitud-pantallas.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { CargarDatosIniciales, TipoContenedor } from '../models/solicitud-pantallas.model';
import { DatosDelTramiteRealizar } from '../models/solicitud-pantallas.model';

describe('SolicitudPantallasService', () => {
  let service: SolicitudPantallasService;
  let httpClientMock: jest.Mocked<HttpClient>;

  const mockDataUrl = '../../../assets/json/220503/solicitud-pantallas-mock-data.json';

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn()
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
    const mockResponse: CargarDatosIniciales = { /* mock properties */ } as any;
    httpClientMock.get.mockReturnValue(of(mockResponse));

    service.getData().subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    expect(httpClientMock.get).toHaveBeenCalledWith(mockDataUrl);
  });

  it('should call http.get with correct URL in getDataDatosDelTramite', () => {
    const mockResponse: DatosDelTramiteRealizar = { /* mock properties */ } as any;
    httpClientMock.get.mockReturnValue(of(mockResponse));

    service.getDataDatosDelTramite().subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    expect(httpClientMock.get).toHaveBeenCalledWith(mockDataUrl);
  });

  it('should call http.get with correct URL in getDataResponsableInspeccion', () => {
    const mockResponse: TipoContenedor = { /* mock properties */ } as any;
    httpClientMock.get.mockReturnValue(of(mockResponse));

    service.getDataResponsableInspeccion().subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    expect(httpClientMock.get).toHaveBeenCalledWith(mockDataUrl);
  });

  it('should call getData in constructor', () => {
    const spy = jest.spyOn(SolicitudPantallasService.prototype, 'getData');
    // Recreate service to trigger constructor
    new SolicitudPantallasService(httpClientMock);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});