import { ExpedicionCertificadoService } from './expedicion-certificado.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('ExpedicionCertificadoService', () => {
  let service: ExpedicionCertificadoService;
  let httpMock: any;
  let tramiteStoreMock: any;

  beforeEach(() => {
    httpMock = {
      get: jest.fn()
    };
    tramiteStoreMock = {
      setEntidadFederativa: jest.fn(),
      setRepresentacionFederal: jest.fn(),
      setMontoExpedir: jest.fn(),
      setMontoExpedirCheck: jest.fn(),
      setMontoDisponsible: jest.fn(),
      setTotalExpedir: jest.fn(),
      setNumeraDelicitacion: jest.fn(),
      setFechaDelEventoDelicitacion: jest.fn(),
      setDescripcionDelProducto: jest.fn()
    };
    service = new ExpedicionCertificadoService(httpMock, tramiteStoreMock);
  });

  it('should call http.get for getEntidadFederativa', () => {
    httpMock.get.mockReturnValue(of([]));
    service.getEntidadFederativa().subscribe();
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/120204/entidad-federativa.json');
  });

  it('should call http.get for getRepresentacionFederal', () => {
    httpMock.get.mockReturnValue(of([]));
    service.getRepresentacionFederal().subscribe();
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/120204/representacion-federal.json');
  });

  it('should call http.get for getDetallesDelalicitacion', () => {
    httpMock.get.mockReturnValue(of({}));
    service.getDetallesDelalicitacion().subscribe();
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/120204/detalles-licitacion.json');
  });

  it('should call http.get for getDistribucionSaldo', () => {
    httpMock.get.mockReturnValue(of({}));
    service.getDistribucionSaldo().subscribe();
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/120204/distribucion-saldo.json');
  });

  it('should call http.get for obtenerDatosTabla', () => {
    httpMock.get.mockReturnValue(of({}));
    service.obtenerDatosTabla().subscribe();
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/120204/datos-de-la-tabla.json');
  });

  it('should call http.get for getExpedienteCertificado', () => {
    httpMock.get.mockReturnValue(of({}));
    service.getExpedienteCertificado().subscribe();
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/120204/expedicion-certificado.json');
  });

  it('should call all tramiteStore setters in setDatosFormulario', () => {
    const datos = {
      entidadFederativa: 'Entidad',
      representacionFederal: 'RepFed',
      montoAExpedir: '10',
      montoAExpedirCheck: true,
      montoDisponible: '100',
      totalAExpedir: '110',
      numeraDelicitacion: 'LIC123',
      fechaDelEventoDelicitacion: '2024-01-01',
      descripcionDelProducto: 'Producto'
    };
    service.setDatosFormulario(datos as any);
    expect(tramiteStoreMock.setEntidadFederativa).toHaveBeenCalledWith('Entidad');
    expect(tramiteStoreMock.setRepresentacionFederal).toHaveBeenCalledWith('RepFed');
    expect(tramiteStoreMock.setMontoExpedir).toHaveBeenCalledWith('10');
    expect(tramiteStoreMock.setMontoExpedirCheck).toHaveBeenCalledWith(true);
    expect(tramiteStoreMock.setMontoDisponsible).toHaveBeenCalledWith('100');
    expect(tramiteStoreMock.setTotalExpedir).toHaveBeenCalledWith('110');
    expect(tramiteStoreMock.setNumeraDelicitacion).toHaveBeenCalledWith('LIC123');
    expect(tramiteStoreMock.setFechaDelEventoDelicitacion).toHaveBeenCalledWith('2024-01-01');
    expect(tramiteStoreMock.setDescripcionDelProducto).toHaveBeenCalledWith('Producto');
  });
});
