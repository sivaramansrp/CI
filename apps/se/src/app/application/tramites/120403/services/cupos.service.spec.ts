import { TestBed } from '@angular/core/testing';
import { CuposService } from './cupos.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Tramite120403Store, Solicitud120403State, Catalogo } from '../state/Tramite120403.store';

describe('CuposService', () => {
  let service: CuposService;
  let httpMock: HttpTestingController;
  let tramiteStoreMock: any;

  beforeEach(() => {
    tramiteStoreMock = {
      setAsignacionRadio: jest.fn(),
      setAsignacionsolitud: jest.fn(),
      setNumTramite: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Tramite120403Store, useValue: tramiteStoreMock }
      ]
    });

    service = TestBed.inject(CuposService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update store in actualizarEstadoFormulario', () => {
    const datos: Solicitud120403State = {
      asignacionRadio: 'radio',
      asignacionsolitud: 'solicitud',
      numTramite: '123',
      fechaFin: '2024-12-31',
      ampliar: '1000',
      valorSeleccionado: null,
    };
    service.actualizarEstadoFormulario(datos);
    expect(tramiteStoreMock.setAsignacionRadio).toHaveBeenCalledWith('radio');
    expect(tramiteStoreMock.setAsignacionsolitud).toHaveBeenCalledWith('solicitud');
    expect(tramiteStoreMock.setNumTramite).toHaveBeenCalledWith('123');
  });

  it('should fetch registro toma muestras mercancias data', () => {
    const mockResponse: Solicitud120403State = {
      asignacionRadio: 'radio',
      asignacionsolitud: 'solicitud',
      numTramite: '123',
      fechaFin: '2024-12-31',
      ampliar: '1000',
      valorSeleccionado: null,
    };
    service.getRegistroTomaMuestrasMercanciasData().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('assets/json/120403/registro_toma_muestras_mercancias.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch datos ano', () => {
    const mockResponse: Catalogo[] = [{ id: 1, descripcion: '2024' }];
    service.obtenerDatosAno().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('assets/json/120403/ano.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});