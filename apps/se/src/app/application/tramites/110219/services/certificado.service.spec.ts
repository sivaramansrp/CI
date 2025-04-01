import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CertificadoService } from './certificado.service';
import { ColumnasTabla, MercanciaCertificado } from '../models/certificado.model';
import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';

describe('CertificadoService', () => {
  let service: CertificadoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CertificadoService],
    });
    service = TestBed.inject(CertificadoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTratadoData', () => {
    it('should fetch tratado data successfully', () => {
      const mockData: Catalogo[] = [
        { id: 1, descripcion: 'Tratado 1' },
        { id: 2, descripcion: 'Tratado 2' },
      ];

      service.getTratadoData().subscribe((data) => {
        expect(data).toEqual(mockData);
      });

      const req = httpMock.expectOne('assets/json/110219/tratado.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockData);
    });
  });

  describe('getSolicitudesTabla', () => {
    it('should fetch solicitudes tabla data successfully', () => {
      const mockData: ColumnasTabla[] = [
        { numeroCertificado: '123', pais: 'México', tratado: 'TLCAN', fechaExpedicion: '2023-01-01', fechaVencimiento: '2023-12-31' },
      ];

      service.getSolicitudesTabla().subscribe((data) => {
        expect(data).toEqual(mockData);
      });

      const req = httpMock.expectOne('assets/json/110219/mercanciaTable.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockData);
    });

    it('should handle error when fetching solicitudes tabla data', () => {
      const mockError = new ErrorEvent('Network error');

      service.getSolicitudesTabla().subscribe({
        next: () => fail('Expected an error, not data'),
        error: (error) => {
          expect(error).toBeTruthy();
        },
      });

      const req = httpMock.expectOne('assets/json/110219/mercanciaTable.json');
      req.error(mockError);
    });
  });

  describe('getMercanciaCertificadoTabla', () => {
    it('should fetch mercancia certificado tabla data successfully', () => {
      const mockData: MercanciaCertificado[] = [
        { numeroOrden: '1', fraccionArancelaria: '1234.56.78', nombreTecnico: 'Producto A', nombreComercial: 'Producto Comercial A', nombreIngles: 'Product A', complementoDescripcion: 'Descripción A', numeroCertificado: '123', pais: 'México', tratado: 'TLCAN', fechaExpedicion: '2023-01-01', fechaVencimiento: '2023-12-31' },
      ];

      service.getMercanciaCertificadoTabla().subscribe((data) => {
        expect(data).toEqual(mockData);
      });

      const req = httpMock.expectOne('assets/json/110219/mercanciaCertificado.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockData);
    });

    it('should handle error when fetching mercancia certificado tabla data', () => {
      const mockError = new ErrorEvent('Network error');

      service.getMercanciaCertificadoTabla().subscribe({
        next: () => fail('Expected an error, not data'),
        error: (error) => {
          expect(error).toBeTruthy();
        },
      });

      const req = httpMock.expectOne('assets/json/110219/mercanciaCertificado.json');
      req.error(mockError);
    });
  });
});