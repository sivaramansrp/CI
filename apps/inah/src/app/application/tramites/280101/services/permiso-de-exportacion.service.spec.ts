import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PermisoDeExportacionService } from './permiso-de-exportacion.service';
import { Catalogo } from '@libs/shared/data-access-user/src';

describe('PermisoDeExportacionService', () => {
  let service: PermisoDeExportacionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PermisoDeExportacionService],
    });

    service = TestBed.inject(PermisoDeExportacionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes HTTP pendientes.
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch aduana data from the JSON file', () => {
    const mockCatalogo: Catalogo = { id: 1, descripcion: 'Aduana 1' };

    service.getAduana().subscribe((data) => {
      expect(data).toEqual(mockCatalogo);
    });

    const req = httpMock.expectOne('assets/json/120204/entidad-federativa.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockCatalogo); // Simula la respuesta del servidor.
  });
});
