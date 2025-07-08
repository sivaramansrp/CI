import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegistroService } from './registro.service';
import { Catalogo } from '../state/Tramite30506.store';
import { ENVIRONMENT } from '@libs/shared/data-access-user/src';

describe('RegistroService', () => {
  let service: RegistroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegistroService]
    });
    
    service = TestBed.inject(RegistroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize urlServer with ENVIRONMENT.URL_SERVER', () => {
    expect(service.urlServer).toBe(ENVIRONMENT.URL_SERVER);
  });

  it('should initialize urlServerCatalogos with ENVIRONMENT.URL_SERVER_JSON_AUXILIAR', () => {
    expect(service.urlServerCatalogos).toBe(ENVIRONMENT.URL_SERVER_JSON_AUXILIAR);
  });

  it('should obtain bank data from obtenerDatosBanco', () => {
    const mockBancoData: Catalogo[] = [
      { id: 1, descripcion: 'Banco 1' },
      { id: 2, descripcion: 'Banco 2' },
      { id: 3, descripcion: 'Banco 3' }
    ];

    service.obtenerDatosBanco().subscribe((data: Catalogo[]) => {
      expect(data).toEqual(mockBancoData);
      expect(data.length).toBe(3);
      expect(data[0].descripcion).toBe('Banco 1');
    });

    const req = httpMock.expectOne('assets/json/30506/banco.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockBancoData);
  });

  it('should handle empty array response in obtenerDatosBanco', () => {
    const mockEmptyData: Catalogo[] = [];

    service.obtenerDatosBanco().subscribe((data: Catalogo[]) => {
      expect(data).toEqual(mockEmptyData);
      expect(data.length).toBe(0);
    });

    const req = httpMock.expectOne('assets/json/30506/banco.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockEmptyData);
  });

  it('should handle HTTP error in obtenerDatosBanco', () => {
    const errorMessage = 'File not found';

    service.obtenerDatosBanco().subscribe({
      next: () => fail('Expected an error, but got a success response'),
      error: (error) => {
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not Found');
      }
    });

    const req = httpMock.expectOne('assets/json/30506/banco.json');
    expect(req.request.method).toBe('GET');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

  it('should make HTTP GET request to correct URL in obtenerDatosBanco', () => {
    service.obtenerDatosBanco().subscribe();

    const req = httpMock.expectOne('assets/json/30506/banco.json');
    expect(req.request.method).toBe('GET');
    expect(req.request.url).toBe('assets/json/30506/banco.json');
    req.flush([]);
  });
});