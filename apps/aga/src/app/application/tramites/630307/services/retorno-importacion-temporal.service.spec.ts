import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RetornoImportacionTemporalService } from './retorno-importacion-temporal.service';
import { Catalogo } from '@libs/shared/data-access-user/src';

describe('RetornoImportacionTemporalService', () => {
  let service: RetornoImportacionTemporalService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RetornoImportacionTemporalService],
    });

    service = TestBed.inject(RetornoImportacionTemporalService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch secciones aduaneras', () => {
    const mockData: Catalogo[] = [
      { id: 1, descripcion: 'Sección 1' },
      { id: 2, descripcion: 'Sección 2' },
    ];

    service.getSeccionAduanera().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('/assets/json/630307/seccion-aduanera.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData); // Simulate the response
  });

  it('should fetch aduanas de ingreso', () => {
    const mockData: Catalogo[] = [
      { id: 1, descripcion: 'Aduana 1' },
      { id: 2, descripcion: 'Aduana 2' },
    ];

    service.getAduanaDeIngreso().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('/assets/json/630307/aduana-de-ingreso.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData); // Simulate the response
  });

  it('should fetch prórrogas', () => {
    const mockData: Catalogo[] = [
      { id: 1, descripcion: 'Prórroga 1' },
      { id: 2, descripcion: 'Prórroga 2' },
    ];

    service.getProrroga().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('/assets/json/630307/prorroga.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData); // Simulate the response
  });
});