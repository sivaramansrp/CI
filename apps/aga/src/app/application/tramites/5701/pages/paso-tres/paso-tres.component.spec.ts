import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PasoTresComponent } from './paso-tres.component';
import { FirmaElectronicaService } from '@libs/shared/data-access-user/src/core/services/shared/firma-electronica/firma-electronica.service';
import { TramiteFolioService, TramiteFolioStore } from '@ng-mf/data-access-user';
import { Router } from '@angular/router';
import { Tramite5701Query } from '../../../../core/queries/tramite5701.query';
import { Tramite5701Store } from '../../../../core/estados/tramites/tramite5701.store';
import { of, throwError } from 'rxjs';
import { BaseResponse } from '../../../../core/models/5701/base-response.model';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;
  
  // Mocks para los servicios
  let mockFirmaService: any;
  let mockTramiteFolioService: any;
  let mockRouter: any;
  let mockTramiteStore: any;
  let mockTramite5701Query: any;
  let mockTramite5701Store: any;

  beforeEach(async () => {
    // Configuración de mocks
    mockFirmaService = {
      obtenerCadenaOriginal: jest.fn(),
      enviarFirma: jest.fn()
    };

    mockTramiteFolioService = {
      obtenerTramite: jest.fn()
    };

    mockRouter = {
      url: '/tramite/5701/paso3',
      navigate: jest.fn()
    };

    mockTramiteStore = {
      establecerTramite: jest.fn()
    };

    mockTramite5701Query = {
      getValue: jest.fn()
    };

    mockTramite5701Store = {};

    await TestBed.configureTestingModule({
      declarations: [PasoTresComponent],
      providers: [
        { provide: FirmaElectronicaService, useValue: mockFirmaService },
        { provide: TramiteFolioService, useValue: mockTramiteFolioService },
        { provide: Router, useValue: mockRouter },
        { provide: TramiteFolioStore, useValue: mockTramiteStore },
        { provide: Tramite5701Query, useValue: mockTramite5701Query },
        { provide: Tramite5701Store, useValue: mockTramite5701Store }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('debería configurar la URL correctamente', () => {
      component.ngOnInit();
      expect(component.url).toBe('/tramite/5701');
    });

    it('debería llamar a onObtenerCadenaOriginal', () => {
      const spy = jest.spyOn(component, 'onObtenerCadenaOriginal');
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onObtenerCadenaOriginal', () => {
    it('debería obtener la cadena original correctamente', fakeAsync(() => {
      const mockResponse: BaseResponse<string> = {
        codigo: '0',
        mensaje: 'Éxito',
        datos: 'CADENA_ORIGINAL_TEST',
        path: '',
        timestamp: ''
      };

      mockFirmaService.obtenerCadenaOriginal.mockReturnValue(of(mockResponse));

      component.onObtenerCadenaOriginal();
      tick();

      expect(mockFirmaService.obtenerCadenaOriginal).toHaveBeenCalled();
      expect(component.cadenaOriginal).toBe('CADENA_ORIGINAL_TEST');
    }));

    it('debería manejar errores al obtener cadena original', fakeAsync(() => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      mockFirmaService.obtenerCadenaOriginal.mockReturnValue(throwError(() => new Error('Error test')));

      component.onObtenerCadenaOriginal();
      tick();

      expect(consoleSpy).toHaveBeenCalledWith('Error al obtener cadena original:', expect.any(Error));
      consoleSpy.mockRestore();
    }));
  });

  describe('onDatosFirma', () => {
    it('debería establecer datosFirmaReales y llamar a obtieneFirma', () => {
      const spy = jest.spyOn(component, 'obtieneFirma');
      const testData = {
        firma: 'FIRMA_TEST',
        certSerialNumber: 'SERIAL_TEST',
        rfc: 'RFC_TEST',
        fechaFin: '2025-12-31'
      };

      component.onDatosFirma(testData);

      expect(component.datosFirmaReales).toEqual(testData);
      expect(spy).toHaveBeenCalledWith('FIRMA_TEST');
    });
  });

  describe('obtieneFirma', () => {
    beforeEach(() => {
      // Configurar datos necesarios para las pruebas
      component.cadenaOriginal = 'CADENA_ORIGINAL_TEST';
      component.datosFirmaReales = {
        firma: 'FIRMA_TEST',
        certSerialNumber: 'SERIAL_TEST',
        rfc: 'RFC_TEST',
        fechaFin: '2025-12-31'
      };
      
      mockTramite5701Query.getValue.mockReturnValue({
        idSolicitud: 123
      });
    });

    it('debería completar el proceso de firma correctamente', fakeAsync(() => {
      const mockFirmaResponse: BaseResponse<string> = {
        codigo: '00',
        mensaje: 'Éxito',
        datos: 'FOLIO_TEST',
        path: '',
        timestamp: ''
      };

      const mockTramiteResponse = {
        data: { id: 19 }
      };

      mockFirmaService.enviarFirma.mockReturnValue(of(mockFirmaResponse));
      mockTramiteFolioService.obtenerTramite.mockReturnValue(of(mockTramiteResponse));

      component.obtieneFirma('FIRMA_TEST');
      tick();

      // Verificar llamadas a servicios
      expect(mockFirmaService.enviarFirma).toHaveBeenCalled();
      expect(mockTramiteFolioService.obtenerTramite).toHaveBeenCalledWith(19);
      
      // Verificar establecimiento de datos
      expect(mockTramiteStore.establecerTramite).toHaveBeenCalledTimes(2);
      expect(component.folio).toBe('FOLIO_TEST');
      
      // Verificar navegación
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/tramite/5701/acuse']);
    }));

    it('debería manejar errores en el proceso de firma', fakeAsync(() => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      mockFirmaService.enviarFirma.mockReturnValue(throwError(() => new Error('Error test')));

      component.obtieneFirma('FIRMA_TEST');
      tick();

      expect(consoleSpy).toHaveBeenCalledWith('Error en el proceso de firma:', expect.any(Error));
      consoleSpy.mockRestore();
    }));

    it('no debería hacer nada si faltan datos', () => {
      // Caso 1: Falta cadena original
      component.cadenaOriginal = undefined;
      component.obtieneFirma('FIRMA_TEST');
      expect(mockFirmaService.enviarFirma).not.toHaveBeenCalled();

      // Caso 2: Faltan datos de firma
      component.cadenaOriginal = 'CADENA_TEST';
      component.datosFirmaReales = undefined;
      component.obtieneFirma('FIRMA_TEST');
      expect(mockFirmaService.enviarFirma).not.toHaveBeenCalled();
    });
  });
});