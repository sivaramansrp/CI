import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AutorizacionImportacionTemporalService } from './autorizacion-importacion-temporal.service';
import { Catalogo } from '@libs/shared/data-access-user/src';

describe('AutorizacionImportacionTemporalService', () => {
  let service: AutorizacionImportacionTemporalService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AutorizacionImportacionTemporalService],
    });

    service = TestBed.inject(AutorizacionImportacionTemporalService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch propietario data', () => {
    const mockData: Catalogo[] = [{ id: 4, descripcion: 'Propietario 1' }];

    service.getPropietario().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('/assets/json/630307/propietario.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch tipo de propietario data', () => {
    const mockData: Catalogo[] = [{ id: 5, descripcion: 'Tipo Propietario 1' }];

    service.getTipoDePropietario().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('/assets/json/630307/tipo-de-propietario.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch pais data', () => {
    const mockData: Catalogo[] = [{ id: 6, descripcion: 'País 1' }];

    service.getPais().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('/assets/json/630307/pais.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

});