import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ValidarInicalmenteService } from './validar-inicalmente.service';

describe('ValidarInicalmenteService', () => {
  let service: ValidarInicalmenteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ValidarInicalmenteService],
    });
    service = TestBed.inject(ValidarInicalmenteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call obtenerEstadoList and return a list of states', () => {
    const mockResponse = { data: [{ id: 1, name: 'Estado 1' }, { id: 2, name: 'Estado 2' }] };

    service.obtenerEstadoList().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('/api/estados'); // Replace with the actual API endpoint
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle error when obtenerEstadoList fails', () => {
    const mockError = { status: 500, statusText: 'Internal Server Error' };

    service.obtenerEstadoList().subscribe(
      () => fail('Expected an error, not a successful response'),
      (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      }
    );

    const req = httpMock.expectOne('/api/estados'); // Replace with the actual API endpoint
    req.flush(null, mockError);
  });

  it('should call obtenerFormDatos and return a list of states', () => {
    const mockResponse = { data: [{ id: 1, name: 'Estado 1' }, { id: 2, name: 'Estado 2' }] };

    service.obtenerFormDatos().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('/api/estados'); // Replace with the actual API endpoint
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
  it('should call obtenerTablaDatos and return a list of states', () => {
    const mockResponse = { data: [{ id: 1, name: 'Estado 1' }, { id: 2, name: 'Estado 2' }] };

    service.obtenerTablaDatos().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('/api/estados'); // Replace with the actual API endpoint
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});