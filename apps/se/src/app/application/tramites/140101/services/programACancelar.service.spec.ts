import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProgramaACancelarService } from './programACancelar.service';
import { ProgramaACancelar } from '../../../shared/models/programa-cancelar.model';
import { Tramite140101Store } from '../../../estados/tramites/tramite140101.store';

describe('ProgramaACancelarService', () => {
  let service: ProgramaACancelarService;
  let httpMock: HttpTestingController;
  let tramiteStoreMock: any;

  beforeEach(() => {
    tramiteStoreMock = {
      setConfirmar: jest.fn(),
      setSolicitudObservaciones: jest.fn(),
      setPrograma: jest.fn(),
      setRadioSelection: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Tramite140101Store, useValue: tramiteStoreMock },
        ProgramaACancelarService,
      ]
    });

    service = TestBed.inject(ProgramaACancelarService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch programaACancelar data', () => {
    const mockData:ProgramaACancelar = {
      folioPrograma: '12345',
      idProgramaSeleccionado: '67890',
      modalidad: 'Presencial',
      representacionFederal: 'Federal',
      tipoPrograma: 'Educativo',
      estatus: 'Activo',
    };

    service.obtenerDatos().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('assets/json/140101/Programa.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData); // Simulate the response
  });

  it('should handle error in getDatos', () => {
    const mockError = { status: 404, statusText: 'Not Found' };

    service.obtenerDatos().subscribe(
      () => fail('Expected an error, not data'),
      (error) => {
        expect(error).toEqual(mockError);
      }
    );

    const req = httpMock.expectOne('assets/json/140101/Programa.json');
    expect(req.request.method).toBe('GET');
    req.flush(null, mockError);
  });

  it('should handle error in getDatos', () => {
    const mockError = { status: 500, statusText: 'Internal Server Error' };

    service.obtenerDatos().subscribe(
      () => fail('Expected an error, not data'),
      (error) => {
        expect(error).toEqual(mockError);
      }
    );

    const req = httpMock.expectOne('assets/json/140101/Programa.json');
    expect(req.request.method).toBe('GET');
    req.flush(null, mockError);
  });

  it('should handle error in getDatos', () => {
    const mockError = { status: 403, statusText: 'Forbidden' };

    service.obtenerDatos().subscribe(
      () => fail('Expected an error, not data'),
      (error) => {
        expect(error).toEqual(mockError);
      }
    );

    const req = httpMock.expectOne('assets/json/140101/Programa.json');
    expect(req.request.method).toBe('GET');
    req.flush(null, mockError);
  });

  it('should handle error in getDatos', () => {
    const mockError = { status: 400, statusText: 'Bad Request' };

    service.obtenerDatos().subscribe(
      () => fail('Expected an error, not data'),
      (error) => {
        expect(error).toEqual(mockError);
      }
    );

    const req = httpMock.expectOne('assets/json/140101/Programa.json');
    expect(req.request.method).toBe('GET');
    req.flush(null, mockError);
  });

  it('should getProgramaDatos and return Programa140101State', () => {
    const mockResponse = {
      programaACancelar: {},
      solicitudObservaciones: '',
      confirmar: false,
      radio: 0,
      datos: [],
    };
    service.getProgramaDatos().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('assets/json/140101/programa-cancelar.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call store methods with correct values in setDatosFormulario', () => {
    const datos = {
      confirmar: true,
      solicitudObservaciones: 'Obs',
      programaACancelar: { folioPrograma: '123' },
      radio: 2
    };
    service.setDatosFormulario(datos as any);

    expect(tramiteStoreMock.setConfirmar).toHaveBeenCalledWith(true);
    expect(tramiteStoreMock.setSolicitudObservaciones).toHaveBeenCalledWith('Obs');
    expect(tramiteStoreMock.setPrograma).toHaveBeenCalledWith({ folioPrograma: '123' });
    expect(tramiteStoreMock.setRadioSelection).toHaveBeenCalledWith(2);
  });
});