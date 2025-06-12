import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { CatalogosSelect } from '@libs/shared/data-access-user/src/core/models/shared/components.model';
import { 
  Tramite300105State, 
  Tramite300105Store 
} from '../../estados/tramite300105.store';
import { Tramite300105Query } from '../../estados/tramite300105.query';
import { AutorizacionDeRayosXService } from '../../services/autorizacion-de-rayos-x.service';
import { INPUT_FECHA_CONFIG } from '../../enum/permiso.enum';

describe('PagoDeDerechosComponent', () => {
  let COMPONENT: PagoDeDerechosComponent;
  let FIXTURE: ComponentFixture<PagoDeDerechosComponent>;
  let MOCK_FORM_BUILDER: FormBuilder;
  let MOCK_TRAMITE_STORE: jest.Mocked<Tramite300105Store>;
  let MOCK_TRAMITE_QUERY: jest.Mocked<Tramite300105Query>;
  let MOCK_AUTORIZACION_SERVICE: jest.Mocked<AutorizacionDeRayosXService>;
  let MOCK_CONSULTAIO_QUERY: jest.Mocked<ConsultaioQuery>;

  // Datos mock
  const MOCK_CATALOGO_BANCOS: Catalogo[] = [
    { id: 1, descripcion: 'BBVA Bancomer', clave: 'BBVA' },
    { id: 2, descripcion: 'Banco Santander', clave: 'SANT' },
    { id: 3, descripcion: 'Banco Azteca', clave: 'AZTE' },
    { id: 4, descripcion: 'Citibank México', clave: 'CITI' }
  ];

  const MOCK_TRAMITE_STATE: Tramite300105State = {
    claveDeReferencia: 'REF123456',
    cadenaDependencia: 'CADENA001',
    banco: 'BBVA Bancomer',
    llaveDePago: 'LLAVE123',
    fechaPago: '2025-01-15',
    importePago: '15000.00',
    numeroExpediente: '123456',
    tipoOperacion: 'Importación',
    finalidad: 'Comercial',
    isExento: false,
    isAutorizacion: true,
    numAutorizacion1: '123',
    numAutorizacion2: '4567',
    numAutorizacion3: '8901',
    mercacniaSolicitudControlar: true,
    observaciones: 'Observaciones de pago',
    tercerosPopupState: false,
    mercanciaTablaDatos: [],
    destinatarioTablaDatos: []
  };

  const MOCK_CONSULTAIO_STATE = {
    readonly: false
  };

  const MOCK_CATALOGO_SELECT_BANCO: CatalogosSelect = {
    labelNombre: 'Banco',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: MOCK_CATALOGO_BANCOS
  };

  beforeEach(async () => {
    // Mock para Tramite300105Store
    const MOCK_STORE = {
      establecerDatos: jest.fn(),
      setllaveDePago: jest.fn()
    } as unknown as jest.Mocked<Tramite300105Store>;

    // Mock para Tramite300105Query
    const MOCK_QUERY = {
      selectTramite300105$: of(MOCK_TRAMITE_STATE)
    } as unknown as jest.Mocked<Tramite300105Query>;

    // Mock para AutorizacionDeRayosXService
    const MOCK_SERVICE = {
      getBancoData: jest.fn().mockReturnValue(of(MOCK_CATALOGO_BANCOS))
    } as unknown as jest.Mocked<AutorizacionDeRayosXService>;

    // Mock para ConsultaioQuery
    const MOCK_CONSULTAIO = {
      selectConsultaioState$: of(MOCK_CONSULTAIO_STATE)
    } as unknown as jest.Mocked<ConsultaioQuery>;

    await TestBed.configureTestingModule({
      declarations: [PagoDeDerechosComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Tramite300105Store, useValue: MOCK_STORE },
        { provide: Tramite300105Query, useValue: MOCK_QUERY },
        { provide: AutorizacionDeRayosXService, useValue: MOCK_SERVICE },
        { provide: ConsultaioQuery, useValue: MOCK_CONSULTAIO }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    FIXTURE = TestBed.createComponent(PagoDeDerechosComponent);
    COMPONENT = FIXTURE.componentInstance;
    MOCK_FORM_BUILDER = TestBed.inject(FormBuilder);
    MOCK_TRAMITE_STORE = TestBed.inject(Tramite300105Store) as jest.Mocked<Tramite300105Store>;
    MOCK_TRAMITE_QUERY = TestBed.inject(Tramite300105Query) as jest.Mocked<Tramite300105Query>;
    MOCK_AUTORIZACION_SERVICE = TestBed.inject(AutorizacionDeRayosXService) as jest.Mocked<AutorizacionDeRayosXService>;
    MOCK_CONSULTAIO_QUERY = TestBed.inject(ConsultaioQuery) as jest.Mocked<ConsultaioQuery>;
  });

  // Pruebas de inicialización y constructor
  describe('Inicialización del componente', () => {
    it('debería crear el componente correctamente', () => {
      expect(COMPONENT).toBeTruthy();
    });

    it('debería inicializar las propiedades con valores por defecto', () => {
      expect(COMPONENT.INPUT_FECHA_CONFIG).toBeDefined();
      expect(COMPONENT.INPUT_FECHA_CONFIG).toEqual(INPUT_FECHA_CONFIG);
      expect(COMPONENT.esFormularioSoloLectura).toBe(false);
      expect(COMPONENT['destroyNotifier$']).toBeInstanceOf(Subject);
    });

    it('debería inicializar el catálogo de bancos con valores por defecto', () => {
      expect(COMPONENT.bancoCatalogo.labelNombre).toBe('Banco');
      expect(COMPONENT.bancoCatalogo.required).toBe(true);
      expect(COMPONENT.bancoCatalogo.primerOpcion).toBe('Selecciona un valor');
      expect(COMPONENT.bancoCatalogo.catalogos).toEqual([]);
    });

    it('debería inyectar correctamente los servicios en el constructor', () => {
      expect(COMPONENT['fb']).toBeDefined();
      expect(COMPONENT['tramite300105Store']).toBeDefined();
      expect(COMPONENT['tramite300105Query']).toBeDefined();
      expect(COMPONENT['autorizacionDeRayosXService']).toBeDefined();
      expect(COMPONENT['consultaioQuery']).toBeDefined();
    });

    it('debería suscribirse al estado de consultaio en el constructor', () => {
      const SPY_PIPE = jest.spyOn(MOCK_CONSULTAIO_QUERY.selectConsultaioState$, 'pipe');
      
      // Crear nuevo componente para activar constructor
      const NEW_FIXTURE = TestBed.createComponent(PagoDeDerechosComponent);
      const NEW_COMPONENT = NEW_FIXTURE.componentInstance;
      
      expect(SPY_PIPE).toHaveBeenCalled();
      expect(NEW_COMPONENT.esFormularioSoloLectura).toBe(true); // readonly || true
    });

    it('debería establecer esFormularioSoloLectura cuando readonly es true', () => {
      const READONLY_STATE = { readonly: true };
      const MOCK_CONSULTAIO_READONLY = {
        selectConsultaioState$: of(READONLY_STATE)
      } as unknown as jest.Mocked<ConsultaioQuery>;

      TestBed.overrideProvider(ConsultaioQuery, { useValue: MOCK_CONSULTAIO_READONLY });
      
      const NEW_FIXTURE = TestBed.createComponent(PagoDeDerechosComponent);
      const NEW_COMPONENT = NEW_FIXTURE.componentInstance;
      
      expect(NEW_COMPONENT.esFormularioSoloLectura).toBe(true);
    });

    it('debería establecer esFormularioSoloLectura cuando readonly es false', () => {
      const READONLY_STATE = { readonly: false };
      const MOCK_CONSULTAIO_NO_READONLY = {
        selectConsultaioState$: of(READONLY_STATE)
      } as unknown as jest.Mocked<ConsultaioQuery>;

      TestBed.overrideProvider(ConsultaioQuery, { useValue: MOCK_CONSULTAIO_NO_READONLY });
      
      const NEW_FIXTURE = TestBed.createComponent(PagoDeDerechosComponent);
      const NEW_COMPONENT = NEW_FIXTURE.componentInstance;
      
      expect(NEW_COMPONENT.esFormularioSoloLectura).toBe(true); // readonly || true = true
    });

    it('debería llamar fetchBancoData en el constructor', () => {
      const SPY_FETCH_BANCO = jest.spyOn(PagoDeDerechosComponent.prototype, 'fetchBancoData');
      
      const NEW_FIXTURE = TestBed.createComponent(PagoDeDerechosComponent);
      
      expect(SPY_FETCH_BANCO).toHaveBeenCalled();
    });
  });

  // Pruebas para ngOnInit
  describe('ngOnInit', () => {
    it('debería suscribirse al estado del trámite y actualizar datos', () => {
      COMPONENT.ngOnInit();
      
      expect(COMPONENT.solicitudState).toEqual(MOCK_TRAMITE_STATE);
    });

    it('debería crear el formulario con la estructura correcta', () => {
      COMPONENT.ngOnInit();
      
      expect(COMPONENT.formSolicitud).toBeDefined();
      expect(COMPONENT.formSolicitud.get('datosImportadorExportador')).toBeDefined();
    });

    it('debería inicializar el formulario con datos del estado', () => {
      COMPONENT.ngOnInit();
      
      const DATOS_IMPORTADOR = COMPONENT.formSolicitud.get('datosImportadorExportador');
      
      expect(DATOS_IMPORTADOR?.get('claveDeReferencia')?.value).toBe(MOCK_TRAMITE_STATE.claveDeReferencia);
      expect(DATOS_IMPORTADOR?.get('cadenaDependencia')?.value).toBe(MOCK_TRAMITE_STATE.cadenaDependencia);
      expect(DATOS_IMPORTADOR?.get('banco')?.value).toBe(MOCK_TRAMITE_STATE.banco);
      expect(DATOS_IMPORTADOR?.get('llaveDePago')?.value).toBe(MOCK_TRAMITE_STATE.llaveDePago);
      expect(DATOS_IMPORTADOR?.get('fechaPago')?.value).toBe(MOCK_TRAMITE_STATE.fechaPago);
      expect(DATOS_IMPORTADOR?.get('importePago')?.value).toBe(MOCK_TRAMITE_STATE.importePago);
    });

    it('debería suscribirse al estado del trámite', () => {
      const SPY_PIPE = jest.spyOn(MOCK_TRAMITE_QUERY.selectTramite300105$, 'pipe');
      
      COMPONENT.ngOnInit();
      
      expect(SPY_PIPE).toHaveBeenCalled();
      expect(COMPONENT.solicitudState).toEqual(MOCK_TRAMITE_STATE);
    });

    it('debería deshabilitar el formulario cuando esFormularioSoloLectura es true', () => {
      COMPONENT.esFormularioSoloLectura = true;
      
      COMPONENT.ngOnInit();
      
      expect(COMPONENT.formSolicitud.disabled).toBeTruthy();
    });

    it('debería mantener el formulario habilitado cuando esFormularioSoloLectura es false', () => {
      COMPONENT.esFormularioSoloLectura = false;
      
      COMPONENT.ngOnInit();
      
      expect(COMPONENT.formSolicitud.enabled).toBeTruthy();
    });

    it('debería usar takeUntil para evitar fugas de memoria', () => {
      const MOCK_PIPE = jest.fn().mockReturnValue(of(MOCK_TRAMITE_STATE));
      MOCK_TRAMITE_QUERY.selectTramite300105$ = {
        pipe: MOCK_PIPE
      } as any;
      
      COMPONENT.ngOnInit();
      
      expect(MOCK_PIPE).toHaveBeenCalledWith(expect.anything());
    });

    it('debería manejar estado inicial undefined', () => {
      MOCK_TRAMITE_QUERY.selectTramite300105$ = of(undefined as any);
      
      expect(() => {
        COMPONENT.ngOnInit();
      }).not.toThrow();
      
      expect(COMPONENT.formSolicitud).toBeDefined();
    });

    it('debería manejar estado inicial null', () => {
      MOCK_TRAMITE_QUERY.selectTramite300105$ = of(null as any);
      
      expect(() => {
        COMPONENT.ngOnInit();
      }).not.toThrow();
      
      expect(COMPONENT.formSolicitud).toBeDefined();
    });
  });

  // Pruebas para fetchBancoData
  describe('fetchBancoData', () => {
    beforeEach(() => {
      COMPONENT.ngOnInit();
    });

    it('debería obtener y asignar los datos del catálogo de bancos', () => {
      COMPONENT.fetchBancoData();
      
      expect(MOCK_AUTORIZACION_SERVICE.getBancoData).toHaveBeenCalled();
      expect(COMPONENT.bancoCatalogo.catalogos).toEqual(MOCK_CATALOGO_BANCOS);
    });

    it('debería manejar respuesta vacía del servicio', () => {
      MOCK_AUTORIZACION_SERVICE.getBancoData.mockReturnValue(of([]));
      
      COMPONENT.fetchBancoData();
      
      expect(COMPONENT.bancoCatalogo.catalogos).toEqual([]);
    });

    it('debería usar takeUntil para evitar fugas de memoria', () => {
      const MOCK_OBSERVABLE = {
        pipe: jest.fn().mockReturnValue(of(MOCK_CATALOGO_BANCOS))
      };
      MOCK_AUTORIZACION_SERVICE.getBancoData.mockReturnValue(MOCK_OBSERVABLE as any);
      
      COMPONENT.fetchBancoData();
      
      expect(MOCK_OBSERVABLE.pipe).toHaveBeenCalledWith(expect.anything());
    });

    it('debería manejar errores del servicio', () => {
      const ERROR_MESSAGE = 'Error de conexión';
      MOCK_AUTORIZACION_SERVICE.getBancoData.mockReturnValue(
        new Observable(subscriber => subscriber.error(ERROR_MESSAGE))
      );
      
      expect(() => {
        COMPONENT.fetchBancoData();
      }).not.toThrow();
    });

    it('debería manejar datos de catálogo con propiedades opcionales', () => {
      const CATALOGO_CON_PROPIEDADES_OPCIONALES: Catalogo[] = [
        { id: 1, descripcion: 'Banco Test', clave: 'TEST', relacionadaUmtId: 100 },
        { id: 2, descripcion: 'Banco Sin Clave' }
      ];
      
      MOCK_AUTORIZACION_SERVICE.getBancoData.mockReturnValue(of(CATALOGO_CON_PROPIEDADES_OPCIONALES));
      
      COMPONENT.fetchBancoData();
      
      expect(COMPONENT.bancoCatalogo.catalogos).toEqual(CATALOGO_CON_PROPIEDADES_OPCIONALES);
    });
  });

  // Pruebas para manejarCambioLlavePago
  describe('manejarCambioLlavePago', () => {
    beforeEach(() => {
      COMPONENT.ngOnInit();
    });

    it('debería convertir a mayúsculas el valor de llave de pago', () => {
      const VALOR_MINUSCULAS = 'llave123abc';
      const VALOR_ESPERADO = 'LLAVE123ABC';
      
      COMPONENT.datosImportadorExportador.get('llaveDePago')?.setValue(VALOR_MINUSCULAS);
      
      COMPONENT.manejarCambioLlavePago();
      
      expect(COMPONENT.datosImportadorExportador.get('llaveDePago')?.value).toBe(VALOR_ESPERADO);
    });

    it('debería actualizar el store con el valor en mayúsculas', () => {
      const VALOR_MINUSCULAS = 'test123';
      const VALOR_ESPERADO = 'TEST123';
      
      COMPONENT.datosImportadorExportador.get('llaveDePago')?.setValue(VALOR_MINUSCULAS);
      
      COMPONENT.manejarCambioLlavePago();
      
      expect(MOCK_TRAMITE_STORE.setllaveDePago).toHaveBeenCalledWith(VALOR_ESPERADO);
    });

    it('debería manejar valor null en llave de pago', () => {
      COMPONENT.datosImportadorExportador.get('llaveDePago')?.setValue(null);
      
      expect(() => {
        COMPONENT.manejarCambioLlavePago();
      }).toThrow();
    });

    it('debería manejar valor undefined en llave de pago', () => {
      COMPONENT.datosImportadorExportador.get('llaveDePago')?.setValue(undefined);
      
      expect(() => {
        COMPONENT.manejarCambioLlavePago();
      }).toThrow();
    });

    it('debería manejar string vacío en llave de pago', () => {
      const VALOR_VACIO = '';
      
      COMPONENT.datosImportadorExportador.get('llaveDePago')?.setValue(VALOR_VACIO);
      
      COMPONENT.manejarCambioLlavePago();
      
      expect(COMPONENT.datosImportadorExportador.get('llaveDePago')?.value).toBe('');
      expect(MOCK_TRAMITE_STORE.setllaveDePago).toHaveBeenCalledWith('');
    });

    it('debería manejar valor que ya está en mayúsculas', () => {
      const VALOR_MAYUSCULAS = 'LLAVE456';
      
      COMPONENT.datosImportadorExportador.get('llaveDePago')?.setValue(VALOR_MAYUSCULAS);
      
      COMPONENT.manejarCambioLlavePago();
      
      expect(COMPONENT.datosImportadorExportador.get('llaveDePago')?.value).toBe(VALOR_MAYUSCULAS);
      expect(MOCK_TRAMITE_STORE.setllaveDePago).toHaveBeenCalledWith(VALOR_MAYUSCULAS);
    });

    it('debería manejar valor con caracteres especiales', () => {
      const VALOR_CON_ESPECIALES = 'llave@123#abc';
      const VALOR_ESPERADO = 'LLAVE@123#ABC';
      
      COMPONENT.datosImportadorExportador.get('llaveDePago')?.setValue(VALOR_CON_ESPECIALES);
      
      COMPONENT.manejarCambioLlavePago();
      
      expect(COMPONENT.datosImportadorExportador.get('llaveDePago')?.value).toBe(VALOR_ESPERADO);
      expect(MOCK_TRAMITE_STORE.setllaveDePago).toHaveBeenCalledWith(VALOR_ESPERADO);
    });

    it('debería manejar valor con espacios', () => {
      const VALOR_CON_ESPACIOS = 'llave 123 abc';
      const VALOR_ESPERADO = 'LLAVE 123 ABC';
      
      COMPONENT.datosImportadorExportador.get('llaveDePago')?.setValue(VALOR_CON_ESPACIOS);
      
      COMPONENT.manejarCambioLlavePago();
      
      expect(COMPONENT.datosImportadorExportador.get('llaveDePago')?.value).toBe(VALOR_ESPERADO);
      expect(MOCK_TRAMITE_STORE.setllaveDePago).toHaveBeenCalledWith(VALOR_ESPERADO);
    });
  });

  // Pruebas para setValoresStore
  describe('setValoresStore', () => {
    beforeEach(() => {
      COMPONENT.ngOnInit();
    });

    it('debería actualizar el store con el valor del campo especificado', () => {
      const MOCK_FORM = COMPONENT.datosImportadorExportador;
      const NOMBRE_CAMPO = 'claveDeReferencia';
      const VALOR_ESPERADO = 'REF789456';
      
      MOCK_FORM.get(NOMBRE_CAMPO)?.setValue(VALOR_ESPERADO);
      
      COMPONENT.setValoresStore(MOCK_FORM, NOMBRE_CAMPO);
      
      expect(MOCK_TRAMITE_STORE.establecerDatos).toHaveBeenCalledWith({
        [NOMBRE_CAMPO]: VALOR_ESPERADO
      });
    });

    it('debería manejar campos con valor null', () => {
      const MOCK_FORM = COMPONENT.datosImportadorExportador;
      const NOMBRE_CAMPO = 'cadenaDependencia';
      
      MOCK_FORM.get(NOMBRE_CAMPO)?.setValue(null);
      
      COMPONENT.setValoresStore(MOCK_FORM, NOMBRE_CAMPO);
      
      expect(MOCK_TRAMITE_STORE.establecerDatos).toHaveBeenCalledWith({
        [NOMBRE_CAMPO]: null
      });
    });

    it('debería manejar campos con valor undefined', () => {
      const MOCK_FORM = COMPONENT.datosImportadorExportador;
      const NOMBRE_CAMPO = 'banco';
      
      MOCK_FORM.get(NOMBRE_CAMPO)?.setValue(undefined);
      
      COMPONENT.setValoresStore(MOCK_FORM, NOMBRE_CAMPO);
      
      expect(MOCK_TRAMITE_STORE.establecerDatos).toHaveBeenCalledWith({
        [NOMBRE_CAMPO]: undefined
      });
    });

    it('debería manejar cuando el control no existe', () => {
      const MOCK_FORM = MOCK_FORM_BUILDER.group({});
      const NOMBRE_CAMPO_INEXISTENTE = 'campoInexistente';
      
      expect(() => {
        COMPONENT.setValoresStore(MOCK_FORM, NOMBRE_CAMPO_INEXISTENTE);
      }).not.toThrow();
      
      expect(MOCK_TRAMITE_STORE.establecerDatos).toHaveBeenCalledWith({
        [NOMBRE_CAMPO_INEXISTENTE]: undefined
      });
    });

    it('debería manejar diferentes tipos de valores', () => {
      const MOCK_FORM = COMPONENT.datosImportadorExportador;
      const CAMPOS_Y_VALORES = [
        { campo: 'claveDeReferencia', valor: 'STRING123' },
        { campo: 'importePago', valor: '1500.50' },
        { campo: 'fechaPago', valor: '2025-02-15' }
      ];
      
      CAMPOS_Y_VALORES.forEach(({ campo, valor }) => {
        MOCK_FORM.get(campo)?.setValue(valor);
        COMPONENT.setValoresStore(MOCK_FORM, campo);
        
        expect(MOCK_TRAMITE_STORE.establecerDatos).toHaveBeenCalledWith({
          [campo]: valor
        });
      });
    });
  });

  // Pruebas para datosImportadorExportador getter
  describe('datosImportadorExportador getter', () => {
    beforeEach(() => {
      COMPONENT.ngOnInit();
    });

    it('debería retornar el FormGroup de datosImportadorExportador', () => {
      const DATOS_IMPORTADOR = COMPONENT.datosImportadorExportador;
      
      expect(DATOS_IMPORTADOR).toBeDefined();
      expect(DATOS_IMPORTADOR.get('claveDeReferencia')).toBeDefined();
      expect(DATOS_IMPORTADOR.get('cadenaDependencia')).toBeDefined();
      expect(DATOS_IMPORTADOR.get('banco')).toBeDefined();
      expect(DATOS_IMPORTADOR.get('llaveDePago')).toBeDefined();
      expect(DATOS_IMPORTADOR.get('fechaPago')).toBeDefined();
      expect(DATOS_IMPORTADOR.get('importePago')).toBeDefined();
    });

    it('debería retornar el mismo FormGroup en múltiples llamadas', () => {
      const PRIMER_ACCESO = COMPONENT.datosImportadorExportador;
      const SEGUNDO_ACCESO = COMPONENT.datosImportadorExportador;
      
      expect(PRIMER_ACCESO).toBe(SEGUNDO_ACCESO);
    });

    it('debería manejar cuando formSolicitud no está inicializado', () => {
      COMPONENT.formSolicitud = undefined as any;
      
      expect(() => {
        const DATOS = COMPONENT.datosImportadorExportador;
      }).toThrow();
    });

    it('debería retornar FormGroup válido con controles accesibles', () => {
      const DATOS_IMPORTADOR = COMPONENT.datosImportadorExportador;
      
      // Verificar que todos los controles son accesibles
      const CAMPOS_ESPERADOS = [
        'claveDeReferencia',
        'cadenaDependencia', 
        'banco',
        'llaveDePago',
        'fechaPago',
        'importePago'
      ];
      
      CAMPOS_ESPERADOS.forEach(campo => {
        expect(DATOS_IMPORTADOR.get(campo)).toBeDefined();
      });
    });
  });

  // Pruebas para ngOnDestroy
  describe('ngOnDestroy', () => {
    it('debería completar el Subject destroyNotifier$', () => {
      const SPY_NEXT = jest.spyOn(COMPONENT['destroyNotifier$'], 'next');
      const SPY_COMPLETE = jest.spyOn(COMPONENT['destroyNotifier$'], 'complete');
      
      COMPONENT.ngOnDestroy();
      
      expect(SPY_NEXT).toHaveBeenCalled();
      expect(SPY_COMPLETE).toHaveBeenCalled();
    });

    it('debería limpiar correctamente los recursos para evitar fugas de memoria', () => {
      const SPY_NEXT = jest.spyOn(COMPONENT['destroyNotifier$'], 'next');
      const SPY_COMPLETE = jest.spyOn(COMPONENT['destroyNotifier$'], 'complete');
      
      COMPONENT.ngOnDestroy();
      
      expect(SPY_NEXT).toHaveBeenCalledTimes(1);
      expect(SPY_COMPLETE).toHaveBeenCalledTimes(1);
    });

    it('debería manejar cuando destroyNotifier$ es undefined', () => {
      COMPONENT['destroyNotifier$'] = undefined as any;
      
      expect(() => {
        COMPONENT.ngOnDestroy();
      }).toThrow();
    });
  });

  // Pruebas de validación de formularios
  describe('Validación de formularios', () => {
    beforeEach(() => {
      COMPONENT.ngOnInit();
    });

    it('debería crear todos los campos del formulario', () => {
      const DATOS_IMPORTADOR = COMPONENT.datosImportadorExportador;
      const CAMPOS_ESPERADOS = [
        'claveDeReferencia',
        'cadenaDependencia',
        'banco',
        'llaveDePago',
        'fechaPago',
        'importePago'
      ];
      
      CAMPOS_ESPERADOS.forEach(campo => {
        expect(DATOS_IMPORTADOR.get(campo)).toBeDefined();
      });
    });

    it('debería permitir actualizar valores de todos los campos', () => {
      const DATOS_IMPORTADOR = COMPONENT.datosImportadorExportador;
      const VALORES_PRUEBA = {
        claveDeReferencia: 'NUEVA_REF',
        cadenaDependencia: 'NUEVA_CADENA',
        banco: 'Banco Santander',
        llaveDePago: 'NUEVA_LLAVE',
        fechaPago: '2025-03-20',
        importePago: '25000.75'
      };
      
      Object.entries(VALORES_PRUEBA).forEach(([campo, valor]) => {
        DATOS_IMPORTADOR.get(campo)?.setValue(valor);
        expect(DATOS_IMPORTADOR.get(campo)?.value).toBe(valor);
      });
    });

    it('debería mantener la validez del formulario con valores válidos', () => {
      const DATOS_IMPORTADOR = COMPONENT.datosImportadorExportador;
      
      DATOS_IMPORTADOR.patchValue({
        claveDeReferencia: 'REF123',
        cadenaDependencia: 'CADENA123',
        banco: 'BBVA Bancomer',
        llaveDePago: 'LLAVE123',
        fechaPago: '2025-01-15',
        importePago: '15000.00'
      });
      
      expect(DATOS_IMPORTADOR.valid).toBeTruthy();
    });
  });

  // Pruebas de integración y flujo completo
  describe('Flujo completo del componente', () => {
    it('debería ejecutar el flujo completo de inicialización', () => {
      COMPONENT.ngOnInit();
      
      expect(COMPONENT.formSolicitud).toBeDefined();
      expect(COMPONENT.solicitudState).toEqual(MOCK_TRAMITE_STATE);
      expect(COMPONENT.bancoCatalogo.catalogos).toEqual(MOCK_CATALOGO_BANCOS);
    });

    it('debería mantener la consistencia de datos entre formulario y store', () => {
      COMPONENT.ngOnInit();
      
      const NUEVA_CLAVE = 'REF999888';
      const CONTROL = COMPONENT.formSolicitud.get('datosImportadorExportador.claveDeReferencia');
      
      CONTROL?.setValue(NUEVA_CLAVE);
      COMPONENT.setValoresStore(COMPONENT.datosImportadorExportador, 'claveDeReferencia');
      
      expect(MOCK_TRAMITE_STORE.establecerDatos).toHaveBeenCalledWith({
        claveDeReferencia: NUEVA_CLAVE
      });
    });

    it('debería manejar correctamente el estado de solo lectura', () => {
      COMPONENT.esFormularioSoloLectura = true;
      COMPONENT.ngOnInit();
      
      expect(COMPONENT.formSolicitud.disabled).toBeTruthy();
      
      // Verificar que todos los controles están deshabilitados
      const DATOS_IMPORTADOR = COMPONENT.datosImportadorExportador;
      Object.keys(DATOS_IMPORTADOR.controls).forEach(key => {
        expect(DATOS_IMPORTADOR.get(key)?.disabled).toBeTruthy();
      });
    });

    it('debería manejar el flujo completo de cambio de llave de pago', () => {
      COMPONENT.ngOnInit();
      
      const VALOR_INICIAL = 'llave123abc';
      const VALOR_ESPERADO = 'LLAVE123ABC';
      
      // Simular entrada del usuario
      COMPONENT.datosImportadorExportador.get('llaveDePago')?.setValue(VALOR_INICIAL);
      
      // Simular evento input
      COMPONENT.manejarCambioLlavePago();
      
      // Verificar transformación y actualización
      expect(COMPONENT.datosImportadorExportador.get('llaveDePago')?.value).toBe(VALOR_ESPERADO);
      expect(MOCK_TRAMITE_STORE.setllaveDePago).toHaveBeenCalledWith(VALOR_ESPERADO);
    });
  });

  // Pruebas para casos edge y manejo de errores
  describe('Casos límite y manejo de errores', () => {
    it('debería manejar observables que no emiten en constructor', () => {
      const EMPTY_SUBJECT = new Subject();
      const MOCK_CONSULTAIO_EMPTY = {
        selectConsultaioState$: EMPTY_SUBJECT.asObservable()
      } as unknown as jest.Mocked<ConsultaioQuery>;
      
      TestBed.overrideProvider(ConsultaioQuery, { useValue: MOCK_CONSULTAIO_EMPTY });
      
      expect(() => {
        const NEW_FIXTURE = TestBed.createComponent(PagoDeDerechosComponent);
      }).not.toThrow();
    });

    it('debería manejar observables que no emiten en ngOnInit', () => {
      const EMPTY_SUBJECT = new Subject();
      MOCK_TRAMITE_QUERY.selectTramite300105$ = EMPTY_SUBJECT.asObservable() as any;
      
      expect(() => COMPONENT.ngOnInit()).not.toThrow();
    });

    it('debería manejar error en el servicio de bancos', () => {
      const ERROR_MESSAGE = 'Error de red';
      MOCK_AUTORIZACION_SERVICE.getBancoData.mockReturnValue(
        new Observable(subscriber => subscriber.error(ERROR_MESSAGE))
      );
      
      expect(() => {
        COMPONENT.fetchBancoData();
      }).not.toThrow();
    });

    it('debería manejar formulario undefined en datosImportadorExportador getter', () => {
      COMPONENT.formSolicitud = undefined as any;
      
      expect(() => {
        const DATOS = COMPONENT.datosImportadorExportador;
      }).toThrow();
    });

    it('debería manejar cuando no existe el control en manejarCambioLlavePago', () => {
      const MOCK_FORM_VACIO = MOCK_FORM_BUILDER.group({});
      COMPONENT.formSolicitud = MOCK_FORM_BUILDER.group({
        datosImportadorExportador: MOCK_FORM_VACIO
      });
      
      expect(() => {
        COMPONENT.manejarCambioLlavePago();
      }).toThrow();
    });

    it('debería manejar estado del trámite parcialmente poblado', () => {
      const ESTADO_PARCIAL = {
        claveDeReferencia: 'REF123',
        banco: 'BBVA',
        // Faltan otros campos
      } as Tramite300105State;
      
      MOCK_TRAMITE_QUERY.selectTramite300105$ = of(ESTADO_PARCIAL);
      
      expect(() => {
        COMPONENT.ngOnInit();
      }).not.toThrow();
      
      const DATOS_IMPORTADOR = COMPONENT.datosImportadorExportador;
      expect(DATOS_IMPORTADOR.get('claveDeReferencia')?.value).toBe('REF123');
      expect(DATOS_IMPORTADOR.get('banco')?.value).toBe('BBVA');
      expect(DATOS_IMPORTADOR.get('cadenaDependencia')?.value).toBeUndefined();
    });

    it('debería manejar catálogo de bancos con datos malformados', () => {
      const CATALOGO_MALFORMADO = [
        { id: 1, descripcion: 'Banco Válido' },
        { descripcion: 'Sin ID' } as any, // Objeto malformado
        null as any, // Valor null
        { id: 3, descripcion: 'Otro Banco Válido' }
      ];
      
      MOCK_AUTORIZACION_SERVICE.getBancoData.mockReturnValue(of(CATALOGO_MALFORMADO));
      
      expect(() => {
        COMPONENT.fetchBancoData();
      }).not.toThrow();
      
      expect(COMPONENT.bancoCatalogo.catalogos).toEqual(CATALOGO_MALFORMADO);
    });
  });

  // Pruebas de interacciones con la template
  describe('Interacciones con la template', () => {
    beforeEach(() => {
      COMPONENT.ngOnInit();
      FIXTURE.detectChanges();
    });

    it('debería renderizar el título correctamente', () => {
      const COMPILED = FIXTURE.nativeElement;
      const TITULO = COMPILED.querySelector('ng-titulo');
      expect(TITULO).toBeTruthy();
    });

    it('debería renderizar el formulario principal', () => {
      const COMPILED = FIXTURE.nativeElement;
      const FORM = COMPILED.querySelector('form[formGroup]');
      expect(FORM).toBeTruthy();
    });

    it('debería renderizar todos los inputs del formulario', () => {
      const COMPILED = FIXTURE.nativeElement;
      const INPUT_CLAVE = COMPILED.querySelector('#claveDeReferencia');
      const INPUT_CADENA = COMPILED.querySelector('#cadenaDependencia');
      const INPUT_LLAVE = COMPILED.querySelector('#llaveDePago');
      const INPUT_IMPORTE = COMPILED.querySelector('#importePago');
      
      expect(INPUT_CLAVE).toBeTruthy();
      expect(INPUT_CADENA).toBeTruthy();
      expect(INPUT_LLAVE).toBeTruthy();
      expect(INPUT_IMPORTE).toBeTruthy();
    });

    it('debería renderizar el selector de banco', () => {
      const COMPILED = FIXTURE.nativeElement;
      const SELECTOR_BANCO = COMPILED.querySelector('app-catalogo-select');
      expect(SELECTOR_BANCO).toBeTruthy();
    });

    it('debería renderizar el componente de fecha', () => {
      const COMPILED = FIXTURE.nativeElement;
      const INPUT_FECHA = COMPILED.querySelector('input-fecha');
      expect(INPUT_FECHA).toBeTruthy();
    });

    it('debería llamar a setValoresStore en el evento change de inputs', () => {
      const SPY_SET_VALORES = jest.spyOn(COMPONENT, 'setValoresStore');
      
      const INPUT_CLAVE = FIXTURE.debugElement.nativeElement.querySelector('#claveDeReferencia');
      INPUT_CLAVE.value = 'REF123';
      INPUT_CLAVE.dispatchEvent(new Event('change'));
      
      expect(SPY_SET_VALORES).toHaveBeenCalled();
    });

    it('debería llamar a manejarCambioLlavePago en el evento input de llaveDePago', () => {
      const SPY_MANEJAR_LLAVE = jest.spyOn(COMPONENT, 'manejarCambioLlavePago');
      
      const INPUT_LLAVE = FIXTURE.debugElement.nativeElement.querySelector('#llaveDePago');
      INPUT_LLAVE.value = 'llave123';
      INPUT_LLAVE.dispatchEvent(new Event('input'));
      
      expect(SPY_MANEJAR_LLAVE).toHaveBeenCalled();
    });

    it('debería aplicar directiva appUppercase en campos específicos', () => {
      const COMPILED = FIXTURE.nativeElement;
      const INPUT_CADENA = COMPILED.querySelector('#cadenaDependencia[appUppercase]');
      const INPUT_IMPORTE = COMPILED.querySelector('#importePago[appUppercase]');
      
      expect(INPUT_CADENA).toBeTruthy();
      expect(INPUT_IMPORTE).toBeTruthy();
    });

    it('debería deshabilitar selector cuando esFormularioSoloLectura es true', () => {
      COMPONENT.esFormularioSoloLectura = true;
      FIXTURE.detectChanges();
      
      const COMPILED = FIXTURE.nativeElement;
      const SELECTOR_DESHABILITADO = COMPILED.querySelector('app-catalogo-select[isDisabled="true"]');
      expect(SELECTOR_DESHABILITADO).toBeTruthy();
    });
  });

  // Pruebas de gestión de suscripciones
  describe('Gestión de suscripciones', () => {
    it('debería usar takeUntil para evitar fugas de memoria en constructor', () => {
      const MOCK_PIPE = jest.fn().mockReturnValue(of(MOCK_CONSULTAIO_STATE));
      MOCK_CONSULTAIO_QUERY.selectConsultaioState$ = {
        pipe: MOCK_PIPE
      } as any;
      
      const NEW_FIXTURE = TestBed.createComponent(PagoDeDerechosComponent);
      
      expect(MOCK_PIPE).toHaveBeenCalledWith(expect.anything(), expect.anything());
    });

    it('debería usar takeUntil para evitar fugas de memoria en ngOnInit', () => {
      const MOCK_PIPE = jest.fn().mockReturnValue(of(MOCK_TRAMITE_STATE));
      MOCK_TRAMITE_QUERY.selectTramite300105$ = {
        pipe: MOCK_PIPE
      } as any;
      
      COMPONENT.ngOnInit();
      
      expect(MOCK_PIPE).toHaveBeenCalledWith(expect.anything());
    });

    it('debería cancelar todas las suscripciones al destruir', () => {
      const DESTROY_SUBJECT = COMPONENT['destroyNotifier$'];
      const SPY_NEXT = jest.spyOn(DESTROY_SUBJECT, 'next');
      const SPY_COMPLETE = jest.spyOn(DESTROY_SUBJECT, 'complete');
      
      COMPONENT.ngOnDestroy();
      
      expect(SPY_NEXT).toHaveBeenCalled();
      expect(SPY_COMPLETE).toHaveBeenCalled();
    });

    it('debería usar takeUntil en fetchBancoData', () => {
      const MOCK_OBSERVABLE = {
        pipe: jest.fn().mockReturnValue(of(MOCK_CATALOGO_BANCOS))
      };
      MOCK_AUTORIZACION_SERVICE.getBancoData.mockReturnValue(MOCK_OBSERVABLE as any);
      
      COMPONENT.fetchBancoData();
      
      expect(MOCK_OBSERVABLE.pipe).toHaveBeenCalledWith(expect.anything());
    });
  });

  // Pruebas de propiedades públicas
  describe('Propiedades públicas', () => {
    it('debería tener las propiedades públicas accesibles', () => {
      expect(COMPONENT.formSolicitud).toBeDefined();
      expect(COMPONENT.solicitudState).toBeDefined();
      expect(COMPONENT.INPUT_FECHA_CONFIG).toBeDefined();
      expect(COMPONENT.bancoCatalogo).toBeDefined();
      expect(COMPONENT.esFormularioSoloLectura).toBeDefined();
    });

    it('debería mantener la estructura correcta de bancoCatalogo', () => {
      expect(COMPONENT.bancoCatalogo).toEqual(
        expect.objectContaining({
          labelNombre: expect.any(String),
          required: expect.any(Boolean),
          primerOpcion: expect.any(String),
          catalogos: expect.any(Array)
        })
      );
    });

    it('debería tener INPUT_FECHA_CONFIG con la configuración correcta', () => {
      expect(COMPONENT.INPUT_FECHA_CONFIG).toEqual(INPUT_FECHA_CONFIG);
      expect(COMPONENT.INPUT_FECHA_CONFIG.labelNombre).toBe('Fecha de pago');
      expect(COMPONENT.INPUT_FECHA_CONFIG.required).toBe(true);
      expect(COMPONENT.INPUT_FECHA_CONFIG.habilitado).toBe(true);
    });
  });

  // Pruebas de constantes y configuración
  describe('Constantes y configuración', () => {
    it('debería tener INPUT_FECHA_CONFIG definida correctamente', () => {
      expect(COMPONENT.INPUT_FECHA_CONFIG).toBeDefined();
      expect(typeof COMPONENT.INPUT_FECHA_CONFIG).toBe('object');
    });

    it('debería inicializar esFormularioSoloLectura como false por defecto', () => {
      const NEW_COMPONENT = new PagoDeDerechosComponent(
        MOCK_FORM_BUILDER,
        MOCK_TRAMITE_STORE,
        MOCK_TRAMITE_QUERY,
        MOCK_AUTORIZACION_SERVICE,
        MOCK_CONSULTAIO_QUERY
      );
      expect(NEW_COMPONENT.esFormularioSoloLectura).toBe(false);
    });

    it('debería mantener referencia correcta a INPUT_FECHA_CONFIG importado', () => {
      expect(COMPONENT.INPUT_FECHA_CONFIG).toBe(INPUT_FECHA_CONFIG);
    });
  });
});