import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CapturaSolicitudeService } from './captura-solicitud.service';
import { RespuestaCatalogos } from '@ng-mf/data-access-user';

describe('CapturaSolicitudeService', () => {
  let service: CapturaSolicitudeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule for mock HTTP interactions
      providers: [CapturaSolicitudeService],
    });

    service = TestBed.inject(CapturaSolicitudeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should fetch the catalog of banks', () => {
  //   const mockResponse: RespuestaCatalogos = {
  //     catalogos: [{ id: 1, nombre: 'Banco A' }, { id: 2, nombre: 'Banco B' }],
  //   };

  //   service.getBanco().subscribe((response) => {
  //     expect(response).toEqual(mockResponse); // Validate that the response matches the mock data
  //   });

  //   // Expect that the HTTP GET request matches the specified URL
  //   const req = httpMock.expectOne('assets/json/220402/banco.json');
  //   expect(req.request.method).toBe('GET');
  //   req.flush(mockResponse); // Respond with mock data
  // });
});
