import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { SolicitudService } from './solicitud.service';
import { solicitudModel } from '../models/permiso-maquila.models';
import { catalogoResponse } from '@libs/shared/data-access-user/src';

describe('SolicitudService', () => {
  let service: SolicitudService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SolicitudService], // Add HttpClientTestingModule to resolve HttpClient dependencies
      providers: [], // Provide the SolicitudService
    });

    service = TestBed.inject(SolicitudService); // Inject the service
    httpMock = TestBed.inject(HttpTestingController); // Inject the HttpTestingController
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no requests are pending
  });

  it('should fetch solicitudes from the API', () => {
    const mockSolicitudes: solicitudModel[] = [
      { fechaCreación: '', mercancía: 'Test Solicitud 1', cantidad: '', proveedor: '' },
    ];

    service.getSolicitudes().subscribe((solicitudes) => {
      expect(solicitudes).toEqual(mockSolicitudes); // Assert the fetched data matches the mock data
    });

    const req = httpMock.expectOne('assets/json/260212/solicitud.json'); // Expect one request to the specified URL
    expect(req.request.method).toBe('GET'); // Assert the request method is GET
    req.flush(mockSolicitudes); // Provide the mock data as the response
  });

  it('should fetch clave from the API', () => {
    const mockClave: catalogoResponse[] = [
      { id: 1, descripcion: 'Test Clave 1' },
      { id: 2, descripcion: 'Test Clave 2' },
    ];

    service.getclave().subscribe((clave) => {
      expect(clave).toEqual(mockClave); // Assert the fetched data matches the mock data
    });

    const req = httpMock.expectOne('assets/json/260212/clave.json'); // Expect one request to the specified URL
    expect(req.request.method).toBe('GET'); // Assert the request method is GET
    req.flush(mockClave); // Provide the mock data as the response
  });
});
