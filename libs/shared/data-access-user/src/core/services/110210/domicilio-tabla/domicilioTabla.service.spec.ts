import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DomicilioTablaService } from './domicilioTabla.service';
import { HttpCoreService } from '../../shared/http/http.service';

describe('DomicilioTablaService', () => {
  let service: DomicilioTablaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DomicilioTablaService, HttpCoreService]
    });
    service = TestBed.inject(DomicilioTablaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch data from JSON file', () => {
    const mockData = { key: 'value' };

    service.getData().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('./assets/json/110210/domicilio-tabla-data.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});