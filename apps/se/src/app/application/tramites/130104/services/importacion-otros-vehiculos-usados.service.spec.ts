import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ImportacionOtrosVehiculosUsadosService } from './importacion-otros-vehiculos-usados.service';
import { Catalogo } from '@ng-mf/data-access-user';

describe('ImportacionOtrosVehiculosUsadosService', () => {
  let service: ImportacionOtrosVehiculosUsadosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImportacionOtrosVehiculosUsadosService],
    });

    service = TestBed.inject(ImportacionOtrosVehiculosUsadosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch lista de países disponibles', () => {
    const mockResponse: Catalogo[] = [
      { id: 1, descripcion: 'País 1' },
      { id: 2, descripcion: 'País 2' },
    ];

    service.getListaDePaisesDisponibles().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('/assets/json/130104/pais-procenia.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch países por bloque', () => {
    const mockResponse: Catalogo[] = [
      { id: 1, descripcion: 'País Bloque 1' },
      { id: 2, descripcion: 'País Bloque 2' },
    ];

    service.getPaisesPorBloque(1).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('/assets/json/130104/paises-por-bloque.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch entidades federativas', () => {
    const mockResponse: Catalogo[] = [
      { id: 1, descripcion: 'Entidad 1' },
      { id: 2, descripcion: 'Entidad 2' },
    ];

    service.getEntidadFederativa().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('/assets/json/130104/entidad-federativa.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch representaciones federales', () => {
    const mockResponse: Catalogo[] = [
      { id: 1, descripcion: 'Representación 1' },
      { id: 2, descripcion: 'Representación 2' },
    ];

    service.getRepresentacionFederal().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('/assets/json/130104/representacion-federal.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch solicitud options', () => {
    const mockResponse = {
      productos: [{ id: 1, descripcion: 'Opción 1' }] as Catalogo[],
    };

    service.getSolicitudeOptions().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/130104/solicitude-options.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch producto options', () => {
    const mockResponse = {
      productos: [{ id: 1, descripcion: 'Producto 1' }],
    };

    service.getProductoOptions().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/130104/producto-otions.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});