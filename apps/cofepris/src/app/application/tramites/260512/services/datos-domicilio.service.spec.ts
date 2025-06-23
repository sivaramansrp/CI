import { DatosDomicilioService } from './datos-domicilio.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('DatosDomicilioService', () => {
  let service: DatosDomicilioService;
  let httpClientMock: { get: jest.Mock };

  beforeEach(() => {
    httpClientMock = { get: jest.fn() };
    service = new DatosDomicilioService(httpClientMock as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http.get with correct URL for getObtenerTablaDatos', (done) => {
    const mockResponse = { data: 'test' };
    httpClientMock.get.mockReturnValue(of(mockResponse));
    service.getObtenerTablaDatos().subscribe((res) => {
      expect(res).toEqual(mockResponse);
      expect(httpClientMock.get).toHaveBeenCalledWith('assets/json/cofepris/clave-scian.json');
      done();
    });
  });

  it('should call http.get with correct URL for getObtenerMercanciasDatos', (done) => {
    const mockResponse = { mercancias: [] };
    httpClientMock.get.mockReturnValue(of(mockResponse));
    service.getObtenerMercanciasDatos().subscribe((res) => {
      expect(res).toEqual(mockResponse);
      expect(httpClientMock.get).toHaveBeenCalledWith('assets/json/cofepris/mercancias-tabla.json');
      done();
    });
  });

  it('should have http injected as a public property', () => {
    expect(service.http).toBe(httpClientMock);
  });
});
