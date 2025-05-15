import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TercerosRelacionadosService } from './terceros-relacionados.service';
import { TercerosRelacionados } from '../models/aviso-modificacion.model';

describe('', () => {
  let service: TercerosRelacionadosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TercerosRelacionadosService],
    });

    service = TestBed.inject(TercerosRelacionadosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch programaACancelar data', () => {
    const mockData: TercerosRelacionados = {
      rfc: "LEQ8101314S7",
      curp: "LEQ810131HDGSXG05",
      nombre: "MISAEL",
      apellidoPaterno: "BARRAGAN",
      apellidoMaterno: "RUIZ",
      domicilio: "406 REFORMA 340 SAUCES DURANG SAUCES DURAN"
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
});