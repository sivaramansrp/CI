import { TestBed } from '@angular/core/testing';
import { ImportacionesAgropecuariasService } from './importaciones-agropecuarias.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { ENVIRONMENT } from '@libs/shared/data-access-user/src';

jest.mock('@libs/shared/data-access-user/src', () => ({
  ENVIRONMENT: { URL_SERVER_JSON_AUXILIAR: 'http://mock-server' }
}));

describe('ImportacionesAgropecuariasService', () => {
  let service: ImportacionesAgropecuariasService;
  let httpMock: any;

  beforeEach(() => {
    httpMock = { get: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        ImportacionesAgropecuariasService,
        { provide: HttpClient, useValue: httpMock }
      ]
    });

    service = TestBed.inject(ImportacionesAgropecuariasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http.get with correct URL in obtenerTramite', (done) => {
    const mockResponse = { data: 'test' };
    httpMock.get.mockReturnValue(of(mockResponse));
    service.obtenerTramite(123).subscribe(result => {
      expect(result).toEqual(mockResponse);
      expect(httpMock.get).toHaveBeenCalledWith('http://mock-server/123');
      done();
    });
  });

  it('should handle errors in obtenerTramite', (done) => {
    const error = new Error('Network error');
    httpMock.get.mockReturnValue(throwError(() => error));
    service.obtenerTramite(456).subscribe({
      next: () => {},
      error: (err) => {
        expect(err).toBe(error);
        done();
      }
    });
  });

  it('should call http.get with correct path in datosDeLaSolicitud', (done) => {
    const mockData = { campo: 'valor' };
    httpMock.get.mockReturnValue(of(mockData));
    service.datosDeLaSolicitud().subscribe(result => {
      expect(result).toEqual(mockData);
      expect(httpMock.get).toHaveBeenCalledWith('assets/json/130107/datos-de-la-solicitud.json');
      done();
    });
  });
});