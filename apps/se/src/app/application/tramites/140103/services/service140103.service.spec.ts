import { TestBed } from '@angular/core/testing';
import { Solicitud140103Service } from './service140103.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Tramite140103Store } from '../../../estados/tramites/tramite140103.store';
import { ENVIRONMENT } from '../../../../environments/environment';

describe('Solicitud140103Service', () => {
  let service: Solicitud140103Service;
  let httpMock: HttpTestingController;
  let tramite140103StoreMock: any;

  beforeEach(() => {
    tramite140103StoreMock = {
      setRegimen: jest.fn(),
      setMecanismo: jest.fn(),
      setTratado: jest.fn(),
      setProducto: jest.fn(),
      setSubproducto: jest.fn(),
      setRepresentacion: jest.fn(),
      setCantidad: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Tramite140103Store, useValue: tramite140103StoreMock }
      ]
    });

    service = TestBed.inject(Solicitud140103Service);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debe actualizar el store con los DATOS proporcionados en actualizarEstadoFormulario', () => {
    const datos = {
      regimen: 'reg1',
      mecanismo: 'mec1',
      tratado: 'trat1',
      producto: 'prod1',
      subproducto: 'subprod1',
      representacion: 'rep1',
      cantidad: 5
    };

    service.actualizarEstadoFormulario(datos as any);

    expect(tramite140103StoreMock.setRegimen).toHaveBeenCalledWith('reg1');
    expect(tramite140103StoreMock.setMecanismo).toHaveBeenCalledWith('mec1');
    expect(tramite140103StoreMock.setTratado).toHaveBeenCalledWith('trat1');
    expect(tramite140103StoreMock.setProducto).toHaveBeenCalledWith('prod1');
    expect(tramite140103StoreMock.setSubproducto).toHaveBeenCalledWith('subprod1');
    expect(tramite140103StoreMock.setRepresentacion).toHaveBeenCalledWith('rep1');
    expect(tramite140103StoreMock.setCantidad).toHaveBeenCalledWith(5);
  });

  it('solo debe actualizar los campos definidos en actualizarEstadoFormulario', () => {
    const datos = { regimen: 'reg1', cantidad: 10 };
    service.actualizarEstadoFormulario(datos as any);

    expect(tramite140103StoreMock.setRegimen).toHaveBeenCalledWith('reg1');
    expect(tramite140103StoreMock.setCantidad).toHaveBeenCalledWith(10);
    expect(tramite140103StoreMock.setMecanismo).not.toHaveBeenCalled();
    expect(tramite140103StoreMock.setTratado).not.toHaveBeenCalled();
    expect(tramite140103StoreMock.setProducto).not.toHaveBeenCalled();
    expect(tramite140103StoreMock.setSubproducto).not.toHaveBeenCalled();
    expect(tramite140103StoreMock.setRepresentacion).not.toHaveBeenCalled();
  });

  it('debe obtener los datos de registro toma muestras mercancias', () => {
    const mockResponse = { regimen: 'reg1' };
    service.getRegistroTomaMuestrasMercanciasData().subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/140103/cancelacion-de-cupo.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});