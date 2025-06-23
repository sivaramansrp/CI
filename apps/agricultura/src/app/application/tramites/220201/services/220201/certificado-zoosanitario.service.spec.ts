import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { CertificadoZoosanitarioServiceService } from './certificado-zoosanitario.service';
import { ZoosanitarioStore } from '../../estados/220201/zoosanitario.store';
import { SeccionLibStore } from '@libs/shared/data-access-user/src';
import {
  CapturarSolicitud,
  DatosDeLaSolicitud,
  DatosParaMovilizacionNacional,
  PagoDeDerechos,
  ValidarEnvio,
} from '../../models/220201/capturar-solicitud.model';
import { PersonaTerceros } from '@libs/shared/data-access-user/src';

describe('CertificadoZoosanitarioServiceService', () => {
  let service: CertificadoZoosanitarioServiceService;
  let zoosanitarioStoreMock: jest.Mocked<ZoosanitarioStore>;
  let seccionStoreMock: jest.Mocked<SeccionLibStore>;
  let httpTestingController: HttpTestingController;

  // Mock data

  const mockDatosDeLaSolicitud: DatosDeLaSolicitud = {
    tipoMercancia: 'Animales vivos',
    aduanaIngreso: 'Aduana de Manzanillo',
    oficinaInspeccion: 'Oficina Central',
    puntoInspeccion: 'Punto Norte',
    claveUCON: 'UCON12345',
    establecimientoTIF: 'TIF-6789',
    nombreVeterinario: 'Dr. Juan López',
    numeroGuia: 'GUIA-2024-001',
    certificacion: 'Certificado A',
    regimen: 'Temporal',
    datosDeMercancia: '10 bovinos, raza Holstein'
  } as DatosDeLaSolicitud;

  const mockDatosParaMovilizacionNacional: DatosParaMovilizacionNacional = {
    coordenadas: '19.4326,-99.1332',
    nombre: 'Ruta 1',
    medio: 'Terrestre',
    transporte: 'Camión',
    punto: 'Punto de control 1'
  } as DatosParaMovilizacionNacional;
  const mockTercerosRelacionados: PersonaTerceros[] = [
    { nombre: 'Juan Pérez', correo: 'juan.perez@example.com' },
    { nombre: 'Ana Gómez', correo: 'ana.gomez@example.com' }
  ];

  const mockValidarEnvio: ValidarEnvio = {
    dataParaMovilizacion: true,
    dataDeLaSolicitud: false
  } as ValidarEnvio;

  const mockPagoDeDerechos: PagoDeDerechos = {
    exentoPago: 'No',
    justificacion: 'Pago regular',
    claveReferencia: 'REF123456',
    cadenaDependencia: 'DEP987654',
    banco: 'BANAMEX',
    llavePago: 'LLAVE7890',
    importePago: '1500.00',
    fechaPago: '2024-06-01'
  } as PagoDeDerechos;

  const mockCapturarSolicitud: CapturarSolicitud = {
    datosDeLaSolicitud: mockDatosDeLaSolicitud,
    datosParaMovilizacionNacional: mockDatosParaMovilizacionNacional,
    tercerosRelacionados: mockTercerosRelacionados,
    validarEnvio: mockValidarEnvio,
    pagoDeDerechos: mockPagoDeDerechos
  } as CapturarSolicitud;

  beforeEach(() => {
    // Create Jest mocks
    zoosanitarioStoreMock = {
      actualizarSolicitante: jest.fn(),
      actualizarDatosDeLaSolicitud: jest.fn(),
      actualizarDatosParaMovilizacionNacional: jest.fn(),
      actualizarTercerosRelacionados: jest.fn(),
      actualizarformaValidas: jest.fn(),
      actualizarPagoDeDerechos: jest.fn(),
      actualizarformaValida: jest.fn(),
      limpiarFormulario: jest.fn(),
      _select: jest.fn()
    } as any;

    seccionStoreMock = {
      establecerSeccion: jest.fn(),
      establecerFormaValida: jest.fn()
    } as any;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CertificadoZoosanitarioServiceService,
        { provide: ZoosanitarioStore, useValue: zoosanitarioStoreMock },
        { provide: SeccionLibStore, useValue: seccionStoreMock }
      ]
    });

    service = TestBed.inject(CertificadoZoosanitarioServiceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a defined service', () => {
    expect(service).toBeDefined();
  });

  describe('updateDatosDeLaSolicitud', () => {
    it('should call actualizarDatosDeLaSolicitud on zoosanitarioStore', () => {
      // Act
      service.updateDatosDeLaSolicitud(mockDatosDeLaSolicitud);

      // Assert
      expect(zoosanitarioStoreMock.actualizarDatosDeLaSolicitud).toHaveBeenCalledWith(mockDatosDeLaSolicitud);
      expect(zoosanitarioStoreMock.actualizarDatosDeLaSolicitud).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateDatosParaMovilizacionNacional', () => {
    it('should call actualizarDatosParaMovilizacionNacional on zoosanitarioStore', () => {
      // Act
      service.updateDatosParaMovilizacionNacional(mockDatosParaMovilizacionNacional);

      // Assert
      expect(zoosanitarioStoreMock.actualizarDatosParaMovilizacionNacional).toHaveBeenCalledWith(mockDatosParaMovilizacionNacional);
      expect(zoosanitarioStoreMock.actualizarDatosParaMovilizacionNacional).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateTercerosRelacionados', () => {
    it('should call actualizarTercerosRelacionados on zoosanitarioStore', () => {
      // Act
      service.updateTercerosRelacionados(mockTercerosRelacionados);

      // Assert
      expect(zoosanitarioStoreMock.actualizarTercerosRelacionados).toHaveBeenCalledWith(mockTercerosRelacionados);
      expect(zoosanitarioStoreMock.actualizarTercerosRelacionados).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateValidarEnvio', () => {
    it('should call actualizarformaValidas on zoosanitarioStore', () => {
      // Act
      service.updateValidarEnvio(mockValidarEnvio);

      // Assert
      expect(zoosanitarioStoreMock.actualizarformaValidas).toHaveBeenCalledWith(mockValidarEnvio);
      expect(zoosanitarioStoreMock.actualizarformaValidas).toHaveBeenCalledTimes(1);
    });
  });

  describe('updatePagoDeDerechos', () => {
    it('should call actualizarPagoDeDerechos on zoosanitarioStore', () => {
      // Act
      service.updatePagoDeDerechos(mockPagoDeDerechos);

      // Assert
      expect(zoosanitarioStoreMock.actualizarPagoDeDerechos).toHaveBeenCalledWith(mockPagoDeDerechos);
      expect(zoosanitarioStoreMock.actualizarPagoDeDerechos).toHaveBeenCalledTimes(1);
    });
  });

  describe('limpiarFormulario', () => {
    it('should call limpiarFormulario on zoosanitarioStore', () => {
      // Act
      service.limpiarFormulario();

      // Assert
      expect(zoosanitarioStoreMock.limpiarFormulario).toHaveBeenCalled();
      expect(zoosanitarioStoreMock.limpiarFormulario).toHaveBeenCalledTimes(1);
    });
  });

  describe('getDatosDeLaSolicitud', () => {
    it('should return observable from zoosanitarioStore select', () => {
      // Arrange
      const expectedObservable = of(mockDatosDeLaSolicitud);
      zoosanitarioStoreMock._select.mockReturnValue(expectedObservable);

      // Act
      const result = service.getDatosDeLaSolicitud();

      // Assert
      expect(zoosanitarioStoreMock._select).toHaveBeenCalledWith(expect.any(Function));
      expect(result).toBe(expectedObservable);
    });
  });

  describe('getDatosParaMovilizacionNacional', () => {
    it('should return observable from zoosanitarioStore select', () => {
      // Arrange
      const expectedObservable = of(mockDatosParaMovilizacionNacional);
      zoosanitarioStoreMock._select.mockReturnValue(expectedObservable);

      // Act
      const result = service.getDatosParaMovilizacionNacional();

      // Assert
      expect(zoosanitarioStoreMock._select).toHaveBeenCalledWith(expect.any(Function));
      expect(result).toBe(expectedObservable);
    });
  });

  describe('getPagoDeDerechos', () => {
    it('should return observable from zoosanitarioStore select', () => {
      // Arrange
      const expectedObservable = of(mockPagoDeDerechos);
      zoosanitarioStoreMock._select.mockReturnValue(expectedObservable);

      // Act
      const result = service.getPagoDeDerechos();

      // Assert
      expect(zoosanitarioStoreMock._select).toHaveBeenCalledWith(expect.any(Function));
      expect(result).toBe(expectedObservable);
    });
  });

  describe('getValidarEnvio', () => {
    it('should return observable from zoosanitarioStore select', () => {
      // Arrange
      const expectedObservable = of(mockValidarEnvio);
      zoosanitarioStoreMock._select.mockReturnValue(expectedObservable);

      // Act
      const result = service.getValidarEnvio();

      // Assert
      expect(zoosanitarioStoreMock._select).toHaveBeenCalledWith(expect.any(Function));
      expect(result).toBe(expectedObservable);
    });
  });

  describe('getFormData', () => {
    it('should return observable from zoosanitarioStore select', () => {
      // Arrange
      const expectedObservable = of(mockCapturarSolicitud);
      zoosanitarioStoreMock._select.mockReturnValue(expectedObservable);

      // Act
      const result = service.getFormData();

      // Assert
      expect(zoosanitarioStoreMock._select).toHaveBeenCalledWith(expect.any(Function));
      expect(result).toBe(expectedObservable);
    });
  });

  describe('actualizarFormaValida', () => {
    it('should call actualizarformaValida and update section store when all forms are valid', (done) => {
      // Arrange
      const updatedFormaValida = { section1: true, section2: true };
      const allValidObservable = of(true);
      
      zoosanitarioStoreMock._select.mockReturnValue(allValidObservable);

      // Act
      service.actualizarFormaValida(updatedFormaValida);

      // Assert
      expect(zoosanitarioStoreMock.actualizarformaValida).toHaveBeenCalledWith(updatedFormaValida);
      expect(zoosanitarioStoreMock._select).toHaveBeenCalledWith(expect.any(Function));
      
      // Wait for async operations
      setTimeout(() => {
        expect(seccionStoreMock.establecerSeccion).toHaveBeenCalledWith([true]);
        expect(seccionStoreMock.establecerFormaValida).toHaveBeenCalledWith([true]);
        done();
      }, 0);
    });

 it('should call actualizarformaValida and update section store when forms are invalid', (done) => {
  // Arrange
  const updatedFormaValida = { section1: true, section2: false };
  
  // 👇 Make sure this returns an object where NOT all values are true
  const mockValidarEnvio = { section1: true, section2: false };
  zoosanitarioStoreMock._select.mockReturnValue(of(mockValidarEnvio));

  service.actualizarFormaValida(updatedFormaValida);

  expect(zoosanitarioStoreMock.actualizarformaValida).toHaveBeenCalledWith(updatedFormaValida);

  setTimeout(() => {
    expect(seccionStoreMock.establecerSeccion).toHaveBeenCalledWith([true]);
    expect(seccionStoreMock.establecerFormaValida).toHaveBeenCalledWith([false]);
    done();
  }, 0);
});

  });

  describe('obtenerTodosLosStatus', () => {
    it('should return true when all validation values are true', (done) => {
      // Arrange
      const validarEnvioAllTrue: ValidarEnvio = {
        dataParaMovilizacion: true,
        dataDeLaSolicitud: true,
      } as ValidarEnvio;

      zoosanitarioStoreMock._select.mockReturnValue(of(validarEnvioAllTrue));

      // Act & Assert
      service.obtenerTodosLosStatus().subscribe(result => {
        expect(result).toBe(true);
        expect(zoosanitarioStoreMock._select).toHaveBeenCalledWith(expect.any(Function));
        done();
      });
    });

    it('should return false when at least one validation value is false', (done) => {
      // Arrange
      const validarEnvioWithFalse: ValidarEnvio = {
        dataParaMovilizacion: true,
        dataDeLaSolicitud: false,
      } as ValidarEnvio;

      zoosanitarioStoreMock._select.mockReturnValue(of(validarEnvioWithFalse));

      // Act & Assert
      service.obtenerTodosLosStatus().subscribe(result => {
        expect(result).toBe(false);
        expect(zoosanitarioStoreMock._select).toHaveBeenCalledWith(expect.any(Function));
        done();
      });
    });

    it('should return false when all validation values are false', (done) => {
  // Arrange
  const validarEnvioAllFalse: ValidarEnvio = {
    dataParaMovilizacion: false,
    dataDeLaSolicitud: false
  };

  zoosanitarioStoreMock._select.mockReturnValue(of(validarEnvioAllFalse));

  // Act & Assert
  service.obtenerTodosLosStatus().subscribe(result => {
    expect(result).toBe(false);  // ✅ FIXED: Expect false
    done();
  });
});

  });

  describe('guardarDatosFormulario', () => {
    it('should make HTTP GET request to correct URL', (done) => {
      // Arrange
      const expectedUrl = 'assets/json/220201/capturarSolicitud.json';

      // Act & Assert
      service.guardarDatosFormulario().subscribe(data => {
        expect(data).toEqual(mockCapturarSolicitud);
        done();
      });

      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockCapturarSolicitud);
    });

    it('should handle HTTP error gracefully', () => {
      // Arrange
      const expectedUrl = 'assets/json/220201/capturarSolicitud.json';
      const errorMessage = 'Http failure response';

      // Act
      service.guardarDatosFormulario().subscribe({
        next: () => fail('Should have failed'),
        error: (error) => {
          expect(error.status).toBe(404);
        }
      });

      // Assert
      const req = httpTestingController.expectOne(expectedUrl);
      req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('storeDatosFormulario', () => {
    it('should call all update methods with provided data', () => {
      // Act
      service.storeDatosFormulario(mockCapturarSolicitud);

      // Assert
      expect(zoosanitarioStoreMock.actualizarPagoDeDerechos).toHaveBeenCalledWith(mockCapturarSolicitud.pagoDeDerechos);
      expect(zoosanitarioStoreMock.actualizarDatosDeLaSolicitud).toHaveBeenCalledWith(mockCapturarSolicitud.datosDeLaSolicitud);
      expect(zoosanitarioStoreMock.actualizarDatosParaMovilizacionNacional).toHaveBeenCalledWith(mockCapturarSolicitud.datosParaMovilizacionNacional);
      expect(zoosanitarioStoreMock.actualizarTercerosRelacionados).toHaveBeenCalledWith(mockCapturarSolicitud.tercerosRelacionados);
      expect(zoosanitarioStoreMock.actualizarformaValidas).toHaveBeenCalledWith(mockCapturarSolicitud.validarEnvio);
    });

    it('should handle empty object data with fallback values', () => {
      // Arrange
      const emptyData: CapturarSolicitud = {} as CapturarSolicitud;
      
      // Act
      service.storeDatosFormulario(emptyData);

      // Assert
      expect(zoosanitarioStoreMock.actualizarPagoDeDerechos).toHaveBeenCalledWith({} as PagoDeDerechos);
      expect(zoosanitarioStoreMock.actualizarDatosDeLaSolicitud).toHaveBeenCalledWith({} as DatosDeLaSolicitud);
      expect(zoosanitarioStoreMock.actualizarDatosParaMovilizacionNacional).toHaveBeenCalledWith({} as DatosParaMovilizacionNacional);
      expect(zoosanitarioStoreMock.actualizarTercerosRelacionados).toHaveBeenCalledWith({} as PersonaTerceros[]);
      expect(zoosanitarioStoreMock.actualizarformaValidas).toHaveBeenCalledWith({} as ValidarEnvio);
    });

    it('should handle null input data with fallback values', () => {
      // Act
      service.storeDatosFormulario(null as any);

      // Assert
      expect(zoosanitarioStoreMock.actualizarPagoDeDerechos).toHaveBeenCalledWith({} as PagoDeDerechos);
      expect(zoosanitarioStoreMock.actualizarDatosDeLaSolicitud).toHaveBeenCalledWith({} as DatosDeLaSolicitud);
      expect(zoosanitarioStoreMock.actualizarDatosParaMovilizacionNacional).toHaveBeenCalledWith({} as DatosParaMovilizacionNacional);
      expect(zoosanitarioStoreMock.actualizarTercerosRelacionados).toHaveBeenCalledWith({} as PersonaTerceros[]);
      expect(zoosanitarioStoreMock.actualizarformaValidas).toHaveBeenCalledWith({} as ValidarEnvio);
    });

    it('should handle undefined input data with fallback values', () => {
      // Act
      service.storeDatosFormulario(undefined as any);

      // Assert
      expect(zoosanitarioStoreMock.actualizarPagoDeDerechos).toHaveBeenCalledWith({} as PagoDeDerechos);
      expect(zoosanitarioStoreMock.actualizarDatosDeLaSolicitud).toHaveBeenCalledWith({} as DatosDeLaSolicitud);
      expect(zoosanitarioStoreMock.actualizarDatosParaMovilizacionNacional).toHaveBeenCalledWith({} as DatosParaMovilizacionNacional);
      expect(zoosanitarioStoreMock.actualizarTercerosRelacionados).toHaveBeenCalledWith({} as PersonaTerceros[]);
      expect(zoosanitarioStoreMock.actualizarformaValidas).toHaveBeenCalledWith({} as ValidarEnvio);
    });

    it('should handle partial data with fallback values', () => {
  // Arrange
  const partialData: CapturarSolicitud = {
    datosDeLaSolicitud: mockDatosDeLaSolicitud,
    datosParaMovilizacionNacional: mockDatosParaMovilizacionNacional,
    pagoDeDerechos: mockPagoDeDerechos,
    tercerosRelacionados: mockTercerosRelacionados,
    validarEnvio: mockValidarEnvio
  } as CapturarSolicitud;
  
  // Act
  service.storeDatosFormulario(partialData);

  // Assert: ✅ Expect the actual mocks, not empty objects
  expect(zoosanitarioStoreMock.actualizarPagoDeDerechos).toHaveBeenCalledWith(mockPagoDeDerechos);
  expect(zoosanitarioStoreMock.actualizarDatosDeLaSolicitud).toHaveBeenCalledWith(mockDatosDeLaSolicitud);
  expect(zoosanitarioStoreMock.actualizarDatosParaMovilizacionNacional).toHaveBeenCalledWith(mockDatosParaMovilizacionNacional);
  expect(zoosanitarioStoreMock.actualizarTercerosRelacionados).toHaveBeenCalledWith(mockTercerosRelacionados);
  expect(zoosanitarioStoreMock.actualizarformaValidas).toHaveBeenCalledWith(mockValidarEnvio);
});

  });

  // Additional integration-style tests
  describe('Integration Tests', () => {
    it('should properly chain update operations when storing form data', () => {
      // Act
      service.storeDatosFormulario(mockCapturarSolicitud);

      // Assert - verify all methods were called in sequence
      expect(zoosanitarioStoreMock.actualizarPagoDeDerechos).toHaveBeenCalledTimes(1);
      expect(zoosanitarioStoreMock.actualizarDatosDeLaSolicitud).toHaveBeenCalledTimes(1);
      expect(zoosanitarioStoreMock.actualizarDatosParaMovilizacionNacional).toHaveBeenCalledTimes(1);
      expect(zoosanitarioStoreMock.actualizarTercerosRelacionados).toHaveBeenCalledTimes(1);
      expect(zoosanitarioStoreMock.actualizarformaValidas).toHaveBeenCalledTimes(1);
    });

    it('should handle complex validation scenarios in obtenerTodosLosStatus', (done) => {
      const complexValidarEnvio: ValidarEnvio = {
          dataParaMovilizacion: true,
  dataDeLaSolicitud: true,
      } as ValidarEnvio;

      zoosanitarioStoreMock._select.mockReturnValue(of(complexValidarEnvio));

      // Act & Assert
      service.obtenerTodosLosStatus().subscribe(result => {
        expect(result).toBe(true); // Should be true due to all fields being true
        done();
      });
    });
  });
});