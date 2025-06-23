import { TestBed } from '@angular/core/testing';
import { ExpedicionCertificadosFronteraService } from './expedicion-certificados-frontera.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Catalogo } from '@libs/shared/data-access-user/src';

describe('ExpedicionCertificadosFronteraService', () => {
  let service: ExpedicionCertificadosFronteraService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExpedicionCertificadosFronteraService]
    });
    service = TestBed.inject(ExpedicionCertificadosFronteraService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAnoOficioDatos', () => {
    it('should return an array of Catalogo', () => {
      const mockResponse: Catalogo[] = [
        { id: 1, descripcion: 'Año 2023' },
        { id: 2, descripcion: 'Año 2024' }
      ];

      service.getAnoOficioDatos().subscribe(data => {
        expect(data).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('assets/json/120702/ano-oficio.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
});
