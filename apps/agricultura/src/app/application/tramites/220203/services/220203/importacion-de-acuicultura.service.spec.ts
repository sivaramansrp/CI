import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ImportacionDeAcuiculturaService } from './importacion-de-acuicultura.service';
import { AcuiculturaStore } from '../../estados/220203/sanidad-certificado.store';
import { SeccionLibStore } from '@ng-mf/data-access-user';
import { of } from 'rxjs';

describe('ImportacionDeAcuiculturaService', () => {
  let service: ImportacionDeAcuiculturaService;
  let httpMock: HttpTestingController;
  let mockAcuiculturaStore: any;
  let mockSeccionStore: any;

  beforeEach(() => {
    mockAcuiculturaStore = {
      _select: jest.fn(),
      actualizarFormularioPago: jest.fn(),
      actualizarFormularioMovilizacion: jest.fn(),
      actualizarDatosMercancia: jest.fn(),
      actualizarformaValida: jest.fn(),
      limpiarFormulario: jest.fn(),
      actualizarTercerosRelacionados: jest.fn()
    };

    mockSeccionStore = {
      establecerSeccion: jest.fn(),
      establecerFormaValida: jest.fn()
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AcuiculturaStore, useValue: mockAcuiculturaStore },
        { provide: SeccionLibStore, useValue: mockSeccionStore }
      ]
    });

    service = TestBed.inject(ImportacionDeAcuiculturaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no open HTTP calls
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch catalog details', () => {
    const mockResponse = { data: [{ id: 1, descripcion: 'Banco1' }] };
    service.obtenerDetallesDelCatalogo('banco.json').subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/220203/banco.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get acuicultura data from store', () => {
    const mockState = { formularioPago: {}, formaValida: {} };
    mockAcuiculturaStore._select.mockReturnValue(of(mockState));

    service.obtenerDatos().subscribe(data => {
      expect(data).toEqual(mockState);
    });
  });

  it('should update formularioPago in store', () => {
    const payload = { cadena: 'value' };
 expect(mockAcuiculturaStore.actualizarPagoDeDerechos).toHaveBeenCalledWith(payload);
    expect(mockAcuiculturaStore.actualizarFormularioPago).toHaveBeenCalledWith(payload);
  });

  it('should update formularioMovilizacion in store', () => {
    const payload = { moviliza: true };
     expect(mockAcuiculturaStore.actualizarFormularioMovilizacion).toHaveBeenCalledWith(payload);
    expect(mockAcuiculturaStore.actualizarFormularioMovilizacion).toHaveBeenCalledWith(payload);
  });

  it('should update datosMercancia in store', () => {
    const payload = { mercancia: 'yes' };
         expect(mockAcuiculturaStore.actualizarDatosMercancia).toHaveBeenCalledWith(payload);
    expect(mockAcuiculturaStore.actualizarDatosMercancia).toHaveBeenCalledWith(payload);
  });

  it('should update formaValida and call seccion store', () => {
    const forma = { paso1: true, paso2: true };
    mockAcuiculturaStore._select.mockReturnValue(of(forma));
     expect(mockAcuiculturaStore.actualizarFormaValida).toHaveBeenCalledWith(forma);
    expect(mockAcuiculturaStore.actualizarformaValida).toHaveBeenCalledWith(forma);
     expect(mockAcuiculturaStore.actualizarFormularioMovilizacion).toHaveBeenCalledWith(forma);
    service.obtenerTodosLosStatus().subscribe((status: boolean) => {
      expect(status).toBe(true);
    });
  });

  it('should set false on formaValida if any value is false', () => {
    const forma = { paso1: true, paso2: false };
    mockAcuiculturaStore._select.mockReturnValue(of(forma));

    service.obtenerTodosLosStatus().subscribe(status => {
      expect(status).toBe(false);
    });
  });

  it('should reset form using limpiarFormulario', () => {
    service.limpiarFormulario();
    expect(mockAcuiculturaStore.limpiarFormulario).toHaveBeenCalled();
  });

  it('should fetch acuicultura JSON data', () => {
    const mockData = { formularioPago: {}, datosMercancia: {} };
    service.getAcuiculturaData().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('assets/json/220203/acuicultura_forma.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should update all form state parts', () => {
    const datos = {
      formularioPago: { pago: true },
      formularioMovilizacion: { movil: true },
      datosMercancia: { merc: true }
    };
    service.actualizarEstadoFormulario(datos as any);
    expect(mockAcuiculturaStore.actualizarFormularioPago).toHaveBeenCalledWith(datos.formularioPago);
    expect(mockAcuiculturaStore.actualizarFormularioMovilizacion).toHaveBeenCalledWith(datos.formularioMovilizacion);
    expect(mockAcuiculturaStore.actualizarDatosMercancia).toHaveBeenCalledWith(datos.datosMercancia);
  });

  it('should update terceros relacionados', () => {
    const terceros = [{ nombre: 'Juan' }];
    expect(mockAcuiculturaStore.updateTercerosRelacionado).toHaveBeenCalledWith(terceros);
    expect(mockAcuiculturaStore.actualizarTercerosRelacionados).toHaveBeenCalledWith(terceros);
  });
});
