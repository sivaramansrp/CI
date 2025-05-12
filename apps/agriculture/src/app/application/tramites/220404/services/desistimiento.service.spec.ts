import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DesistimientoService } from './desistimiento.service';
import { DesistimientoForm } from '../modelos/desistimiento.model';

describe('DesistimientoService', () => {
  let service: DesistimientoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DesistimientoService],
    });

    // Inject the service and mock HTTP client
    service = TestBed.inject(DesistimientoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure there are no outstanding HTTP requests
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch desistimiento data from the correct URL', () => {
    const mockResponse: DesistimientoForm = {
      folio: '12345',
      tipoDeSolicitud: 'Parcial',
      descripcion: 'Motivo de prueba',
    };

    service.getDesistimientoSolicitud().subscribe((data) => {
      expect(data).toEqual(mockResponse); // Check the response matches the mock data
    });

    // Expect the HTTP GET call to match the correct URL
    const req = httpTestingController.expectOne('/assets/json/220404/desistimiento.json');
    expect(req.request.method).toBe('GET');

    // Simulate a response with mock data
    req.flush(mockResponse);
  });

  it('should handle an error response gracefully', () => {
    const errorMessage = 'Failed to load';

    service.getDesistimientoSolicitud().subscribe(
      () => fail('Expected an error, not a successful response'),
      (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      }
    );

    // Simulate an HTTP error response
    const req = httpTestingController.expectOne('/assets/json/220404/desistimiento.json');
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });
});