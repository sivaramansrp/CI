import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegistroSolicitudService } from './registro-solicitud-service.service';
import { Catalogo } from '@libs/shared/data-access-user/src';

describe('RegistroSolicitudService', () => {
  let service: RegistroSolicitudService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegistroSolicitudService],
    });
    service = TestBed.inject(RegistroSolicitudService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBancoData', () => {
    it('should fetch banco data successfully', () => {
      const mockResponse: Catalogo[] = [
        { id: 1, descripcion: 'Banco 1' },
        { id: 2, descripcion: 'Banco 2' },
      ];

      service.obtenerDatosBanco().subscribe((data) => {
        expect(data).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('assets/json/31803/banco.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should handle errors when fetching banco data', () => {
      const errorMessage = 'Error fetching banco data';

      service.obtenerDatosBanco().subscribe(
        () => fail('Expected an error, not banco data'),
        (error) => {
          expect(error).toBeTruthy();
          expect(error.message).toContain(errorMessage);
        }
      );

      const req = httpMock.expectOne('assets/json/31803/banco.json');
      expect(req.request.method).toBe('GET');
      req.flush(errorMessage, { status: 500, statusText: 'Error Interno del Servidor' });
    });
  });
});