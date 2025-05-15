import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DatosDeLaSolicitudService } from './datos-de-la-solicitud.service';
import { CatalogoResponse } from '@libs/shared/data-access-user/src';

describe('DatosDeLaSolicitudService', () => {
  let service: DatosDeLaSolicitudService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DatosDeLaSolicitudService]
    });

    service = TestBed.inject(DatosDeLaSolicitudService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('debe ser creado', () => {
    expect(service).toBeTruthy();
  });

  const testCases = [
    { method: 'getRegimen', url: './assets/json/130119/regimen.json' },
    { method: 'getClasificacionDeRegimen', url: './assets/json/130119/clasificacion-de-regimen.json' },
    { method: 'getFraccionArancelaria', url: './assets/json/130119/fraccion-arancelaria.json' },
    { method: 'getPais', url: './assets/json/130119/pais.json' },
    { method: 'getEstado', url: './assets/json/130119/estado.json' },
    { method: 'getRepresentacionfederal', url: './assets/json/130119/representacion-federal.json' }
  ];

  testCases.forEach(({ method, url }) => {
    it('Debería obtener los datos del régimen', () => {
      const mockResponse: CatalogoResponse[] = [{ id: 1, descripcion: 'Test Catalogo' }];
      
      service.getRegimen().subscribe((data) => { 
        expect(data).toEqual(mockResponse);
      });
    
      const req = httpMock.expectOne('./assets/json/130119/regimen.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
    
    it('debería buscar datos de clasificación de régimen', () => {
      const mockResponse: CatalogoResponse[] = [{ id: 2, descripcion: 'Otro Catalogo' }];
      
      service.getClasificacionDeRegimen().subscribe((data) => { 
        expect(data).toEqual(mockResponse);
      });
    
      const req = httpMock.expectOne('./assets/json/130119/clasificacion-de-regimen.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
    
  });
});
