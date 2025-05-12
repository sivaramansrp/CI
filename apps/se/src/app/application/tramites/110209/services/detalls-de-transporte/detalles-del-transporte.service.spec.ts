import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DetallesDelTransporteService } from '../detalls-de-transporte/detalles-del-transporte.service';
import { Observable, of } from 'rxjs';

// Mock URL used in the service
const jsonURL = 'assets/json/110209/detalles-del-transporte.json';

describe('DetallesDelTransporteService', () => {
  let service: DetallesDelTransporteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DetallesDelTransporteService]
    });

    service = TestBed.inject(DetallesDelTransporteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that there are no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch transport details from the JSON file', () => {
    const mockResponse = {
      tratado: 'Sistema Generalizado de Preferencias',
      paisOBloque: 'Japon',
      paisOOrigin: 'Mexico',
      paisODestino: 'Japon',
      fetchaDeExpedicion: '2025-02-25',
      fetchaDeVencimiento: '2026-02-25'
    };

    // Mock the service method to return an observable
    jest.spyOn(service, 'getMedioDeTransporte').mockReturnValue(of(mockResponse));

    // Call the service method
    service.getMedioDeTransporte().subscribe(data => {
      expect(data).toEqual(mockResponse); // Check if the data is as expected
    });

    // Ensure the HTTP request is made to the correct URL
    const req = httpMock.expectOne(jsonURL);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); // Simulate the response
  });

  it('should handle HTTP error responses', () => {
    const errorMessage = 'Not Found';

    // Mock the service method to simulate an error
    jest.spyOn(service, 'getMedioDeTransporte').mockReturnValue(
      new Observable(observer => {
        observer.error({ status: 404, statusText: errorMessage });
      })
    );

    // Call the service method and expect an error to be thrown
    service.getMedioDeTransporte().subscribe(
      () => fail('Expected an error, but got data'),
      error => {
        expect(error.status).toBe(404);
        expect(error.statusText).toBe(errorMessage);
      }
    );

    // Simulate an HTTP error response
    const req = httpMock.expectOne(jsonURL);
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});
