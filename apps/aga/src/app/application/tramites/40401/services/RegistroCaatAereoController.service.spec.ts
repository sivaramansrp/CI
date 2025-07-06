import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegistroCaatAereoService } from './RegistroCaatAereoController.service';
import { CaatAereoData, CatalogoLista, Catalogo } from '../models/certi-registro.model';

describe('RegistroCaatAereoService', () => {
  let service: RegistroCaatAereoService;
  let httpMock: HttpTestingController;

  // Mock data for testing
  const mockCatalogoLista: CatalogoLista = {
    datos: [
      { id: 1, descripcion: 'Tipo CAAT 1' },
      { id: 2, descripcion: 'Tipo CAAT 2' },
      { id: 3, descripcion: 'Tipo CAAT 3' }
    ]
  };

  const mockCodigoAereoCatalogo: CatalogoLista = {
    datos: [
      { id: 101, descripcion: 'Código Aéreo A' },
      { id: 102, descripcion: 'Código Aéreo B' },
      { id: 103, descripcion: 'Código Aéreo C' }
    ]
  };

  const mockCaatAereoData: CaatAereoData = {
    TipoDeCaatAereo: 'Aéreo Comercial',
    DodigoDeTransportacion: 'AER001',
    EmpresaDeTransportacion: 'Transportes Aéreos SA'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegistroCaatAereoService]
    });

    service = TestBed.inject(RegistroCaatAereoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that no unmatched requests are outstanding
    httpMock.verify();
  });

  /**
   * Test service creation
   */
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**
   * Test constructor
   */
  it('should have http client injected', () => {
    expect(service['http']).toBeDefined();
  });

  /**
   * Tests for obtenerCAATAereo method
   */
  describe('#obtenerCAATAereo', () => {
    it('should fetch CAAT Aereo catalog data successfully', () => {
      // Arrange
      const expectedUrl = 'assets/json/40401/tipo_caat_aereo.json';

      // Act
      service.obtenerCAATAereo().subscribe((data: CatalogoLista) => {
        // Assert
        expect(data).toEqual(mockCatalogoLista);
        expect(data.datos).toHaveLength(3);
        expect(data.datos[0].id).toBe(1);
        expect(data.datos[0].descripcion).toBe('Tipo CAAT 1');
      });

      // Assert HTTP request
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockCatalogoLista);
    });

    it('should handle HTTP error when fetching CAAT Aereo catalog', () => {
      // Arrange
      const expectedUrl = 'assets/json/40401/tipo_caat_aereo.json';
      const errorMessage = 'Error loading CAAT Aereo catalog';

      // Act
      service.obtenerCAATAereo().subscribe({
        next: () => fail('Expected an error, but got success'),
        error: (error) => {
          // Assert
          expect(error.status).toBe(404);
          expect(error.statusText).toBe('Not Found');
        }
      });

      // Assert HTTP request and simulate error
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
    });

    // it('should return Observable<CatalogoLista>', () => {
    //   // Act
    //   const result = service.obtenerCAATAereo();

    //   // Assert
    //   expect(result).toBeDefined();
    //   expect(typeof result.subscribe).toBe('function');

    //   // Complete the request to avoid hanging
    //   const req = httpMock.expectOne('assets/json/40401/tipo_caat_aereo.json');
    //   req.flush(mockCatalogoLista);
    // });
  });

  /**
   * Tests for obtenerCodigoAereo method
   */
  describe('#obtenerCodigoAereo', () => {
    it('should fetch Codigo Aereo catalog data successfully', () => {
      // Arrange
      const expectedUrl = 'assets/json/40401/codigo_transportacion_aereo.json';

      // Act
      service.obtenerCodigoAereo().subscribe((data: CatalogoLista) => {
        // Assert
        expect(data).toEqual(mockCodigoAereoCatalogo);
        expect(data.datos).toHaveLength(3);
        expect(data.datos[0].id).toBe(101);
        expect(data.datos[0].descripcion).toBe('Código Aéreo A');
      });

      // Assert HTTP request
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockCodigoAereoCatalogo);
    });

    it('should handle HTTP error when fetching Codigo Aereo catalog', () => {
      // Arrange
      const expectedUrl = 'assets/json/40401/codigo_transportacion_aereo.json';
      const errorMessage = 'Error loading Codigo Aereo catalog';

      // Act
      service.obtenerCodigoAereo().subscribe({
        next: () => fail('Expected an error, but got success'),
        error: (error) => {
          // Assert
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Internal Server Error');
        }
      });

      // Assert HTTP request and simulate error
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
    });

    // it('should return Observable<CatalogoLista>', () => {
    //   // Act
    //   const result = service.obtenerCodigoAereo();

    //   // Assert
    //   expect(result).toBeDefined();
    //   expect(typeof result.subscribe).toBe('function');

    //   // Complete the request to avoid hanging
    //   const req = httpMock.expectOne('assets/json/40401/codigo_transportacion_aereo.json');
    //   req.flush(mockCodigoAereoCatalogo);
    // });

    it('should handle empty catalog data', () => {
      // Arrange
      const expectedUrl = 'assets/json/40401/codigo_transportacion_aereo.json';
      const emptyData: CatalogoLista = { datos: [] };

      // Act
      service.obtenerCodigoAereo().subscribe((data: CatalogoLista) => {
        // Assert
        expect(data).toEqual(emptyData);
        expect(data.datos).toHaveLength(0);
      });

      // Assert HTTP request
      const req = httpMock.expectOne(expectedUrl);
      req.flush(emptyData);
    });
  });

  /**
   * Tests for obtenerCAATAereoData method
   */
  describe('#obtenerCAATAereoData', () => {
    it('should fetch CAAT Aereo data successfully', () => {
      // Arrange
      const expectedUrl = 'assets/json/40401/caat.aereo.data.json';

      // Act
      service.obtenerCAATAereoData().subscribe((data: CaatAereoData) => {
        // Assert
        expect(data).toEqual(mockCaatAereoData);
        expect(data.TipoDeCaatAereo).toBe('Aéreo Comercial');
        expect(data.DodigoDeTransportacion).toBe('AER001');
        expect(data.EmpresaDeTransportacion).toBe('Transportes Aéreos SA');
      });

      // Assert HTTP request
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockCaatAereoData);
    });

    it('should handle HTTP error when fetching CAAT Aereo data', () => {
      // Arrange
      const expectedUrl = 'assets/json/40401/caat.aereo.data.json';
      const errorMessage = 'Error loading CAAT Aereo data';

      // Act
      service.obtenerCAATAereoData().subscribe({
        next: () => fail('Expected an error, but got success'),
        error: (error) => {
          // Assert
          expect(error.status).toBe(403);
          expect(error.statusText).toBe('Forbidden');
        }
      });

      // Assert HTTP request and simulate error
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      req.flush(errorMessage, { status: 403, statusText: 'Forbidden' });
    });

    // it('should return Observable<CaatAereoData>', () => {
    //   // Act
    //   const result = service.obtenerCAATAereoData();

    //   // Assert
    //   expect(result).toBeDefined();
    //   expect(typeof result.subscribe).toBe('function');

    //   // Complete the request to avoid hanging
    //   const req = httpMock.expectOne('assets/json/40401/caat.aereo.data.json');
    //   req.flush(mockCaatAereoData);
    // });

    it('should handle incomplete data structure', () => {
      // Arrange
      const expectedUrl = 'assets/json/40401/caat.aereo.data.json';
      const incompleteData = {
        TipoDeCaatAereo: 'Aéreo',
        DodigoDeTransportacion: '',
        EmpresaDeTransportacion: 'Test Company'
      };

      // Act
      service.obtenerCAATAereoData().subscribe((data: CaatAereoData) => {
        // Assert
        expect(data.TipoDeCaatAereo).toBe('Aéreo');
        expect(data.DodigoDeTransportacion).toBe('');
        expect(data.EmpresaDeTransportacion).toBe('Test Company');
      });

      // Assert HTTP request
      const req = httpMock.expectOne(expectedUrl);
      req.flush(incompleteData);
    });
  });

  /**
   * Integration tests for multiple method calls
   */
  describe('Integration tests', () => {
    it('should handle multiple concurrent requests', () => {
      // Arrange
      let caatAereoResult: CatalogoLista | undefined;
      let codigoAereoResult: CatalogoLista | undefined;
      let caatDataResult: CaatAereoData | undefined;

      // Act - Make multiple concurrent requests
      service.obtenerCAATAereo().subscribe(data => caatAereoResult = data);
      service.obtenerCodigoAereo().subscribe(data => codigoAereoResult = data);
      service.obtenerCAATAereoData().subscribe(data => caatDataResult = data);

      // Assert HTTP requests
      const caatReq = httpMock.expectOne('assets/json/40401/tipo_caat_aereo.json');
      const codigoReq = httpMock.expectOne('assets/json/40401/codigo_transportacion_aereo.json');
      const dataReq = httpMock.expectOne('assets/json/40401/caat.aereo.data.json');

      expect(caatReq.request.method).toBe('GET');
      expect(codigoReq.request.method).toBe('GET');
      expect(dataReq.request.method).toBe('GET');

      // Flush responses
      caatReq.flush(mockCatalogoLista);
      codigoReq.flush(mockCodigoAereoCatalogo);
      dataReq.flush(mockCaatAereoData);

      // Assert results
      expect(caatAereoResult).toEqual(mockCatalogoLista);
      expect(codigoAereoResult).toEqual(mockCodigoAereoCatalogo);
      expect(caatDataResult).toEqual(mockCaatAereoData);
    });

    it('should handle mixed success and error responses', () => {
      // Arrange
      let successCount = 0;
      let errorCount = 0;

      // Act
      service.obtenerCAATAereo().subscribe({
        next: () => successCount++,
        error: () => errorCount++
      });

      service.obtenerCodigoAereo().subscribe({
        next: () => successCount++,
        error: () => errorCount++
      });

      service.obtenerCAATAereoData().subscribe({
        next: () => successCount++,
        error: () => errorCount++
      });

      // Assert and simulate responses
      const caatReq = httpMock.expectOne('assets/json/40401/tipo_caat_aereo.json');
      const codigoReq = httpMock.expectOne('assets/json/40401/codigo_transportacion_aereo.json');
      const dataReq = httpMock.expectOne('assets/json/40401/caat.aereo.data.json');

      // Success for first two, error for third
      caatReq.flush(mockCatalogoLista);
      codigoReq.flush(mockCodigoAereoCatalogo);
      dataReq.flush('Error', { status: 404, statusText: 'Not Found' });

      // Assert results
      expect(successCount).toBe(2);
      expect(errorCount).toBe(1);
    });
  });

  /**
   * Edge case tests
   */
  describe('Edge cases', () => {
    it('should handle null responses gracefully', () => {
      // Act
      service.obtenerCAATAereo().subscribe((data: CatalogoLista) => {
        // Assert
        expect(data).toBeNull();
      });

      // Assert HTTP request
      const req = httpMock.expectOne('assets/json/40401/tipo_caat_aereo.json');
      req.flush(null);
    });

    it('should handle malformed JSON gracefully', () => {
      // Act
      service.obtenerCAATAereoData().subscribe({
        next: () => fail('Expected an error due to malformed JSON'),
        error: (error) => {
          // Assert
          expect(error).toBeDefined();
        }
      });

      // Assert HTTP request and simulate malformed response
      const req = httpMock.expectOne('assets/json/40401/caat.aereo.data.json');
      req.error(new ErrorEvent('JSON Parse Error'));
    });

    // it('should handle network timeout errors', () => {
    //   // Act
    //   service.obtenerCodigoAereo().subscribe({
    //     next: () => fail('Expected a timeout error'),
    //     error: (error) => {
    //       // Assert
    //       expect(error).toBeDefined();
    //       expect(error.type).toBe('timeout');
    //     }
    //   });

    //   // Assert HTTP request and simulate timeout
    //   const req = httpMock.expectOne('assets/json/40401/codigo_transportacion_aereo.json');
    //   req.error(new ErrorEvent('timeout', { type: 'timeout' }));
    // });
  });
});
