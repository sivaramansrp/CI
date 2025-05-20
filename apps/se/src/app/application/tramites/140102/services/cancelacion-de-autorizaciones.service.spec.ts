import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CancelacionDeAutorizacionesService } from './cancelacion-de-autorizaciones.service';
import { CancelacionTabla } from '../models/Cancelacion-de-autorizaciones';

describe('CancelacionDeAutorizacionesService', () => {
  let service: CancelacionDeAutorizacionesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CancelacionDeAutorizacionesService],
    });

    service = TestBed.inject(CancelacionDeAutorizacionesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCancelacionTabla', () => {
    it('should fetch data from the JSON file', () => {
      const mockData: CancelacionTabla[] = [
        {
          folioDePrograma: '12345',
          seleccionaLaModalidad: 'Modalidad 1',
          representacionFederal: 'Representación 1',
          tipoPrograma: 'Tipo 1',
          estatus: 'Activo',
        },
      ];

      service.getCancelacionTabla().subscribe((data) => {
        expect(data).toEqual(mockData);
      });

      const req = httpMock.expectOne('assets/json/140102/CancelacionTabla.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockData);
    });

    it('should handle an empty response', () => {
      service.getCancelacionTabla().subscribe((data) => {
        expect(data).toEqual([]);
      });

      const req = httpMock.expectOne('assets/json/140102/CancelacionTabla.json');
      expect(req.request.method).toBe('GET');
      req.flush([]);
    });

    it('should handle an HTTP error', () => {
      const errorMessage = 'Failed to load data';

      service.getCancelacionTabla().subscribe(
        () => fail('Expected an error, not data'),
        (error) => {
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Internal Server Error');
        }
      );

      const req = httpMock.expectOne('assets/json/140102/CancelacionTabla.json');
      expect(req.request.method).toBe('GET');
      req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
    });
  });
});
