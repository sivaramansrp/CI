import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CuposService } from './cupos.service';
import { Catalogo } from '../state/Tramite120403.store';

describe('CuposService', () => {
  let service: CuposService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CuposService],
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

  it('should fetch data for año catalogo', () => {
    const mockResponse: Catalogo[] = [
      { id: 0, descripcion: '2023' },
      { id: 1, descripcion: '2024' },
      { id: 2, descripcion: '2025' },
    ];

    service.obtenerDatosAno().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/120403/ano.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle HTTP errors gracefully', () => {
    const errorMessage = 'Error occurred while fetching data';

    service.obtenerDatosAno().subscribe(
      () => fail('Expected an error, not data'),
      (error) => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpMock.expectOne('assets/json/120403/ano.json');
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });
});