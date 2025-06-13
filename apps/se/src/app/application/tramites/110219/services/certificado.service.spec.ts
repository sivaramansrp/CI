import { TestBed } from '@angular/core/testing';
import { CertificadoService } from './certificado.service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('CertificadoService', () => {
  let service: CertificadoService;
  let httpMock: any;

  beforeEach(() => {
    httpMock = {
      get: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        CertificadoService,
        { provide: HttpClient, useValue: httpMock }
      ]
    });
    service = TestBed.inject(CertificadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http.get for getTratadoData', () => {
    httpMock.get.mockReturnValue(of([{ id: 1, descripcion: 'Tratado' }]));
    service.getTratadoData().subscribe(data => {
      expect(data).toEqual([{ id: 1, descripcion: 'Tratado' }]);
    });
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/110219/tratado.json');
  });

  it('should call http.get for getSolicitudesTabla', () => {
    httpMock.get.mockReturnValue(of([{ numeroCertificado: '123' }]));
    service.getSolicitudesTabla().subscribe(data => {
      expect(data).toEqual([{ numeroCertificado: '123' }]);
    });
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/110219/certificados-disponibles.json');
  });

  it('should call http.get for getMercanciaCertificadoTabla', () => {
    httpMock.get.mockReturnValue(of([{ mercancia: 'Mercancia1' }]));
    service.getMercanciaCertificadoTabla().subscribe(data => {
      expect(data).toEqual([{ mercancia: 'Mercancia1' }]);
    });
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/110219/mercancia-certificado.json');
  });

  it('should handle error in getTratadoData', () => {
    httpMock.get.mockReturnValue(throwError(() => new Error('fail')));
    service.getTratadoData().subscribe({
      error: (err) => expect(err).toBeInstanceOf(Error)
    });
  });

  it('should handle error in getSolicitudesTabla', () => {
    httpMock.get.mockReturnValue(throwError(() => new Error('fail')));
    service.getSolicitudesTabla().subscribe({
      error: (err) => expect(err).toBeInstanceOf(Error)
    });
  });

  it('should handle error in getMercanciaCertificadoTabla', () => {
    httpMock.get.mockReturnValue(throwError(() => new Error('fail')));
    service.getMercanciaCertificadoTabla().subscribe({
      error: (err) => expect(err).toBeInstanceOf(Error)
    });
  });
});