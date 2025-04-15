import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BuscarCertificadoDeOrigenService } from './BuscarCertificadoDeOrigen.service';
import { HttpCoreService } from '../../shared/http/http.service';

describe('BuscarCertificadoDeOrigenService', () => {
  let service: BuscarCertificadoDeOrigenService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BuscarCertificadoDeOrigenService, HttpCoreService]
    });
    service = TestBed.inject(BuscarCertificadoDeOrigenService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch entidad federativa data from JSON file', () => {
    const mockData = { key: 'value' };

    service.getPaisBloque().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('./assets/json/110210/pais-bloque.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch representacion federal data from JSON file', () => {
    const mockData = { key: 'value' };

    service.getTratadoAcuerdo().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('./assets/json/110210/tratado-acuerdo.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});