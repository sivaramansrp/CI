import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AvisoService } from './aviso.service';
import { CatalogoLista, AvisoTablaDatos } from '../models/avios-model';
import { RespuestaCatalogos } from '@ng-mf/data-access-user';

describe('AvisoService', () => {
  let service: AvisoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AvisoService],
    });
    service = TestBed.inject(AvisoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch aviso table data', () => {
    const mockData: AvisoTablaDatos = {
        datos: []
    };

    service.obtenerAvisoTabla().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('assets/json/32505/aviso-tabla.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch aduana data', () => {
    const mockData: CatalogoLista = { datos: [{ id: 1, descripcion: 'Aduana 1' }] };

    service.obtenerAduana().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('assets/json/32505/aduana.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch combustible data', () => {
    const mockData: CatalogoLista = { datos: [{ id: 1, descripcion: 'Gasolina' }] };

    service.obtenerCombustible().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('assets/json/32505/combustible.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch cilindros data', () => {
    const mockData: CatalogoLista = { datos: [{ id: 1, descripcion: '4 Cilindros' }] };

    service.obtenerCilindros().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('assets/json/32505/cilindros.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch pais issued data', () => {
    const mockData: CatalogoLista = { datos: [{ id: 1, descripcion: 'USA' }] };

    service.obtenerPaisIssued().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('assets/json/32505/pais-issued.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch pais data', () => {
    const mockData: CatalogoLista = { datos: [{ id: 1, descripcion: 'México' }] };

    service.obtenerPais().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('assets/json/32505/pais.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch years data', () => {
    const mockData: CatalogoLista = { datos: [{ id: 1, descripcion: '2023' }] };

    service.obtenerAnio().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('assets/json/32505/years.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch fraccion arancelaria catalog data', () => {
    const mockData: RespuestaCatalogos = {  code: 1, message: 'Fracción 1',data: [{ id: 1, descripcion: 'Fracción 1' }] };

    service.getFraccionArancelariaCatalogo('catalogo').subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('assets/json/32502/fraccion-arancelaria-catalogo.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch fraccion regla catalog data', () => {
    const mockData: RespuestaCatalogos = {  code: 1, message: 'Fracción 1',data: [{ id: 1, descripcion: 'Fracción 1' }] };

    service.getFraccionReglaCatalogo('catalogo').subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('assets/json/32502/fraccion-regla-catalogo.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch tipo documento data', () => {
    const mockData: RespuestaCatalogos = {  code: 1, message: 'Fracción 1',data: [{ id: 1, descripcion: 'Fracción 1' }] };

    service.getTipoDocumento('catalogo').subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('assets/json/32502/tipoDocumento.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});