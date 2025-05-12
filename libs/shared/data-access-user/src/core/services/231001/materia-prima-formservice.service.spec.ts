
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpCoreService } from '../shared/http/http.service';
import { MateriaprimaformserviceService } from './materia-prima-formservice.service';
import { TestBed } from '@angular/core/testing';


describe('MateriaprimaformserviceService', () => {
  let service: MateriaprimaformserviceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpCoreService, MateriaprimaformserviceService]
    });
    service = TestBed.inject(MateriaprimaformserviceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch unidad de medida', () => {
    const mockData = [{ id: 1, descripcion: 'Unidad 1' }];
    service.getUnidadMedida().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('./assets/json/231001/comboUnidadMedida.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch capitulo fraccion', () => {
    const mockData = [{ id: 1, descripcion: 'Capítulo 1' }];
    service.getCapituloFraccion().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('./assets/json/231001/comboCapituloFraccion.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch partida fraccion', () => {
    const mockData = [{ id: 1, descripcion: 'Partida 1' }];
    service.getPartidaFraccion().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('./assets/json/231001/comboPartidaFraccion.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch subpartida fraccion', () => {
    const mockData = [{ id: 1, descripcion: 'Subpartida 1' }];
    service.getSubPartidaFraccion().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('./assets/json/231001/comboSubPartidaFraccion.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch fraccion arancelaria parametros', () => {
    const mockData = [{ id: 1, descripcion: 'Fracción 1' }];
    service.getFraccionArancelariaParametros().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('./assets/json/231001/comboFraccionArancelariaParametros.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should handle error', () => {
    const errorMessage = 'Error loading data';
    service.getUnidadMedida().subscribe(
      () => fail('should have failed with the error'),
      (error) => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpMock.expectOne('./assets/json/231001/comboUnidadMedida.json');
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });
});