import { TestBed } from '@angular/core/testing';
import { SolicitudService } from './solicitud.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Solicitud150102Store } from '../estados/solicitud150102.store';
import { GuardarDatosFormulario } from '../models/programas-reporte.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SolicitudService', () => {
  let service: SolicitudService;
  let httpClientSpy: jest.Mocked<HttpClient>;
  let storeSpy: jest.Mocked<Solicitud150102Store>;

  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn()
    } as any;

    storeSpy = {
      actualizarInicio: jest.fn(()=> of()),
      actualizarFin: jest.fn(()=> of()),
      actualizarFolioPrograma: jest.fn(()=> of()),
      actualizarModalidad: jest.fn(()=> of()),
      actualizarTipoPrograma: jest.fn(()=> of()),
      actualizarEstatus: jest.fn(()=> of()),
      actualizarVentasTotales: jest.fn(()=> of()),
      actualizarTotalExportaciones: jest.fn(()=> of()),
      actualizarTotalImportaciones: jest.fn(()=> of()),
      actualizarSaldo: jest.fn(()=> of()),
      actualizarPorcentajeExportacion: jest.fn(()=> of())
    } as any;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SolicitudService,
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: Solicitud150102Store, useValue: storeSpy }
      ]
    });

    service = TestBed.inject(SolicitudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('obtenerProgramasReporte should call http.get with correct URL', (done) => {
    const mockData = [{ id: 1, nombre: 'Programa' }];
    httpClientSpy.get.mockReturnValue(of(mockData));
    service.obtenerProgramasReporte().subscribe(data => {
      expect(data).toEqual(mockData);
      expect(httpClientSpy.get).toHaveBeenCalledWith('assets/json/150102/programas-reporte.json');
      done();
    });
  });

  it('obtenerReporteFechas should call http.get with correct URL', (done) => {
    const mockData = { inicio: '2023-01-01', fin: '2023-12-31' };
    httpClientSpy.get.mockReturnValue(of(mockData));
    service.obtenerReporteFechas().subscribe(data => {
      expect(data).toEqual(mockData);
      expect(httpClientSpy.get).toHaveBeenCalledWith('assets/json/150102/reporte-fechas.json');
      done();
    });
  });

  it('obtenerProducidosDatos should call http.get with correct URL', (done) => {
    const mockData = [{ id: 1, producto: 'Producto' }];
    httpClientSpy.get.mockReturnValue(of(mockData));
    service.obtenerProducidosDatos().subscribe(data => {
      expect(data).toEqual(mockData);
      expect(httpClientSpy.get).toHaveBeenCalledWith('assets/json/150102/producidos-datos.json');
      done();
    });
  });

  it('guardarDatosFormulario should call http.get with correct URL', (done) => {
    const mockData = { inicio: '2023-01-01' } as GuardarDatosFormulario;
    httpClientSpy.get.mockReturnValue(of(mockData));
    service.guardarDatosFormulario().subscribe(data => {
      expect(data).toEqual(mockData);
      expect(httpClientSpy.get).toHaveBeenCalledWith('assets/json/150102/guardar-datos-formulario.json');
      done();
    });
  });

  it('actualizarEstadoFormulario should update store with correct values', () => {
    const resp: GuardarDatosFormulario = {
      inicio: '2023-01-01',
      fin: '2023-12-31',
      folioPrograma: 'FP123',
      modalidad: 'MOD',
      tipoPrograma: 'TIPO',
      estatus: 'ACTIVO',
      ventasTotales: '1000',
      totalExportaciones: '500',
      totalImportaciones: '200',
      saldo: '300',
      porcentajeExportacion: '50'
    };
    service.actualizarEstadoFormulario(resp);
    expect(storeSpy.actualizarInicio).toHaveBeenCalledWith(resp.inicio);
    expect(storeSpy.actualizarFin).toHaveBeenCalledWith(resp.fin);
    expect(storeSpy.actualizarFolioPrograma).toHaveBeenCalledWith(resp.folioPrograma);
    expect(storeSpy.actualizarModalidad).toHaveBeenCalledWith(resp.modalidad);
    expect(storeSpy.actualizarTipoPrograma).toHaveBeenCalledWith(resp.tipoPrograma);
    expect(storeSpy.actualizarEstatus).toHaveBeenCalledWith(resp.estatus);
    expect(storeSpy.actualizarVentasTotales).toHaveBeenCalledWith(resp.ventasTotales);
    expect(storeSpy.actualizarTotalExportaciones).toHaveBeenCalledWith(resp.totalExportaciones);
    expect(storeSpy.actualizarTotalImportaciones).toHaveBeenCalledWith(resp.totalImportaciones);
    expect(storeSpy.actualizarSaldo).toHaveBeenCalledWith(resp.saldo);
    expect(storeSpy.actualizarPorcentajeExportacion).toHaveBeenCalledWith(resp.porcentajeExportacion);
  });
});