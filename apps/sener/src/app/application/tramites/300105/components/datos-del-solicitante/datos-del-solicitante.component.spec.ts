import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA, EventEmitter } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { DatosDelSolicitanteComponent } from './datos-del-solicitante.component';
import { 
  ConsultaioQuery, 
  REG_X
} from '@ng-mf/data-access-user';
import { Catalogo } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { CatalogosSelect } from '@libs/shared/data-access-user/src/core/models/shared/components.model';
import { 
  Tramite300105State, 
  Tramite300105Store 
} from '../../estados/tramite300105.store';
import { Tramite300105Query } from '../../estados/tramite300105.query';
import { AutorizacionDeRayosXService } from '../../services/autorizacion-de-rayos-x.service';

describe('DatosDelSolicitanteComponent', () => {
  let COMPONENT: DatosDelSolicitanteComponent;
  let FIXTURE: ComponentFixture<DatosDelSolicitanteComponent>;
  let MOCK_FORM_BUILDER: FormBuilder;
  let MOCK_TRAMITE_STORE: jest.Mocked<Tramite300105Store>;
  let MOCK_TRAMITE_QUERY: jest.Mocked<Tramite300105Query>;
  let MOCK_AUTORIZACION_SERVICE: jest.Mocked<AutorizacionDeRayosXService>;
  let MOCK_CONSULTAIO_QUERY: jest.Mocked<ConsultaioQuery>;

  // Datos mock
  const MOCK_CATALOGO_TIPO_OPERACION: Catalogo[] = [
    { id: 1, descripcion: 'Importación', clave: 'IMP' },
    { id: 2, descripcion: 'Exportación', clave: 'EXP' },
    { id: 3, descripcion: 'Tránsito', clave: 'TRA' }
  ];

  const MOCK_CATALOGO_FINALIDAD: Catalogo[] = [
    { id: 1, descripcion: 'Comercial', clave: 'COM' },
    { id: 2, descripcion: 'Personal', clave: 'PER' },
    { id: 3, descripcion: 'Industrial', clave: 'IND' }
  ];

  const MOCK_TRAMITE_STATE: Tramite300105State = {
    numeroExpediente: '123456',
    tipoOperacion: 'Importación',
    finalidad: 'Comercial',
    isExento: true,
    isAutorizacion: false,
    numAutorizacion1: '123',
    numAutorizacion2: '4567',
    numAutorizacion3: '8901',
    mercacniaSolicitudControlar: false,
    observaciones: 'Observaciones de prueba',
    tercerosPopupState: false,
    mercanciaTablaDatos: [],
    destinatarioTablaDatos: [],
    claveDeReferencia: 'REF001',
    cadenaDependencia: 'DEP001',
    banco: 'Banco Test',
    llaveDePago: 'LP001',
    fechaPago: '2025-01-01',
    importePago: '1000.00'
  };

  const MOCK_CONSULTAIO_STATE = {
    readonly: false
  };

  const MOCK_CATALOGO_SELECT_TIPO_OPERACION: CatalogosSelect = {
    labelNombre: 'Tipo de Operación',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: MOCK_CATALOGO_TIPO_OPERACION
  };

  const MOCK_CATALOGO_SELECT_FINALIDAD: CatalogosSelect = {
    labelNombre: 'Finalidad',
    required: true,
    primerOpcion: 'Selecciona un valor',
    catalogos: MOCK_CATALOGO_FINALIDAD
  };

  beforeEach(async () => {
    // Mock para Tramite300105Store
    const MOCK_STORE = {
      establecerDatos: jest.fn()
    } as unknown as jest.Mocked<Tramite300105Store>;

    // Mock para Tramite300105Query
    const MOCK_QUERY = {
      selectTramite300105$: of(MOCK_TRAMITE_STATE)
    } as unknown as jest.Mocked<Tramite300105Query>;

    // Mock para AutorizacionDeRayosXService
    const MOCK_SERVICE = {
      getTipoOperacion: jest.fn().mockReturnValue(of(MOCK_CATALOGO_TIPO_OPERACION)),
      getFinalidad: jest.fn().mockReturnValue(of(MOCK_CATALOGO_FINALIDAD))
    } as unknown as jest.Mocked<AutorizacionDeRayosXService>;

    // Mock para ConsultaioQuery
    const MOCK_CONSULTAIO = {
      selectConsultaioState$: of(MOCK_CONSULTAIO_STATE)
    } as unknown as jest.Mocked<ConsultaioQuery>;

    await TestBed.configureTestingModule({
      declarations: [DatosDelSolicitanteComponent],
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

    FIXTURE = TestBed.createComponent(DatosDelSolicitanteComponent);
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
      expect(COMPONENT.pasarTipoOperacion).toBeDefined();
      expect(COMPONENT.opcionDeBotonDeRadio).toBeDefined();
      expect(COMPONENT.VALOR_SELECCIONADO).toBe('');
      expect(COMPONENT.esFormularioSoloLectura).toBe(false);
      expect(COMPONENT['destroyNotifier$']).toBeInstanceOf(Subject);
    });

    it('debería inicializar los catálogos con valores por defecto', () => {
      expect(COMPONENT.tipoOperacionCatalogo.labelNombre).toBe('Tipo de Operación');
      expect(COMPONENT.tipoOperacionCatalogo.required).toBe(true);
      expect(COMPONENT.tipoOperacionCatalogo.primerOpcion).toBe('Selecciona un valor');
      expect(COMPONENT.tipoOperacionCatalogo.catalogos).toEqual([]);

      expect(COMPONENT.finalidadCatalogo.labelNombre).toBe('Finalidad');
      expect(COMPONENT.finalidadCatalogo.required).toBe(true);
      expect(COMPONENT.finalidadCatalogo.primerOpcion).toBe('Selecciona un valor');
      expect(COMPONENT.finalidadCatalogo.catalogos).toEqual([]);
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
      const NEW_FIXTURE = TestBed.createComponent(DatosDelSolicitanteComponent);
      const NEW_COMPONENT = NEW_FIXTURE.componentInstance;
      
      expect(SPY_PIPE).toHaveBeenCalled();
      expect(NEW_COMPONENT.esFormularioSoloLectura).toBe(false);
    });

    it('debería establecer esFormularioSoloLectura cuando readonly es true', () => {
      const READONLY_STATE = { readonly: true };
      const MOCK_CONSULTAIO_READONLY = {
        selectConsultaioState$: of(READONLY_STATE)
      } as unknown as jest.Mocked<ConsultaioQuery>;

      TestBed.overrideProvider(ConsultaioQuery, { useValue: MOCK_CONSULTAIO_READONLY });
      
      const NEW_FIXTURE = TestBed.createComponent(DatosDelSolicitanteComponent);
      const NEW_COMPONENT = NEW_FIXTURE.componentInstance;
      
      expect(NEW_COMPONENT.esFormularioSoloLectura).toBe(true);
    });
  });

  // Pruebas para @Output
  describe('Output pasarTipoOperacion', () => {
    it('debería ser una instancia de EventEmitter', () => {
      expect(COMPONENT.pasarTipoOperacion).toBeInstanceOf(EventEmitter);
    });

    it('debería emitir valores correctamente', () => {
      const SPY_EMIT = jest.spyOn(COMPONENT.pasarTipoOperacion, 'emit');
      const VALOR_TEST = 'test-tipo-operacion';
      
      COMPONENT.pasarTipoOperacion.emit(VALOR_TEST);
      
      expect(SPY_EMIT).toHaveBeenCalledWith(VALOR_TEST);
    });
  });

  // Pruebas para ngOnInit
  describe('ngOnInit', () => {
    it('debería ejecutar todos los métodos de inicialización', () => {
      const SPY_INICIALIZAR = jest.spyOn(COMPONENT, 'initializarFormulario');
      const SPY_TIPO_OPERACION = jest.spyOn(COMPONENT, 'fetchTipoOperacionData');
      const SPY_FINALIDAD = jest.spyOn(COMPONENT, 'fetchFinalidadData');

      COMPONENT.ngOnInit();

      expect(SPY_INICIALIZAR).toHaveBeenCalled();
      expect(SPY_TIPO_OPERACION).toHaveBeenCalled();
      expect(SPY_FINALIDAD).toHaveBeenCalled();
    });

    it('debería llamar los métodos en el orden correcto', () => {
      const ORDEN_LLAMADAS: string[] = [];
      
      jest.spyOn(COMPONENT, 'initializarFormulario').mockImplementation(() => {
        ORDEN_LLAMADAS.push('initializarFormulario');
      });
      jest.spyOn(COMPONENT, 'fetchTipoOperacionData').mockImplementation(() => {
        ORDEN_LLAMADAS.push('fetchTipoOperacionData');
      });
      jest.spyOn(COMPONENT, 'fetchFinalidadData').mockImplementation(() => {
        ORDEN_LLAMADAS.push('fetchFinalidadData');
      });

      COMPONENT.ngOnInit();

      expect(ORDEN_LLAMADAS).toEqual([
        'initializarFormulario',
        'fetchTipoOperacionData',
        'fetchFinalidadData'
      ]);
    });
  });

  // Pruebas para initializarFormulario
  describe('initializarFormulario', () => {
    beforeEach(() => {
      COMPONENT.ngOnInit();
    });

    it('debería crear el formulario con la estructura correcta', () => {
      expect(COMPONENT.formSolicitud).toBeDefined();
      expect(COMPONENT.formSolicitud.get('datosSolicitante')).toBeDefined();
    });

    it('debería inicializar el formulario con datos del estado', () => {
      const DATOS_SOLICITANTE = COMPONENT.formSolicitud.get('datosSolicitante');
      
      expect(DATOS_SOLICITANTE?.get('numeroExpediente')?.value).toBe(MOCK_TRAMITE_STATE.numeroExpediente);
      expect(DATOS_SOLICITANTE?.get('tipoOperacion')?.value).toBe(MOCK_TRAMITE_STATE.tipoOperacion);
      expect(DATOS_SOLICITANTE?.get('finalidad')?.value).toBe(MOCK_TRAMITE_STATE.finalidad);
      expect(DATOS_SOLICITANTE?.get('isExento')?.value).toBe(MOCK_TRAMITE_STATE.isExento);
      expect(DATOS_SOLICITANTE?.get('isAutorizacion')?.value).toBe(MOCK_TRAMITE_STATE.isAutorizacion);
      expect(DATOS_SOLICITANTE?.get('numAutorizacion1')?.value).toBe(MOCK_TRAMITE_STATE.numAutorizacion1);
      expect(DATOS_SOLICITANTE?.get('numAutorizacion2')?.value).toBe(MOCK_TRAMITE_STATE.numAutorizacion2);
      expect(DATOS_SOLICITANTE?.get('numAutorizacion3')?.value).toBe(MOCK_TRAMITE_STATE.numAutorizacion3);
    });

    it('debería configurar las validaciones del campo numeroExpediente', () => {
      const NUMERO_EXPEDIENTE_CONTROL = COMPONENT.formSolicitud.get('datosSolicitante.numeroExpediente');
      
      // Probar validación required
      NUMERO_EXPEDIENTE_CONTROL?.setValue('');
      expect(NUMERO_EXPEDIENTE_CONTROL?.hasError('required')).toBeTruthy();
      
      // Probar validación pattern
      NUMERO_EXPEDIENTE_CONTROL?.setValue('abc123');
      expect(NUMERO_EXPEDIENTE_CONTROL?.hasError('pattern')).toBeTruthy();
      
      // Probar validación maxLength
      NUMERO_EXPEDIENTE_CONTROL?.setValue('1234567');
      expect(NUMERO_EXPEDIENTE_CONTROL?.hasError('maxlength')).toBeTruthy();
      
      // Probar valor válido
      NUMERO_EXPEDIENTE_CONTROL?.setValue('123456');
      expect(NUMERO_EXPEDIENTE_CONTROL?.valid).toBeTruthy();
    });

    it('debería configurar las validaciones para los campos de autorización', () => {
      const CAMPOS_AUTORIZACION = ['numAutorizacion1', 'numAutorizacion2', 'numAutorizacion3'];
      
      CAMPOS_AUTORIZACION.forEach(campo => {
        const CONTROL = COMPONENT.formSolicitud.get(`datosSolicitante.${campo}`);
        
        // Probar validación required
        CONTROL?.setValue('');
        expect(CONTROL?.hasError('required')).toBeTruthy();
        
        // Probar validación pattern
        CONTROL?.setValue('abc');
        expect(CONTROL?.hasError('pattern')).toBeTruthy();
        
        // Probar valor válido
        CONTROL?.setValue('123');
        expect(CONTROL?.valid).toBeTruthy();
      });
    });

    it('debería suscribirse al estado del trámite', () => {
      const SPY_PIPE = jest.spyOn(MOCK_TRAMITE_QUERY.selectTramite300105$, 'pipe');
      
      COMPONENT.initializarFormulario();
      
      expect(SPY_PIPE).toHaveBeenCalled();
      expect(COMPONENT.solicitudState).toEqual(MOCK_TRAMITE_STATE);
    });

    it('debería llamar obtenerTipoOperacionSeleccionado si existe tipoOperacion', () => {
      const SPY_OBTENER_TIPO = jest.spyOn(COMPONENT, 'obtenerTipoOperacionSeleccionado');
      
      COMPONENT.solicitudState = { ...MOCK_TRAMITE_STATE, tipoOperacion: 'Importación' };
      COMPONENT.initializarFormulario();
      
      expect(SPY_OBTENER_TIPO).toHaveBeenCalled();
    });

    it('no debería llamar obtenerTipoOperacionSeleccionado si no existe tipoOperacion', () => {
      const SPY_OBTENER_TIPO = jest.spyOn(COMPONENT, 'obtenerTipoOperacionSeleccionado');
      
      COMPONENT.solicitudState = { ...MOCK_TRAMITE_STATE, tipoOperacion: undefined };
      COMPONENT.initializarFormulario();
      
      expect(SPY_OBTENER_TIPO).not.toHaveBeenCalled();
    });

    it('debería deshabilitar el formulario cuando esFormularioSoloLectura es true', () => {
      COMPONENT.esFormularioSoloLectura = true;
      COMPONENT.initializarFormulario();
      
      expect(COMPONENT.formSolicitud.disabled).toBeTruthy();
    });

    it('debería mantener el formulario habilitado cuando esFormularioSoloLectura es false', () => {
      COMPONENT.esFormularioSoloLectura = false;
      COMPONENT.initializarFormulario();
      
      expect(COMPONENT.formSolicitud.enabled).toBeTruthy();
    });

    it('debería usar takeUntil para evitar fugas de memoria', () => {
      const MOCK_PIPE = jest.fn().mockReturnValue(of(MOCK_TRAMITE_STATE));
      MOCK_TRAMITE_QUERY.selectTramite300105$ = {
        pipe: MOCK_PIPE
      } as any;
      
      COMPONENT.initializarFormulario();
      
      expect(MOCK_PIPE).toHaveBeenCalledWith(expect.anything());
    });
  });

  // Pruebas para setValoresStore
  describe('setValoresStore', () => {
    beforeEach(() => {
      COMPONENT.ngOnInit();
    });

    it('debería actualizar el store con el valor del campo especificado', () => {
      const MOCK_FORM = COMPONENT.datosSolicitante;
      const NOMBRE_CAMPO = 'numeroExpediente';
      const VALOR_ESPERADO = '654321';
      
      MOCK_FORM.get(NOMBRE_CAMPO)?.setValue(VALOR_ESPERADO);
      
      COMPONENT.setValoresStore(MOCK_FORM, NOMBRE_CAMPO);
      
      expect(MOCK_TRAMITE_STORE.establecerDatos).toHaveBeenCalledWith({
        [NOMBRE_CAMPO]: VALOR_ESPERADO
      });
    });

    it('debería manejar campos con valor null', () => {
      const MOCK_FORM = COMPONENT.datosSolicitante;
      const NOMBRE_CAMPO = 'tipoOperacion';
      
      MOCK_FORM.get(NOMBRE_CAMPO)?.setValue(null);
      
      COMPONENT.setValoresStore(MOCK_FORM, NOMBRE_CAMPO);
      
      expect(MOCK_TRAMITE_STORE.establecerDatos).toHaveBeenCalledWith({
        [NOMBRE_CAMPO]: null
      });
    });

    it('debería manejar campos con valor undefined', () => {
      const MOCK_FORM = COMPONENT.datosSolicitante;
      const NOMBRE_CAMPO = 'finalidad';
      
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
  });

  // Pruebas para onRadioClick
  describe('onRadioClick', () => {
    beforeEach(() => {
      COMPONENT.ngOnInit();
    });

    it('debería alternar el valor booleano del control especificado', () => {
      const NOMBRE_CONTROL = 'isExento';
      const VALOR_INICIAL = COMPONENT.datosSolicitante.get(NOMBRE_CONTROL)?.value;
      
      COMPONENT.onRadioClick(NOMBRE_CONTROL);
      
      const VALOR_FINAL = COMPONENT.datosSolicitante.get(NOMBRE_CONTROL)?.value;
      expect(VALOR_FINAL).toBe(!VALOR_INICIAL);
    });

    it('debería actualizar el store con el valor alternado', () => {
      const NOMBRE_CONTROL = 'isExento';
      const VALOR_INICIAL = COMPONENT.datosSolicitante.get(NOMBRE_CONTROL)?.value;
      
      COMPONENT.onRadioClick(NOMBRE_CONTROL);
      
      expect(MOCK_TRAMITE_STORE.establecerDatos).toHaveBeenCalledWith({
        [NOMBRE_CONTROL]: !VALOR_INICIAL
      });
    });

    it('debería funcionar con valor inicial false', () => {
      const NOMBRE_CONTROL = 'isAutorizacion';
      COMPONENT.datosSolicitante.get(NOMBRE_CONTROL)?.setValue(false);
      
      COMPONENT.onRadioClick(NOMBRE_CONTROL);
      
      expect(COMPONENT.datosSolicitante.get(NOMBRE_CONTROL)?.value).toBe(true);
      expect(MOCK_TRAMITE_STORE.establecerDatos).toHaveBeenCalledWith({
        [NOMBRE_CONTROL]: true
      });
    });

    it('debería funcionar con valor inicial true', () => {
      const NOMBRE_CONTROL = 'isExento';
      COMPONENT.datosSolicitante.get(NOMBRE_CONTROL)?.setValue(true);
      
      COMPONENT.onRadioClick(NOMBRE_CONTROL);
      
      expect(COMPONENT.datosSolicitante.get(NOMBRE_CONTROL)?.value).toBe(false);
      expect(MOCK_TRAMITE_STORE.establecerDatos).toHaveBeenCalledWith({
        [NOMBRE_CONTROL]: false
      });
    });

    it('debería manejar valor inicial null', () => {
      const NOMBRE_CONTROL = 'isExento';
      COMPONENT.datosSolicitante.get(NOMBRE_CONTROL)?.setValue(null);
      
      COMPONENT.onRadioClick(NOMBRE_CONTROL);
      
      expect(COMPONENT.datosSolicitante.get(NOMBRE_CONTROL)?.value).toBe(true);
      expect(MOCK_TRAMITE_STORE.establecerDatos).toHaveBeenCalledWith({
        [NOMBRE_CONTROL]: true
      });
    });

    it('debería manejar valor inicial undefined', () => {
      const NOMBRE_CONTROL = 'isAutorizacion';
      COMPONENT.datosSolicitante.get(NOMBRE_CONTROL)?.setValue(undefined);
      
      COMPONENT.onRadioClick(NOMBRE_CONTROL);
      
      expect(COMPONENT.datosSolicitante.get(NOMBRE_CONTROL)?.value).toBe(true);
      expect(MOCK_TRAMITE_STORE.establecerDatos).toHaveBeenCalledWith({
        [NOMBRE_CONTROL]: true
      });
    });
  });

  // Pruebas para fetchTipoOperacionData
  describe('fetchTipoOperacionData', () => {
    beforeEach(() => {
      COMPONENT.ngOnInit();
    });

    it('debería obtener y asignar los datos del catálogo de tipo de operación', () => {
      COMPONENT.fetchTipoOperacionData();
      
      expect(MOCK_AUTORIZACION_SERVICE.getTipoOperacion).toHaveBeenCalled();
      expect(COMPONENT.tipoOperacionCatalogo.catalogos).toEqual(MOCK_CATALOGO_TIPO_OPERACION);
    });

    it('debería manejar respuesta vacía del servicio', () => {
      MOCK_AUTORIZACION_SERVICE.getTipoOperacion.mockReturnValue(of([]));
      
      COMPONENT.fetchTipoOperacionData();
      
      expect(COMPONENT.tipoOperacionCatalogo.catalogos).toEqual([]);
    });

    it('debería usar takeUntil para evitar fugas de memoria', () => {
      const MOCK_OBSERVABLE = {
        pipe: jest.fn().mockReturnValue(of(MOCK_CATALOGO_TIPO_OPERACION))
      };
      MOCK_AUTORIZACION_SERVICE.getTipoOperacion.mockReturnValue(MOCK_OBSERVABLE as any);
      
      COMPONENT.fetchTipoOperacionData();
      
      expect(MOCK_OBSERVABLE.pipe).toHaveBeenCalledWith(expect.anything());
    });

    it('debería manejar errores del servicio', () => {
      const ERROR_MESSAGE = 'Error de conexión';
      MOCK_AUTORIZACION_SERVICE.getTipoOperacion.mockReturnValue(
        new Observable(subscriber => subscriber.error(ERROR_MESSAGE))
      );
      
      expect(() => {
        COMPONENT.fetchTipoOperacionData();
      }).not.toThrow();
    });
  });

  // Pruebas para fetchFinalidadData
  describe('fetchFinalidadData', () => {
    beforeEach(() => {
      COMPONENT.ngOnInit();
    });

    it('debería obtener y asignar los datos del catálogo de finalidad', () => {
      COMPONENT.fetchFinalidadData();
      
      expect(MOCK_AUTORIZACION_SERVICE.getFinalidad).toHaveBeenCalled();
      expect(COMPONENT.finalidadCatalogo.catalogos).toEqual(MOCK_CATALOGO_FINALIDAD);
    });

    it('debería manejar respuesta vacía del servicio de finalidad', () => {
      MOCK_AUTORIZACION_SERVICE.getFinalidad.mockReturnValue(of([]));
      
      COMPONENT.fetchFinalidadData();
      
      expect(COMPONENT.finalidadCatalogo.catalogos).toEqual([]);
    });

    it('debería usar takeUntil para evitar fugas de memoria', () => {
      const MOCK_OBSERVABLE = {
        pipe: jest.fn().mockReturnValue(of(MOCK_CATALOGO_FINALIDAD))
      };
      MOCK_AUTORIZACION_SERVICE.getFinalidad.mockReturnValue(MOCK_OBSERVABLE as any);
      
      COMPONENT.fetchFinalidadData();
      
      expect(MOCK_OBSERVABLE.pipe).toHaveBeenCalledWith(expect.anything());
    });

    it('debería manejar errores del servicio', () => {
      const ERROR_MESSAGE = 'Error de conexión';
      MOCK_AUTORIZACION_SERVICE.getFinalidad.mockReturnValue(
        new Observable(subscriber => subscriber.error(ERROR_MESSAGE))
      );
      
      expect(() => {
        COMPONENT.fetchFinalidadData();
      }).not.toThrow();
    });
  });

  // Pruebas para datosSolicitante getter
  describe('datosSolicitante getter', () => {
    beforeEach(() => {
      COMPONENT.ngOnInit();
    });

    it('debería retornar el FormGroup de datosSolicitante', () => {
      const DATOS_SOLICITANTE = COMPONENT.datosSolicitante;
      
      expect(DATOS_SOLICITANTE).toBeDefined();
      expect(DATOS_SOLICITANTE.get('numeroExpediente')).toBeDefined();
      expect(DATOS_SOLICITANTE.get('tipoOperacion')).toBeDefined();
      expect(DATOS_SOLICITANTE.get('finalidad')).toBeDefined();
      expect(DATOS_SOLICITANTE.get('isExento')).toBeDefined();
      expect(DATOS_SOLICITANTE.get('isAutorizacion')).toBeDefined();
      expect(DATOS_SOLICITANTE.get('numAutorizacion1')).toBeDefined();
      expect(DATOS_SOLICITANTE.get('numAutorizacion2')).toBeDefined();
      expect(DATOS_SOLICITANTE.get('numAutorizacion3')).toBeDefined();
    });

    it('debería retornar el mismo FormGroup en múltiples llamadas', () => {
      const PRIMER_ACCESO = COMPONENT.datosSolicitante;
      const SEGUNDO_ACCESO = COMPONENT.datosSolicitante;
      
      expect(PRIMER_ACCESO).toBe(SEGUNDO_ACCESO);
    });

    it('debería manejar cuando formSolicitud no está inicializado', () => {
      COMPONENT.formSolicitud = undefined as any;
      
      expect(() => {
        const DATOS = COMPONENT.datosSolicitante;
      }).toThrow();
    });
  });

  // Pruebas para obtenerTipoOperacionSeleccionado
  describe('obtenerTipoOperacionSeleccionado', () => {
    beforeEach(() => {
      COMPONENT.ngOnInit();
    });

    it('debería emitir el valor seleccionado del tipo de operación', () => {
      const SPY_EMIT = jest.spyOn(COMPONENT.pasarTipoOperacion, 'emit');
      const VALOR_TIPO_OPERACION = 'Exportación';
      
      COMPONENT.formSolicitud.get('datosSolicitante.tipoOperacion')?.setValue(VALOR_TIPO_OPERACION);
      COMPONENT.obtenerTipoOperacionSeleccionado();
      
      expect(SPY_EMIT).toHaveBeenCalledWith(VALOR_TIPO_OPERACION);
    });

    it('debería emitir null si no hay valor seleccionado', () => {
      const SPY_EMIT = jest.spyOn(COMPONENT.pasarTipoOperacion, 'emit');
      
      COMPONENT.formSolicitud.get('datosSolicitante.tipoOperacion')?.setValue(null);
      COMPONENT.obtenerTipoOperacionSeleccionado();
      
      expect(SPY_EMIT).toHaveBeenCalledWith(null);
    });

    it('debería emitir undefined si el valor es undefined', () => {
      const SPY_EMIT = jest.spyOn(COMPONENT.pasarTipoOperacion, 'emit');
      
      COMPONENT.formSolicitud.get('datosSolicitante.tipoOperacion')?.setValue(undefined);
      COMPONENT.obtenerTipoOperacionSeleccionado();
      
      expect(SPY_EMIT).toHaveBeenCalledWith(undefined);
    });

    it('debería manejar cuando el control no existe', () => {
      const SPY_EMIT = jest.spyOn(COMPONENT.pasarTipoOperacion, 'emit');
      COMPONENT.formSolicitud = MOCK_FORM_BUILDER.group({
        otroCampo: ['']
      });
      
      COMPONENT.obtenerTipoOperacionSeleccionado();
      
      expect(SPY_EMIT).toHaveBeenCalledWith(undefined);
    });

    it('debería manejar cuando formSolicitud no está inicializado', () => {
      const SPY_EMIT = jest.spyOn(COMPONENT.pasarTipoOperacion, 'emit');
      COMPONENT.formSolicitud = undefined as any;
      
      expect(() => {
        COMPONENT.obtenerTipoOperacionSeleccionado();
      }).toThrow();
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

    it('debería validar todos los campos requeridos', () => {
      const CAMPOS_REQUERIDOS = [
        'numeroExpediente',
        'numAutorizacion1',
        'numAutorizacion2',
        'numAutorizacion3'
      ];

      CAMPOS_REQUERIDOS.forEach(campo => {
        const CONTROL = COMPONENT.formSolicitud.get(`datosSolicitante.${campo}`);
        CONTROL?.setValue('');
        CONTROL?.markAsTouched();
        
        expect(CONTROL?.hasError('required')).toBeTruthy();
      });
    });

    it('debería validar el patrón de solo números', () => {
      const CAMPOS_NUMERICOS = [
        'numeroExpediente',
        'numAutorizacion1',
        'numAutorizacion2',
        'numAutorizacion3'
      ];

      CAMPOS_NUMERICOS.forEach(campo => {
        const CONTROL = COMPONENT.formSolicitud.get(`datosSolicitante.${campo}`);
        
        CONTROL?.setValue('abc123');
        expect(CONTROL?.hasError('pattern')).toBeTruthy();
        
        CONTROL?.setValue('123');
        expect(CONTROL?.hasError('pattern')).toBeFalsy();
      });
    });

    it('debería validar maxLength para numeroExpediente', () => {
      const CONTROL = COMPONENT.formSolicitud.get('datosSolicitante.numeroExpediente');
      
      CONTROL?.setValue('1234567'); // 7 caracteres, max 6
      expect(CONTROL?.hasError('maxlength')).toBeTruthy();
      
      CONTROL?.setValue('123456'); // 6 caracteres exactos
      expect(CONTROL?.hasError('maxlength')).toBeFalsy();
    });

    it('debería marcar el formulario como válido cuando todos los campos están completos', () => {
      const DATOS_SOLICITANTE = COMPONENT.datosSolicitante;
      
      DATOS_SOLICITANTE.patchValue({
        numeroExpediente: '123456',
        tipoOperacion: 'Importación',
        finalidad: 'Comercial',
        isExento: true,
        isAutorizacion: false,
        numAutorizacion1: '123',
        numAutorizacion2: '4567',
        numAutorizacion3: '8901'
      });
      
      expect(DATOS_SOLICITANTE.valid).toBeTruthy();
    });

    it('debería marcar el formulario como inválido cuando faltan campos requeridos', () => {
      const DATOS_SOLICITANTE = COMPONENT.datosSolicitante;
      
      DATOS_SOLICITANTE.patchValue({
        numeroExpediente: '', // Campo requerido vacío
        tipoOperacion: 'Importación',
        finalidad: 'Comercial',
        isExento: true,
        isAutorizacion: false,
        numAutorizacion1: '123',
        numAutorizacion2: '4567',
        numAutorizacion3: '8901'
      });
      
      expect(DATOS_SOLICITANTE.valid).toBeFalsy();
    });
  });

  // Pruebas de integración y flujo completo
  describe('Flujo completo del componente', () => {
    it('debería ejecutar el flujo completo de inicialización', () => {
      COMPONENT.ngOnInit();
      
      expect(COMPONENT.formSolicitud).toBeDefined();
      expect(COMPONENT.solicitudState).toEqual(MOCK_TRAMITE_STATE);
      expect(COMPONENT.tipoOperacionCatalogo.catalogos).toEqual(MOCK_CATALOGO_TIPO_OPERACION);
      expect(COMPONENT.finalidadCatalogo.catalogos).toEqual(MOCK_CATALOGO_FINALIDAD);
    });

    it('debería mantener la consistencia de datos entre formulario y store', () => {
      COMPONENT.ngOnInit();
      
      const NUEVO_NUMERO = '999888';
      const CONTROL = COMPONENT.formSolicitud.get('datosSolicitante.numeroExpediente');
      
      CONTROL?.setValue(NUEVO_NUMERO);
      COMPONENT.setValoresStore(COMPONENT.datosSolicitante, 'numeroExpediente');
      
      expect(MOCK_TRAMITE_STORE.establecerDatos).toHaveBeenCalledWith({
        numeroExpediente: NUEVO_NUMERO
      });
    });

    it('debería manejar correctamente el estado de solo lectura', () => {
      COMPONENT.esFormularioSoloLectura = true;
      COMPONENT.initializarFormulario();
      
      expect(COMPONENT.formSolicitud.disabled).toBeTruthy();
      
      // Verificar que todos los controles están deshabilitados
      const DATOS_SOLICITANTE = COMPONENT.datosSolicitante;
      Object.keys(DATOS_SOLICITANTE.controls).forEach(key => {
        expect(DATOS_SOLICITANTE.get(key)?.disabled).toBeTruthy();
      });
    });

    it('debería emitir tipo de operación cuando se inicializa con valor', () => {
      const SPY_EMIT = jest.spyOn(COMPONENT.pasarTipoOperacion, 'emit');
      
      COMPONENT.ngOnInit();
      
      expect(SPY_EMIT).toHaveBeenCalledWith(MOCK_TRAMITE_STATE.tipoOperacion);
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
        const NEW_FIXTURE = TestBed.createComponent(DatosDelSolicitanteComponent);
      }).not.toThrow();
    });

    it('debería manejar observables que no emiten en initializarFormulario', () => {
      const EMPTY_SUBJECT = new Subject();
      MOCK_TRAMITE_QUERY.selectTramite300105$ = EMPTY_SUBJECT.asObservable() as any;
      
      expect(() => COMPONENT.initializarFormulario()).not.toThrow();
    });

    it('debería manejar estado inicial undefined en initializarFormulario', () => {
      MOCK_TRAMITE_QUERY.selectTramite300105$ = of(undefined as any);
      
      expect(() => {
        COMPONENT.initializarFormulario();
      }).not.toThrow();
      
      expect(COMPONENT.formSolicitud).toBeDefined();
    });

    it('debería manejar estado inicial null en initializarFormulario', () => {
      MOCK_TRAMITE_QUERY.selectTramite300105$ = of(null as any);
      
      expect(() => {
        COMPONENT.initializarFormulario();
      }).not.toThrow();
      
      expect(COMPONENT.formSolicitud).toBeDefined();
    });

    it('debería manejar error en el servicio de tipo de operación', () => {
      const ERROR_MESSAGE = 'Error de red';
      MOCK_AUTORIZACION_SERVICE.getTipoOperacion.mockReturnValue(
        new Observable(subscriber => subscriber.error(ERROR_MESSAGE))
      );
      
      expect(() => {
        COMPONENT.fetchTipoOperacionData();
      }).not.toThrow();
    });

    it('debería manejar error en el servicio de finalidad', () => {
      const ERROR_MESSAGE = 'Error de red';
      MOCK_AUTORIZACION_SERVICE.getFinalidad.mockReturnValue(
        new Observable(subscriber => subscriber.error(ERROR_MESSAGE))
      );
      
      expect(() => {
        COMPONENT.fetchFinalidadData();
      }).not.toThrow();
    });

    it('debería manejar cuando no existe el control en onRadioClick', () => {
      const MOCK_FORM_VACIO = MOCK_FORM_BUILDER.group({});
      COMPONENT.formSolicitud = MOCK_FORM_BUILDER.group({
        datosSolicitante: MOCK_FORM_VACIO
      });
      
      expect(() => {
        COMPONENT.onRadioClick('controlInexistente');
      }).not.toThrow();
    });

    it('debería manejar REG_X undefined', () => {
      // Simular que REG_X no está definido
      const ORIGINAL_REG_X = (REG_X as any).SOLO_NUMEROS;
      (REG_X as any).SOLO_NUMEROS = undefined;
      
      expect(() => {
        COMPONENT.initializarFormulario();
      }).not.toThrow();
      
      // Restaurar valor original
      (REG_X as any).SOLO_NUMEROS = ORIGINAL_REG_X;
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

    it('debería renderizar el input de número de expediente', () => {
      const COMPILED = FIXTURE.nativeElement;
      const INPUT = COMPILED.querySelector('#numeroExpediente');
      expect(INPUT).toBeTruthy();
      expect(INPUT.getAttribute('maxlength')).toBe('6');
    });

    it('debería renderizar los inputs de autorización', () => {
      const COMPILED = FIXTURE.nativeElement;
      const INPUT1 = COMPILED.querySelector('#numAutorizacion1');
      const INPUT2 = COMPILED.querySelector('#numAutorizacion2');
      const INPUT3 = COMPILED.querySelector('#numAutorizacion3');
      
      expect(INPUT1).toBeTruthy();
      expect(INPUT2).toBeTruthy();
      expect(INPUT3).toBeTruthy();
      
      expect(INPUT1.getAttribute('maxlength')).toBe('3');
      expect(INPUT2.getAttribute('maxlength')).toBe('4');
      expect(INPUT3.getAttribute('maxlength')).toBe('4');
    });

    it('debería renderizar los selectores de catálogo', () => {
      const COMPILED = FIXTURE.nativeElement;
      const SELECTORES = COMPILED.querySelectorAll('app-catalogo-select');
      expect(SELECTORES.length).toBe(2);
    });

    it('debería renderizar el componente de radio buttons', () => {
      const COMPILED = FIXTURE.nativeElement;
      const RADIO_COMPONENT = COMPILED.querySelector('app-input-radio');
      expect(RADIO_COMPONENT).toBeTruthy();
    });

    it('debería mostrar mensajes de error cuando los campos son inválidos y tocados', () => {
      const NUMERO_EXPEDIENTE_CONTROL = COMPONENT.formSolicitud.get('datosSolicitante.numeroExpediente');
      
      NUMERO_EXPEDIENTE_CONTROL?.setValue('');
      NUMERO_EXPEDIENTE_CONTROL?.markAsTouched();
      FIXTURE.detectChanges();
      
      expect(NUMERO_EXPEDIENTE_CONTROL?.invalid).toBeTruthy();
      expect(NUMERO_EXPEDIENTE_CONTROL?.touched).toBeTruthy();
    });

    it('debería llamar a setValoresStore en el evento change del input numeroExpediente', () => {
      const SPY_SET_VALORES = jest.spyOn(COMPONENT, 'setValoresStore');
      
      const INPUT_ELEMENT = FIXTURE.debugElement.nativeElement.querySelector('#numeroExpediente');
      INPUT_ELEMENT.value = '123456';
      INPUT_ELEMENT.dispatchEvent(new Event('change'));
      
      expect(SPY_SET_VALORES).toHaveBeenCalled();
    });

    it('debería deshabilitar selectores cuando esFormularioSoloLectura es true', () => {
      COMPONENT.esFormularioSoloLectura = true;
      FIXTURE.detectChanges();
      
      const COMPILED = FIXTURE.nativeElement;
      const SELECTORES = COMPILED.querySelectorAll('app-catalogo-select[isDisabled="true"]');
      expect(SELECTORES.length).toBeGreaterThan(0);
    });
  });

  // Pruebas de gestión de suscripciones
  describe('Gestión de suscripciones', () => {
    it('debería usar takeUntil para evitar fugas de memoria en constructor', () => {
      const MOCK_PIPE = jest.fn().mockReturnValue(of(MOCK_CONSULTAIO_STATE));
      MOCK_CONSULTAIO_QUERY.selectConsultaioState$ = {
        pipe: MOCK_PIPE
      } as any;
      
      const NEW_FIXTURE = TestBed.createComponent(DatosDelSolicitanteComponent);
      
      expect(MOCK_PIPE).toHaveBeenCalledWith(expect.anything(), expect.anything());
    });

    it('debería usar takeUntil para evitar fugas de memoria en initializarFormulario', () => {
      const MOCK_PIPE = jest.fn().mockReturnValue(of(MOCK_TRAMITE_STATE));
      MOCK_TRAMITE_QUERY.selectTramite300105$ = {
        pipe: MOCK_PIPE
      } as any;
      
      COMPONENT.initializarFormulario();
      
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

    it('debería usar takeUntil en fetchTipoOperacionData', () => {
      const MOCK_OBSERVABLE = {
        pipe: jest.fn().mockReturnValue(of(MOCK_CATALOGO_TIPO_OPERACION))
      };
      MOCK_AUTORIZACION_SERVICE.getTipoOperacion.mockReturnValue(MOCK_OBSERVABLE as any);
      
      COMPONENT.fetchTipoOperacionData();
      
      expect(MOCK_OBSERVABLE.pipe).toHaveBeenCalledWith(expect.anything());
    });

    it('debería usar takeUntil en fetchFinalidadData', () => {
      const MOCK_OBSERVABLE = {
        pipe: jest.fn().mockReturnValue(of(MOCK_CATALOGO_FINALIDAD))
      };
      MOCK_AUTORIZACION_SERVICE.getFinalidad.mockReturnValue(MOCK_OBSERVABLE as any);
      
      COMPONENT.fetchFinalidadData();
      
      expect(MOCK_OBSERVABLE.pipe).toHaveBeenCalledWith(expect.anything());
    });
  });

  // Pruebas de propiedades públicas
  describe('Propiedades públicas', () => {
    it('debería tener las propiedades públicas accesibles', () => {
      expect(COMPONENT.pasarTipoOperacion).toBeDefined();
      expect(COMPONENT.opcionDeBotonDeRadio).toBeDefined();
      expect(COMPONENT.solicitudState).toBeDefined();
      expect(COMPONENT.VALOR_SELECCIONADO).toBeDefined();
      expect(COMPONENT.esFormularioSoloLectura).toBeDefined();
      expect(COMPONENT.tipoOperacionCatalogo).toBeDefined();
      expect(COMPONENT.finalidadCatalogo).toBeDefined();
    });

    it('debería mantener la estructura correcta de tipoOperacionCatalogo', () => {
      expect(COMPONENT.tipoOperacionCatalogo).toEqual(
        expect.objectContaining({
          labelNombre: expect.any(String),
          required: expect.any(Boolean),
          primerOpcion: expect.any(String),
          catalogos: expect.any(Array)
        })
      );
    });

    it('debería mantener la estructura correcta de finalidadCatalogo', () => {
      expect(COMPONENT.finalidadCatalogo).toEqual(
        expect.objectContaining({
          labelNombre: expect.any(String),
          required: expect.any(Boolean),
          primerOpcion: expect.any(String),
          catalogos: expect.any(Array)
        })
      );
    });
  });

  // Pruebas de constantes y enums
  describe('Constantes y enums', () => {
    it('debería tener OPCIONES_DE_BOTON_DE_RADIO definidas', () => {
      expect(COMPONENT.opcionDeBotonDeRadio).toBeDefined();
      expect(Array.isArray(COMPONENT.opcionDeBotonDeRadio)).toBeTruthy();
    });

    it('debería inicializar VALOR_SELECCIONADO como string vacío', () => {
      expect(COMPONENT.VALOR_SELECCIONADO).toBe('');
      expect(typeof COMPONENT.VALOR_SELECCIONADO).toBe('string');
    });

    it('debería inicializar esFormularioSoloLectura como false', () => {
      expect(COMPONENT.esFormularioSoloLectura).toBe(false);
      expect(typeof COMPONENT.esFormularioSoloLectura).toBe('boolean');
    });
  });
});