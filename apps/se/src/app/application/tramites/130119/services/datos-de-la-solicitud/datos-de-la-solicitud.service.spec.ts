import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DatosDeLaSolicitudService } from './datos-de-la-solicitud.service';
import { HttpCoreService } from '@libs/shared/data-access-user/src';

describe('DatosDeLaSolicitudService', () => {
  let service: DatosDeLaSolicitudService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DatosDeLaSolicitudService, HttpCoreService]
    });

    service = TestBed.inject(DatosDeLaSolicitudService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch regimen options', () => {
    const dummyRegimen = [
      { id: '1', nombre: 'Regimen 1' },
      { id: '2', nombre: 'Regimen 2' }
    ];

    service.getRegimen().subscribe((regimen) => {
      expect(regimen.length).toBe(2);
      expect(regimen).toEqual(dummyRegimen);
    });

    const req = httpMock.expectOne('./assets/json/130119/regimen.json');
    expect(req.request.method).toBe('GET');
    req.flush(dummyRegimen);
  });

  it('should fetch clasificacion de regimen options', () => {
    const dummyClasificacion = [
      { id: '1', nombre: 'Clasificacion 1' },
      { id: '2', nombre: 'Clasificacion 2' }
    ];

    service.getClasificacionDeRegimen().subscribe((clasificacion) => {
      expect(clasificacion.length).toBe(2);
      expect(clasificacion).toEqual(dummyClasificacion);
    });

    const req = httpMock.expectOne('./assets/json/130119/clasificacion-de-regimen.json');
    expect(req.request.method).toBe('GET');
    req.flush(dummyClasificacion);
  });

  it('should fetch fraccion arancelaria options', () => {
    const dummyFraccion = [
      { id: '1', nombre: 'Fracción 1' },
      { id: '2', nombre: 'Fracción 2' }
    ];

    service.getFraccionArancelaria().subscribe((fraccion) => {
      expect(fraccion.length).toBe(2);
      expect(fraccion).toEqual(dummyFraccion);
    });

    const req = httpMock.expectOne('./assets/json/130119/fraccion-arancelaria.json');
    expect(req.request.method).toBe('GET');
    req.flush(dummyFraccion);
  });

  it('should fetch pais options', () => {
    const dummyPais = [
      { id: '1', nombre: 'País 1' },
      { id: '2', nombre: 'País 2' }
    ];

    service.getPais().subscribe((pais) => {
      expect(pais.length).toBe(2);
      expect(pais).toEqual(dummyPais);
    });

    const req = httpMock.expectOne('./assets/json/130119/pais.json');
    expect(req.request.method).toBe('GET');
    req.flush(dummyPais);
  });
});