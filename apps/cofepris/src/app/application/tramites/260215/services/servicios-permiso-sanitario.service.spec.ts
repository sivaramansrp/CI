import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServiciosPermisoSanitarioService } from './servicios-permiso-sanitario.service';
import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { PermisoModel as ImportedPermisoModel } from '../models/permiso-sanitario.model';

export interface LocalPermisoModel {
  id: number;
  nombre: string;
}

describe('ServiciosPermisoSanitarioService', () => {
  let service: ServiciosPermisoSanitarioService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Provide HttpClientTestingModule to mock HttpClient
      providers: [ServiciosPermisoSanitarioService],
    });
    service = TestBed.inject(ServiciosPermisoSanitarioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch banco data', () => {
    const mockBancoData: Catalogo[] = [{ id: 1, descripcion: 'Banco 1' }];

    service.getBancoData().subscribe((data) => {
      expect(data).toEqual(mockBancoData);
    });

    const req = httpMock.expectOne('./assets/json/260215/banco-options.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockBancoData);
  });

  it('should fetch datos', () => {
    const mockDatos = { key: 'value' };

    service.getDatos().subscribe((data) => {
      expect(data).toEqual(mockDatos);
    });

    const req = httpMock.expectOne('assets/json/260215/derechos.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockDatos);
  });

  it('should handle error in getDatos', () => {
    const mockError = { status: 404, statusText: 'Not Found' };

    service.getDatos().subscribe(
      () => fail('Expected an error, not data'),
      (error) => {
        expect(error).toEqual(mockError);
      }
    );

    const req = httpMock.expectOne('assets/json/260215/derechos.json');
    expect(req.request.method).toBe('GET');
    req.flush(null, mockError);
  });

  it('should fetch proveedor data', () => {
    const mockProveedorData = { key: 'value' };

    service.getProveedordata().subscribe((data) => {
      expect(data).toEqual(mockProveedorData);
    });

    const req = httpMock.expectOne('assets/json/260215/proveedor.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockProveedorData);
  });

  it('should handle error in getProveedordata', () => {
    const mockError = { status: 500, statusText: 'Internal Server Error' };

    service.getProveedordata().subscribe(
      () => fail('Expected an error, not data'),
      (error) => {
        expect(error).toEqual(mockError);
      }
    );

    const req = httpMock.expectOne('assets/json/260215/proveedor.json');
    expect(req.request.method).toBe('GET');
    req.flush(null, mockError);
  });

  it('should fetch localidad data', () => {
    const mockLocalidadData = { key: 'value' };

    service.getLocalidaddata().subscribe((data) => {
      expect(data).toEqual(mockLocalidadData);
    });

    const req = httpMock.expectOne('assets/json/260215/estadolocalidad.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockLocalidadData);
  });

  it('should handle error in getLocalidaddata', () => {
    const mockError = { status: 400, statusText: 'Bad Request' };

    service.getLocalidaddata().subscribe(
      () => fail('Expected an error, not data'),
      (error) => {
        expect(error).toEqual(mockError);
      }
    );

    const req = httpMock.expectOne('assets/json/260215/estadolocalidad.json');
    expect(req.request.method).toBe('GET');
    req.flush(null, mockError);
  });

  it('should fetch table data', () => {
    const mockTableData: LocalPermisoModel[] = [{ id: 1, nombre: 'Permiso 1' }];

    service.getTable().subscribe((data) => {
      expect(data).toEqual(mockTableData);
    });

    const req = httpMock.expectOne('assets/json/260215/terceros.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockTableData);
  });

  it('should handle error in getTable', () => {
    const mockError = { status: 403, statusText: 'Forbidden' };

    service.getTable().subscribe(
      () => fail('Expected an error, not data'),
      (error) => {
        expect(error).toEqual(mockError);
      }
    );

    const req = httpMock.expectOne('assets/json/260215/terceros.json');
    expect(req.request.method).toBe('GET');
    req.flush(null, mockError);
  });
});
