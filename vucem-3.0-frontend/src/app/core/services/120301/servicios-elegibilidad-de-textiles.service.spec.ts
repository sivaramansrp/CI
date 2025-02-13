import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServiciosElegibilidadDeTextilesService } from './servicios-elegibilidad-de-textiles.service';

describe('ServiciosElegibilidadDeTextilesService', () => {
  let service: ServiciosElegibilidadDeTextilesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServiciosElegibilidadDeTextilesService]
    });
    service = TestBed.inject(ServiciosElegibilidadDeTextilesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch data successfully', () => {
    const mockData = {
      data: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' }
      ]
    };

    service.getData().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('assets/json/120301/elegibilidad-de-textiles.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should handle error while fetching data', () => {
    service.getData().subscribe(
      () => fail('should have failed with the 500 error'),
      (error) => {
        expect(error.status).toBe(500);
      }
    );

    const req = httpMock.expectOne('assets/json/120301/elegibilidad-de-textiles.json');
    expect(req.request.method).toBe('GET');
    req.flush('Something went wrong', { status: 500, statusText: 'Server Error' });
  });

  // Add more test cases as needed
});
