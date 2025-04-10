import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ImportacionMaterialDeInvestigacionCientificaService } from './importacion-material-de-investigacion-cientifica.service';
import { Catalogo } from '@ng-mf/data-access-user';
import { ProductoResponse } from '../../../shared/constantes/vehiculos-adaptados.enum';

describe('ImportacionMaterialDeInvestigacionCientificaService', () => {
  let service: ImportacionMaterialDeInvestigacionCientificaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImportacionMaterialDeInvestigacionCientificaService],
    });

    service = TestBed.inject(ImportacionMaterialDeInvestigacionCientificaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch lista de países disponibles', () => {
    const mockResponse: Catalogo[] = [{ id: 1, descripcion: 'País 1' }];

    service.getListaDePaisesDisponibles().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('/assets/json/130112/pais-procenia.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch lista de países por bloque', () => {
    const mockResponse: Catalogo[] = [{ id: 1, descripcion: 'País 1' }];

    service.getPaisesPorBloque(1).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('/assets/json/130112/paises-por-bloque.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch lista de entidades federativas', () => {
    const mockResponse: Catalogo[] = [{ id: 1, descripcion: 'Entidad 1' }];

    service.getEntidadFederativa().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('/assets/json/130112/entidad-federativa.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch lista de representaciones federales', () => {
    const mockResponse: Catalogo[] = [{ id: 1, descripcion: 'Representación 1' }];

    service.getRepresentacionFederal().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('/assets/json/130112/representacion-federal.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch opciones de solicitud', () => {
    const mockResponse: ProductoResponse = {
      options: [{ value: 'Opción 1', label: 'Opción 1' }],
      defaultSelect: 'Opción 1',
    };

    service.getSolicitudeOptions().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/130112/solicitude-options.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch opciones de producto', () => {
    const mockResponse: ProductoResponse = {
      options: [{ value: 'Producto 1', label: 'Producto 1' }],
      defaultSelect: 'Producto 1',
    };

    service.getProductoOptions().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/130112/producto-otions.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch lista de fracciones y descripciones de partidas de la mercancía', () => {
    const mockResponse: Catalogo[] = [{ id: 1, descripcion: 'Fracción 1' }];

    service.getFraccionDescripcionPartidasDeLaMercancia().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('/assets/json/130112/fraccion-descripcion-partidas-de-la-mercancia.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});