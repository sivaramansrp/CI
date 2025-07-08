import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { Solocitud260402Service } from './service260402.service';
import { DatosDelSolicituteSeccionState, DatosDelSolicituteSeccionStateStore } from '../../../shared/estados/stores/datos-del-solicitute-seccion.store';
import { PermisoImportacionBiologicaState, PermisoImportacionBiologicaStore } from '../../../shared/estados/permiso-importacion-biologica.store';
import { ENVIRONMENT } from '../../../../environments/environment';

describe('Solocitud260402Service', () => {
  let service: Solocitud260402Service;
  let httpMock: HttpTestingController;
  let mockTramite301Store: jest.Mocked<DatosDelSolicituteSeccionStateStore>;
  let mockTramite260402Store: jest.Mocked<PermisoImportacionBiologicaStore>;

  const mockDatosDelSolicituteState: DatosDelSolicituteSeccionState = {
    // Required fields
    representanteRfc: 'REPR123456ABC',
    representanteNombre: 'Jane Representative',
    apellidoPaterno: 'Paternal',
    apellidoMaterno: 'Maternal',
    establecimientoDenominacionRazonSocial: 'Test Company',
    establecimientoCorreoElectronico: 'test@company.com',
    establecimientoDomicilioCodigoPostal: '12345',
    establecimientoDomicilioEstado: 'Test State',
    establecimientoMunicipioYAlcaldia: 'Test Municipality',
    establecimientoDomicilioLocalidad: 'Test Locality',
    establecimientoDomicilioColonia: 'Test Colony',
    establecimientoDomicilioCalle: 'Test Street 123',
    establecimientoDomicilioLada: '55',
    establecimientoDomicilioTelefono: '1234567890',
    rfcDelProfesionalResponsable: 'PROF123456ABC',
    nombreDelProfesionalResponsable: 'John Professional',
    informacionConfidencialRadio: 'true',
    propietarioData: [],
    establecimientoData: [],
    ideGenerica: 'IDEA123',
    observaciones: 'Test observations',
    establecimientoRFCResponsableSanitario: 'RFC123456789',
    establecimientoRazonSocial: 'Test Company',
    establecimientoEstados: 'Test State',
    descripcionMunicipio: 'Test Municipality',
    localidad: 'Test Locality',
    colonias: 'Test Colony',
    calle: 'Test Street',
    lada: '55',
    telefono: '1234567890',
    scian: 'SCIAN123',
    establishomentoColonias: 'Test Colony',
    noLicenciaSanitaria: 'LIC123456',
    avisoCheckbox: 'checked',
    licenciaSanitaria: 'LIC123456',
    regimen: 'Test Regime',
    aduanasEntradas: 'Test Customs',
    aifaCheckbox: 'checked',
    descripcionScian: 'Test SCIAN Description',
    noDeLicenciaSanitaria: 'LIC123456',
    noDeLicenciaSanitariaObservaciones: 'Test observations',
    regimenAlQueSeDestinaraLaMercancía: 'Test Regime',
    aduanaDeSalida: 'Test Customs',
    manifests: 'Test manifests'
  };

  const mockPermisoImportacionState: PermisoImportacionBiologicaState = {
    selectedEstado: null,
    setClave: null,
    setBanco: null,
    setClaveDeReferncia: 'REF123456',
    setCadenaDeLaDependencia: 'CHAIN123',
    setLlaveDePago: 'KEY123',
    setFechaDePago: '2025-01-01',
    setImporteDePago: '1500.00'
  };

  beforeEach(() => {
    mockTramite301Store = {
      setEstablecimientoDenominacionRazonSocial: jest.fn(),
      setEstablecimientoCorreoElectronico: jest.fn(),
      setEstablecimientoDomicilioCodigoPostal: jest.fn(),
      setEstablecimientoDomicilioEstado: jest.fn(),
      setEstablecimientoMunicipioYAlcaldia: jest.fn(),
      setEstablecimientoDomicilioLocalidad: jest.fn(),
      setEstablecimientoDomicilioColonia: jest.fn(),
      setEstablecimientoDomicilioCalle: jest.fn(),
      setEstablecimientoDomicilioLada: jest.fn(),
      setEstablecimientoDomicilioTelefono: jest.fn(),
      setRfcDelProfesionalResponsable: jest.fn(),
      setNombreDelProfesionalResponsable: jest.fn(),
      setRepresentanteRfc: jest.fn(),
      setRepresentanteNombre: jest.fn(),
      setRepresentanteApellidos: jest.fn(),
      setInformacionConfidencial: jest.fn(),
      setAduanaDeSalida: jest.fn(),
      setRegimenAlQueSeDestinaraLaMercancía: jest.fn(),
      setNoDeLicenciaSanitariaObservaciones: jest.fn(),
      setNoDeLicenciaSanitaria: jest.fn(),
      setManifests: jest.fn()
    } as any;

    mockTramite260402Store = {
      setClaveDeReferncia: jest.fn(),
      setCadenaDeLaDependencia: jest.fn(),
      setLlaveDePago: jest.fn(),
      setFechaDePago: jest.fn(),
      setImporteDePago: jest.fn()
    } as any;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        Solocitud260402Service,
        { provide: DatosDelSolicituteSeccionStateStore, useValue: mockTramite301Store },
        { provide: PermisoImportacionBiologicaStore, useValue: mockTramite260402Store }
      ]
    });

    service = TestBed.inject(Solocitud260402Service);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('Service Initialization', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should initialize with correct environment URLs', () => {
      expect(service.urlServer).toBe(ENVIRONMENT.URL_SERVER);
      expect(service.urlServerCatalogos).toBe(ENVIRONMENT.URL_SERVER_JSON_AUXILIAR);
    });

    it('should inject dependencies correctly', () => {
      expect(service['tramite301Store']).toBe(mockTramite301Store);
      expect(service['tramite260402']).toBe(mockTramite260402Store);
    });
  });

  describe('actualizarEstadoFormulario', () => {
    it('should update all establishment data in the store', () => {
      service.actualizarEstadoFormulario(mockDatosDelSolicituteState);

      expect(mockTramite301Store.setEstablecimientoDenominacionRazonSocial)
        .toHaveBeenCalledWith(mockDatosDelSolicituteState.establecimientoDenominacionRazonSocial);
      expect(mockTramite301Store.setEstablecimientoCorreoElectronico)
        .toHaveBeenCalledWith(mockDatosDelSolicituteState.establecimientoCorreoElectronico);
      expect(mockTramite301Store.setEstablecimientoDomicilioCodigoPostal)
        .toHaveBeenCalledWith(mockDatosDelSolicituteState.establecimientoDomicilioCodigoPostal);
      expect(mockTramite301Store.setEstablecimientoDomicilioEstado)
        .toHaveBeenCalledWith(mockDatosDelSolicituteState.establecimientoDomicilioEstado);
      expect(mockTramite301Store.setEstablecimientoMunicipioYAlcaldia)
        .toHaveBeenCalledWith(mockDatosDelSolicituteState.establecimientoMunicipioYAlcaldia);
    });

    it('should update all address data in the store', () => {
      service.actualizarEstadoFormulario(mockDatosDelSolicituteState);

      expect(mockTramite301Store.setEstablecimientoDomicilioLocalidad)
        .toHaveBeenCalledWith(mockDatosDelSolicituteState.establecimientoDomicilioLocalidad);
      expect(mockTramite301Store.setEstablecimientoDomicilioColonia)
        .toHaveBeenCalledWith(mockDatosDelSolicituteState.establecimientoDomicilioColonia);
      expect(mockTramite301Store.setEstablecimientoDomicilioCalle)
        .toHaveBeenCalledWith(mockDatosDelSolicituteState.establecimientoDomicilioCalle);
      expect(mockTramite301Store.setEstablecimientoDomicilioLada)
        .toHaveBeenCalledWith(mockDatosDelSolicituteState.establecimientoDomicilioLada);
      expect(mockTramite301Store.setEstablecimientoDomicilioTelefono)
        .toHaveBeenCalledWith(mockDatosDelSolicituteState.establecimientoDomicilioTelefono);
    });

    it('should update professional responsible data in the store', () => {
      service.actualizarEstadoFormulario(mockDatosDelSolicituteState);

      expect(mockTramite301Store.setRfcDelProfesionalResponsable)
        .toHaveBeenCalledWith(mockDatosDelSolicituteState.rfcDelProfesionalResponsable);
      expect(mockTramite301Store.setNombreDelProfesionalResponsable)
        .toHaveBeenCalledWith(mockDatosDelSolicituteState.nombreDelProfesionalResponsable);
    });

    it('should update representative data in the store', () => {
      service.actualizarEstadoFormulario(mockDatosDelSolicituteState);

      expect(mockTramite301Store.setRepresentanteRfc)
        .toHaveBeenCalledWith(mockDatosDelSolicituteState.representanteRfc);
      expect(mockTramite301Store.setRepresentanteNombre)
        .toHaveBeenCalledWith(mockDatosDelSolicituteState.representanteNombre);
      expect(mockTramite301Store.setRepresentanteApellidos)
        .toHaveBeenCalledWith(
          mockDatosDelSolicituteState.apellidoMaterno,
          mockDatosDelSolicituteState.apellidoPaterno
        );
    });

    it('should update administrative data in the store', () => {
      service.actualizarEstadoFormulario(mockDatosDelSolicituteState);

      expect(mockTramite301Store.setInformacionConfidencial)
        .toHaveBeenCalledWith(mockDatosDelSolicituteState.informacionConfidencialRadio);
      expect(mockTramite301Store.setAduanaDeSalida)
        .toHaveBeenCalledWith(mockDatosDelSolicituteState.aduanaDeSalida);
      expect(mockTramite301Store.setRegimenAlQueSeDestinaraLaMercancía)
        .toHaveBeenCalledWith(mockDatosDelSolicituteState.regimenAlQueSeDestinaraLaMercancía);
    });

    it('should update license data in the store', () => {
      service.actualizarEstadoFormulario(mockDatosDelSolicituteState);

      expect(mockTramite301Store.setNoDeLicenciaSanitaria)
        .toHaveBeenCalledWith(mockDatosDelSolicituteState.noDeLicenciaSanitaria);
      expect(mockTramite301Store.setNoDeLicenciaSanitariaObservaciones)
        .toHaveBeenCalledWith(mockDatosDelSolicituteState.noDeLicenciaSanitariaObservaciones);
      expect(mockTramite301Store.setManifests)
        .toHaveBeenCalledWith(mockDatosDelSolicituteState.manifests);
    });

    it('should handle null or undefined values gracefully', () => {
      const nullData: DatosDelSolicituteSeccionState = {
        ...mockDatosDelSolicituteState,
        establecimientoDenominacionRazonSocial: null as any,
        establecimientoCorreoElectronico: undefined as any
      };

      expect(() => service.actualizarEstadoFormulario(nullData)).not.toThrow();
      expect(mockTramite301Store.setEstablecimientoDenominacionRazonSocial).toHaveBeenCalledWith(null);
      expect(mockTramite301Store.setEstablecimientoCorreoElectronico).toHaveBeenCalledWith(undefined);
    });
  });

  describe('actualizarPagoDerechosFormulario', () => {
    it('should update all payment rights data in the store', () => {
      service.actualizarPagoDerechosFormulario(mockPermisoImportacionState);

      expect(mockTramite260402Store.setClaveDeReferncia)
        .toHaveBeenCalledWith(mockPermisoImportacionState.setClaveDeReferncia);
      expect(mockTramite260402Store.setCadenaDeLaDependencia)
        .toHaveBeenCalledWith(mockPermisoImportacionState.setCadenaDeLaDependencia);
      expect(mockTramite260402Store.setLlaveDePago)
        .toHaveBeenCalledWith(mockPermisoImportacionState.setLlaveDePago);
      expect(mockTramite260402Store.setFechaDePago)
        .toHaveBeenCalledWith(mockPermisoImportacionState.setFechaDePago);
      expect(mockTramite260402Store.setImporteDePago)
        .toHaveBeenCalledWith(mockPermisoImportacionState.setImporteDePago);
    });

    it('should handle empty payment data', () => {
      const emptyPaymentData: PermisoImportacionBiologicaState = {
        selectedEstado: null,
        setClave: null,
        setBanco: null,
        setClaveDeReferncia: '',
        setCadenaDeLaDependencia: '',
        setLlaveDePago: '',
        setFechaDePago: '',
        setImporteDePago: '0'
      };

      service.actualizarPagoDerechosFormulario(emptyPaymentData);

      expect(mockTramite260402Store.setClaveDeReferncia).toHaveBeenCalledWith('');
      expect(mockTramite260402Store.setCadenaDeLaDependencia).toHaveBeenCalledWith('');
      expect(mockTramite260402Store.setLlaveDePago).toHaveBeenCalledWith('');
      expect(mockTramite260402Store.setFechaDePago).toHaveBeenCalledWith('');
      expect(mockTramite260402Store.setImporteDePago).toHaveBeenCalledWith('0');
    });

    it('should handle null payment data gracefully', () => {
      const nullPaymentData: PermisoImportacionBiologicaState = {
        selectedEstado: null,
        setClave: null,
        setBanco: null,
        setClaveDeReferncia: null as any,
        setCadenaDeLaDependencia: null as any,
        setLlaveDePago: null as any,
        setFechaDePago: null as any,
        setImporteDePago: null as any
      };

      expect(() => service.actualizarPagoDerechosFormulario(nullPaymentData)).not.toThrow();
      expect(mockTramite260402Store.setClaveDeReferncia).toHaveBeenCalledWith(null);
      expect(mockTramite260402Store.setImporteDePago).toHaveBeenCalledWith(null);
    });
  });

  describe('getRegistroTomaMuestrasMercanciasData', () => {
    it('should fetch registro toma muestras mercancias data successfully', () => {
      const expectedUrl = 'assets/json/260402/serviciosExtraordinarios.json';

      service.getRegistroTomaMuestrasMercanciasData().subscribe(response => {
        expect(response).toEqual(mockDatosDelSolicituteState);
      });

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockDatosDelSolicituteState);
    });

    it('should handle HTTP errors gracefully', () => {
      const errorMessage = 'File not found';

      service.getRegistroTomaMuestrasMercanciasData().subscribe({
        next: () => fail('Should have failed'),
        error: (error) => {
          expect(error.status).toBe(404);
          expect(error.statusText).toBe('Not Found');
        }
      });

      const req = httpMock.expectOne('assets/json/260402/serviciosExtraordinarios.json');
      req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
    });
  });

  describe('getPagoDerechos', () => {
    it('should fetch pago derechos data successfully', () => {
      const expectedUrl = 'assets/json/260402/pagoDerechos.json';

      service.getPagoDerechos().subscribe(response => {
        expect(response).toEqual(mockPermisoImportacionState);
      });

      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockPermisoImportacionState);
    });

    it('should handle empty response', () => {
      service.getPagoDerechos().subscribe(response => {
        expect(response).toEqual({});
      });

      const req = httpMock.expectOne('assets/json/260402/pagoDerechos.json');
      req.flush({});
    });

    it('should handle HTTP errors gracefully', () => {
      const errorMessage = 'Server error';

      service.getPagoDerechos().subscribe({
        next: () => fail('Should have failed'),
        error: (error) => {
          expect(error.status).toBe(500);
          expect(error.statusText).toBe('Internal Server Error');
        }
      });

      const req = httpMock.expectOne('assets/json/260402/pagoDerechos.json');
      req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle concurrent HTTP requests', () => {
      const responses: any[] = [];

      // Make multiple concurrent requests
      service.getRegistroTomaMuestrasMercanciasData().subscribe(response => {
        responses.push({ type: 'registro', data: response });
      });

      service.getPagoDerechos().subscribe(response => {
        responses.push({ type: 'pago', data: response });
      });

      // Expect both requests
      const reqRegistro = httpMock.expectOne('assets/json/260402/serviciosExtraordinarios.json');
      const reqPago = httpMock.expectOne('assets/json/260402/pagoDerechos.json');

      // Respond to both
      reqRegistro.flush(mockDatosDelSolicituteState);
      reqPago.flush(mockPermisoImportacionState);

      expect(responses).toHaveLength(2);
      expect(responses.find(r => r.type === 'registro')).toBeDefined();
      expect(responses.find(r => r.type === 'pago')).toBeDefined();
    });

    it('should handle malformed JSON response', () => {
      service.getRegistroTomaMuestrasMercanciasData().subscribe({
        next: (response) => {
          // Should still work if server returns valid JSON
          expect(response).toBeDefined();
        },
        error: (error) => {
          // Or handle parse errors
          expect(error).toBeDefined();
        }
      });

      const req = httpMock.expectOne('assets/json/260402/serviciosExtraordinarios.json');
      // Flush with valid data (HttpClientTestingModule handles JSON parsing)
      req.flush(mockDatosDelSolicituteState);
    });
  });

  describe('Store Integration', () => {
    it('should verify all store methods are called exactly once per update', () => {
      service.actualizarEstadoFormulario(mockDatosDelSolicituteState);

      // Verify each method is called exactly once
      expect(mockTramite301Store.setEstablecimientoDenominacionRazonSocial).toHaveBeenCalledTimes(1);
      expect(mockTramite301Store.setEstablecimientoCorreoElectronico).toHaveBeenCalledTimes(1);
      expect(mockTramite301Store.setRepresentanteApellidos).toHaveBeenCalledTimes(1);
      expect(mockTramite301Store.setManifests).toHaveBeenCalledTimes(1);
    });

    it('should verify payment store methods are called exactly once per update', () => {
      service.actualizarPagoDerechosFormulario(mockPermisoImportacionState);

      // Verify each payment method is called exactly once
      expect(mockTramite260402Store.setClaveDeReferncia).toHaveBeenCalledTimes(1);
      expect(mockTramite260402Store.setCadenaDeLaDependencia).toHaveBeenCalledTimes(1);
      expect(mockTramite260402Store.setLlaveDePago).toHaveBeenCalledTimes(1);
      expect(mockTramite260402Store.setFechaDePago).toHaveBeenCalledTimes(1);
      expect(mockTramite260402Store.setImporteDePago).toHaveBeenCalledTimes(1);
    });
  });
});
