import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MercanciasService } from './mercancias.service';
import { HttpCoreService } from '@libs/shared/data-access-user/src';

describe('MercanciasService', () => {
  let service: MercanciasService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MercanciasService, HttpCoreService]
    });

    service = TestBed.inject(MercanciasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch mercancias from JSON file', () => {
    const mockMercancias = [
      { id: '1', nombre: 'Mercancia 1' },
      { id: '2', nombre: 'Mercancia 2' }
    ];

    service.getMercancias().subscribe((mercancias) => {
      expect(mercancias).toEqual(mockMercancias);
    });

    const req = httpMock.expectOne('assets/json/110209/mercancias.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockMercancias);
  });

  it('should fetch tipos de factura from JSON file', () => {
    const mockTiposDeFactura = [
      { id: '1', nombre: 'Factura 1' },
      { id: '2', nombre: 'Factura 2' }
    ];

    service.getTipoDeFactura().subscribe((tiposDeFactura) => {
      expect(tiposDeFactura).toEqual(mockTiposDeFactura);
    });

    const req = httpMock.expectOne('assets/json/110209/tipo-de-factura.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockTiposDeFactura);
  });

  it('should fetch unidades from JSON file', () => {
    const mockUnidades = [
      { id: '1', nombre: 'Unidad 1' },
      { id: '2', nombre: 'Unidad 2' }
    ];

    service.getUnidad().subscribe((unidades) => {
      expect(unidades).toEqual(mockUnidades);
    });

    const req = httpMock.expectOne('assets/json/110209/unidad.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockUnidades);
  });
});