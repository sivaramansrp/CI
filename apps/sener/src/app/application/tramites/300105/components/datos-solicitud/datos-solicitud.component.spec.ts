import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { DatosSolicitudComponent } from './datos-solicitud.component';
import {
  ConsultaioQuery,
  ConsultaioState,
  Catalogo,
  CrosslistComponent,
  CategoriaMensaje,
  TipoNotificacionEnum,
  TablaSeleccion
} from '@ng-mf/data-access-user';
import { 
  ConfiguracionItem,
  SerieConfiguracionItem 
} from '../../enum/mercancia-tabla.enum';
import { CrosslistBoton } from '../../enum/botons.enum';
import { Tramite300105State, Tramite300105Store } from '../../estados/tramite300105.store';
import { Tramite300105Query } from '../../estados/tramite300105.query';
import { AutorizacionDeRayosXService } from '../../services/autorizacion-de-rayos-x.service';

describe('DatosSolicitudComponent', () => {
  let component: DatosSolicitudComponent;
  let fixture: ComponentFixture<DatosSolicitudComponent>;
  let mockAutorizacionDeRayosXService: jest.Mocked<AutorizacionDeRayosXService>;
  let mockTramite300105Store: jest.Mocked<Tramite300105Store>;
  let mockTramite300105Query: jest.Mocked<Tramite300105Query>;
  let mockConsultaioQuery: jest.Mocked<ConsultaioQuery>;
  let mockCrosslistComponent: jest.Mocked<CrosslistComponent>;
  let formBuilder: FormBuilder;

  // Datos mock
  const MOCK_UNIDAD_MEDIDA_VOLTAJE: Catalogo[] = [
    { id: 1, descripcion: 'Voltios (V)', clave: 'V' },
    { id: 2, descripcion: 'Kilovoltios (kV)', clave: 'kV' }
  ];

  const MOCK_UNIDAD_MEDIDA_CORRIENTE: Catalogo[] = [
    { id: 1, descripcion: 'Amperios (A)', clave: 'A' },
    { id: 2, descripcion: 'Miliamperios (mA)', clave: 'mA' }
  ];

  const MOCK_FRACCION_ARANCELARIA: Catalogo[] = [
    { id: 1, descripcion: '90221900', clave: 'FRAC1' },
    { id: 2, descripcion: '90221200', clave: 'FRAC2' }
  ];

  const MOCK_FRACCION_ARANCELARIA_DESCRIPCION: Catalogo[] = [
    { id: 1, descripcion: 'Equipos de Rayos X para uso médico' },
    { id: 2, descripcion: 'Equipos de Rayos X para uso industrial' }
  ];

  const MOCK_MERCANCIA_DATOS: ConfiguracionItem[] = [
    {
      id: 1,
      marca: 'Siemens',
      modelo: 'X-1000',
      serie: 'ABC123',
      voltaje: '220',
      unidadMedidaVoltaje: 'Voltios (V)',
      corriente: '15',
      unidadMedidaCorriente: 'Amperios (A)',
      numEquipos: '2',
      fraccionArancelaria: '90221900',
      fraccionDescripcion: 'Equipos de Rayos X para uso médico'
    },
    {
      id: 2,
      marca: 'GE',
      modelo: 'RX-2000',
      serie: 'XYZ789',
      voltaje: '110',
      unidadMedidaVoltaje: 'Voltios (V)',
      corriente: '10',
      unidadMedidaCorriente: 'Miliamperios (mA)',
      numEquipos: '1',
      fraccionArancelaria: '90221200',
      fraccionDescripcion: 'Equipos de Rayos X para uso industrial'
    }
  ];

  const MOCK_TRAMITE300105_STATE: Tramite300105State = {
    mercanciaTablaDatos: MOCK_MERCANCIA_DATOS,
    observaciones: 'Observaciones de prueba',
    // Agregar otras propiedades según sea necesario
  } as Tramite300105State;

  const MOCK_CONSULTAIO_STATE: ConsultaioState = {
    readonly: false,
    // Agregar otras propiedades según sea necesario
  } as ConsultaioState;

  const MOCK_CROSSLIST_BOTONES: CrosslistBoton[] = [
    { btnNombre: 'Agregar', class: 'btn-agregar', funcion: () => console.log('Agregar') },
    { btnNombre: 'Eliminar', class: 'btn-eliminar', funcion: () => console.log('Eliminar') }
  ];

  beforeEach(async () => {
    // Mock para AutorizacionDeRayosXService
    mockAutorizacionDeRayosXService = {
      unidadMedidaVoltaje: MOCK_UNIDAD_MEDIDA_VOLTAJE,
      unidadMedidaCorriente: MOCK_UNIDAD_MEDIDA_CORRIENTE,
      fraccionArancelaria: MOCK_FRACCION_ARANCELARIA,
      fraccionArancelariaDescripcion: MOCK_FRACCION_ARANCELARIA_DESCRIPCION,
      inicializaMercanciaDatosCatalogos: jest.fn()
    } as unknown as jest.Mocked<AutorizacionDeRayosXService>;

    // Mock para Tramite300105Store
    mockTramite300105Store = {
      setMercanciaTablaDatos: jest.fn(),
      establecerDatos: jest.fn()
    } as unknown as jest.Mocked<Tramite300105Store>;

    // Mock para Tramite300105Query
    mockTramite300105Query = {
      selectTramite300105$: of(MOCK_TRAMITE300105_STATE)
    } as unknown as jest.Mocked<Tramite300105Query>;

    // Mock para ConsultaioQuery
    mockConsultaioQuery = {
      selectConsultaioState$: of(MOCK_CONSULTAIO_STATE)
    } as unknown as jest.Mocked<ConsultaioQuery>;

    // Mock para CrosslistComponent
    mockCrosslistComponent = {
      // Propiedades necesarias del componente
    } as unknown as jest.Mocked<CrosslistComponent>;

    // Mock para OBTENER_BOTONES_CROSSLIST
    jest.doMock('../../enum/botons.enum', () => ({
      OBTENER_BOTONES_CROSSLIST: jest.fn(() => MOCK_CROSSLIST_BOTONES)
    }));

    await TestBed.configureTestingModule({
      declarations: [DatosSolicitudComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: AutorizacionDeRayosXService, useValue: mockAutorizacionDeRayosXService },
        { provide: Tramite300105Store, useValue: mockTramite300105Store },
        { provide: Tramite300105Query, useValue: mockTramite300105Query },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosSolicitudComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
  });

  // Pruebas de inicialización y constructor
  describe('Inicialización del componente', () => {
    it('debería crear el componente', () => {
      expect(component).toBeTruthy();
    });

    it('debería inicializar las propiedades con valores por defecto', () => {
      expect(component.listaOriginalAduanas).toEqual([]);
      expect(component.listaSeleccionadaAduanas).toEqual([]);
      expect(component.listaOriginalMovimientos).toEqual([]);
      expect(component.listSeleccionadaMovimientos).toEqual([]);
      expect(component.tipoSeleccionTabla).toBe(TablaSeleccion.CHECKBOX);
      expect(component.enableModficarBoton).toBe(false);
      expect(component.mostrarModalDatosMercancia).toBe(false);
      expect(component.mostrarPopupSeleccionMultiple).toBe(false);
      expect(component.multipleSeleccionPopupAbierto).toBe(false);
      expect(component.multipleSeleccionPopupCerrado).toBe(true);
      expect(component.confirmEliminarPopupAbierto).toBe(false);
      expect(component.confirmEliminarPopupCerrado).toBe(true);
      expect(component.serieAgregadaPopupAbierto).toBe(false);
      expect(component.mercanciaAgregadaPopupAbierto).toBe(false);
      expect(component.enableEliminarBoton).toBe(false);
      expect(component.esOperacionDeActualizacion).toBe(false);
      expect(component.esFormularioSoloLectura).toBe(false);
      expect(component['notificadorDestruccion$']).toBeInstanceOf(Subject);
    });

    it('debería inyectar correctamente los servicios en el constructor', () => {
      expect(component.autorizacionDeRayosXService).toBeDefined();
      expect(component['tramite300105Store']).toBeDefined();
      expect(component['tramite300105Query']).toBeDefined();
      expect(component['formBuilder']).toBeDefined();
      expect(component['consultaioQuery']).toBeDefined();
    });

    it('debería suscribirse al estado de consultaio en el constructor', () => {
      const SPY = jest.spyOn(mockConsultaioQuery.selectConsultaioState$, 'pipe');
      
      // Crear nuevo componente para activar constructor
      const NEW_FIXTURE = TestBed.createComponent(DatosSolicitudComponent);
      const NEW_COMPONENT = NEW_FIXTURE.componentInstance;
      
      expect(SPY).toHaveBeenCalled();
      expect(NEW_COMPONENT.esFormularioSoloLectura).toBe(true); // readonly || true
    });

    it('debería establecer esFormularioSoloLectura cuando readonly es true', () => {
      const READONLY_STATE = { ...MOCK_CONSULTAIO_STATE, readonly: true };
      mockConsultaioQuery.selectConsultaioState$ = of(READONLY_STATE);
      
      const NEW_FIXTURE = TestBed.createComponent(DatosSolicitudComponent);
      const NEW_COMPONENT = NEW_FIXTURE.componentInstance;
      
      expect(NEW_COMPONENT.esFormularioSoloLectura).toBe(true);
    });
  });

  // Pruebas para @Input
  describe('Input tipoOperacionSeleccionado', () => {
    it('debería aceptar un valor string', () => {
      component.tipoOperacionSeleccionado = 'exportacion';
      expect(component.tipoOperacionSeleccionado).toBe('exportacion');
    });

    it('debería aceptar un valor numérico', () => {
      component.tipoOperacionSeleccionado = 1;
      expect(component.tipoOperacionSeleccionado).toBe(1);
    });

    it('debería manejar valor undefined', () => {
      component.tipoOperacionSeleccionado = undefined as any;
      expect(component.tipoOperacionSeleccionado).toBeUndefined();
    });
  });

  // Pruebas para ngOnInit
  describe('ngOnInit', () => {
    it('debería suscribirse al estado del trámite y actualizar datos', () => {
      component.ngOnInit();
      
      expect(component.estadoSolicitud300105).toEqual(MOCK_TRAMITE300105_STATE);
      expect(component.datosTablaMercancia).toEqual(MOCK_MERCANCIA_DATOS);
    });

    it('debería configurar los botones de movimientos', () => {
      component.ngOnInit();
      
      expect(component.botonesMovimientos).toEqual(MOCK_CROSSLIST_BOTONES);
    });

    it('debería crear el formulario de solicitud con observaciones', () => {
      component.ngOnInit();
      
      expect(component.formularioSolicitud).toBeDefined();
      expect(component.formularioSolicitud.get('observaciones')?.value).toBe('Observaciones de prueba');
    });

    it('debería establecer validador maxLength para observaciones', () => {
      component.ngOnInit();
      
      const OBSERVACIONES_CONTROL = component.formularioSolicitud.get('observaciones');
      const TEXTO_LARGO = 'a'.repeat(501); // Excede maxLength(500)
      OBSERVACIONES_CONTROL?.setValue(TEXTO_LARGO);
      
      expect(OBSERVACIONES_CONTROL?.hasError('maxlength')).toBe(true);
    });

    it('debería deshabilitar formulario cuando esFormularioSoloLectura es true', () => {
      component.esFormularioSoloLectura = true;
      
      component.ngOnInit();
      
      expect(component.formularioSolicitud.disabled).toBe(true);
    });

    it('no debería deshabilitar formulario cuando esFormularioSoloLectura es false', () => {
      component.esFormularioSoloLectura = false;
      
      component.ngOnInit();
      
      expect(component.formularioSolicitud.disabled).toBe(false);
    });

    it('debería usar takeUntil para evitar fugas de memoria', () => {
      const MOCK_PIPE = jest.fn().mockReturnValue(of(MOCK_TRAMITE300105_STATE));
      mockTramite300105Query.selectTramite300105$ = {
        pipe: MOCK_PIPE
      } as any;
      
      component.ngOnInit();
      
      expect(MOCK_PIPE).toHaveBeenCalledWith(expect.anything());
    });
  });

  // Pruebas para guardarObservaciones
  describe('guardarObservaciones', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('debería guardar el valor de observaciones en el store', () => {
      const OBSERVACIONES_VALOR = 'Nueva observación de prueba';
      component.formularioSolicitud.get('observaciones')?.setValue(OBSERVACIONES_VALOR);
      
      component.guardarObservaciones();
      
      expect(mockTramite300105Store.establecerDatos).toHaveBeenCalledWith({
        observaciones: OBSERVACIONES_VALOR
      });
    });

    it('debería manejar valor null del formulario', () => {
      component.formularioSolicitud.get('observaciones')?.setValue(null);
      
      component.guardarObservaciones();
      
      expect(mockTramite300105Store.establecerDatos).toHaveBeenCalledWith({
        observaciones: null
      });
    });

    it('debería manejar valor undefined del formulario', () => {
      component.formularioSolicitud.get('observaciones')?.setValue(undefined);
      
      component.guardarObservaciones();
      
      expect(mockTramite300105Store.establecerDatos).toHaveBeenCalledWith({
        observaciones: undefined
      });
    });

    it('no debería fallar si el control observaciones no existe', () => {
      component.formularioSolicitud = formBuilder.group({
        otroCampo: ['']
      });
      
      expect(() => component.guardarObservaciones()).not.toThrow();
    });
  });

  // Pruebas para crearNuevoFormularioMercancia
  describe('crearNuevoFormularioMercancia', () => {
    it('debería crear formulario con datos por defecto cuando no se proporcionan datos', () => {
      component.crearNuevoFormularioMercancia();
      
      expect(component.formularioMercancia).toBeDefined();
      expect(component.formularioMercancia.get('id')?.value).toBe(0);
      expect(component.formularioMercancia.get('marca')?.value).toBe('');
      expect(component.formularioMercancia.get('modelo')?.value).toBe('');
      expect(component.formularioMercancia.get('serie')?.value).toBe('');
      expect(component.formularioMercancia.get('voltaje')?.value).toBe('');
      expect(component.formularioMercancia.get('unidadMedidaVoltaje')?.value).toBe('');
      expect(component.formularioMercancia.get('corriente')?.value).toBe('');
      expect(component.formularioMercancia.get('unidadMedidaCorriente')?.value).toBe('');
      expect(component.formularioMercancia.get('numEquipos')?.value).toBe('');
      expect(component.formularioMercancia.get('fraccionArancelaria')?.value).toBe('');
      expect(component.formularioMercancia.get('fraccionDescripcion')?.value).toBe('');
    });

    it('debería crear formulario con datos proporcionados', () => {
      const DATOS_PRUEBA: ConfiguracionItem = {
        id: 5,
        marca: 'Test Marca',
        modelo: 'Test Modelo',
        serie: 'Test Serie',
        voltaje: '220',
        unidadMedidaVoltaje: 'V',
        corriente: '15',
        unidadMedidaCorriente: 'A',
        numEquipos: '3',
        fraccionArancelaria: '90221900',
        fraccionDescripcion: 'Test Descripción'
      };
      
      component.crearNuevoFormularioMercancia(DATOS_PRUEBA);
      
      expect(component.formularioMercancia.get('id')?.value).toBe(5);
      expect(component.formularioMercancia.get('marca')?.value).toBe('Test Marca');
      expect(component.formularioMercancia.get('modelo')?.value).toBe('Test Modelo');
      expect(component.formularioMercancia.get('serie')?.value).toBe('Test Serie');
      expect(component.formularioMercancia.get('voltaje')?.value).toBe('220');
      expect(component.formularioMercancia.get('numEquipos')?.value).toBe('3');
    });

    it('debería establecer validadores requeridos y maxLength para todos los campos', () => {
      component.crearNuevoFormularioMercancia();
      
      const CAMPOS_REQUERIDOS = [
        'marca', 'modelo', 'serie', 'voltaje', 'unidadMedidaVoltaje', 
        'corriente', 'unidadMedidaCorriente', 'numEquipos', 'fraccionArancelaria', 'fraccionDescripcion'
      ];
      
      CAMPOS_REQUERIDOS.forEach(CAMPO => {
        const CONTROL = component.formularioMercancia.get(CAMPO);
        CONTROL?.setValue('');
        expect(CONTROL?.hasError('required')).toBe(true);
      });
    });

    it('debería validar maxLength para campos específicos', () => {
      component.crearNuevoFormularioMercancia();
      
      // Probar marca (maxLength: 50)
      const MARCA_CONTROL = component.formularioMercancia.get('marca');
      MARCA_CONTROL?.setValue('a'.repeat(51));
      expect(MARCA_CONTROL?.hasError('maxlength')).toBe(true);
      
      // Probar modelo (maxLength: 100)
      const MODELO_CONTROL = component.formularioMercancia.get('modelo');
      MODELO_CONTROL?.setValue('a'.repeat(101));
      expect(MODELO_CONTROL?.hasError('maxlength')).toBe(true);
      
      // Probar serie (maxLength: 150)
      const SERIE_CONTROL = component.formularioMercancia.get('serie');
      SERIE_CONTROL?.setValue('a'.repeat(151));
      expect(SERIE_CONTROL?.hasError('maxlength')).toBe(true);
      
      // Probar voltaje (maxLength: 11)
      const VOLTAJE_CONTROL = component.formularioMercancia.get('voltaje');
      VOLTAJE_CONTROL?.setValue('a'.repeat(12));
      expect(VOLTAJE_CONTROL?.hasError('maxlength')).toBe(true);
      
      // Probar numEquipos (maxLength: 2)
      const NUM_EQUIPOS_CONTROL = component.formularioMercancia.get('numEquipos');
      NUM_EQUIPOS_CONTROL?.setValue('123');
      expect(NUM_EQUIPOS_CONTROL?.hasError('maxlength')).toBe(true);
    });

    it('debería deshabilitar el campo fraccionDescripcion', () => {
      component.crearNuevoFormularioMercancia();
      
      const FRACCION_DESCRIPCION_CONTROL = component.formularioMercancia.get('fraccionDescripcion');
      expect(FRACCION_DESCRIPCION_CONTROL?.disabled).toBe(true);
    });

    it('debería combinar datos por defecto con datos proporcionados', () => {
      const DATOS_PARCIALES = {
        marca: 'Solo Marca',
        voltaje: '110'
      };
      
      component.crearNuevoFormularioMercancia(DATOS_PARCIALES as any);
      
      expect(component.formularioMercancia.get('marca')?.value).toBe('Solo Marca');
      expect(component.formularioMercancia.get('voltaje')?.value).toBe('110');
      expect(component.formularioMercancia.get('modelo')?.value).toBe(''); // Valor por defecto
      expect(component.formularioMercancia.get('id')?.value).toBe(0); // Valor por defecto
    });
  });

  // Pruebas para manejarCambioFraccionArancelaria
  describe('manejarCambioFraccionArancelaria', () => {
    beforeEach(() => {
      component.crearNuevoFormularioMercancia();
    });

    it('debería actualizar fraccionDescripcion cuando encuentra la fracción', () => {
      const EVENT_CATALOGO: Catalogo = {
        id: 1,
        descripcion: '1',
        clave: 'test'
      };
      
      component.manejarCambioFraccionArancelaria(EVENT_CATALOGO);
      
      expect(component.formularioMercancia.get('fraccionDescripcion')?.value).toBe('Equipos de Rayos X para uso médico');
    });

    it('debería manejar cuando no encuentra la fracción arancelaria', () => {
      const EVENT_CATALOGO: Catalogo = {
        id: 999,
        descripcion: '999',
        clave: 'inexistente'
      };
      
      component.manejarCambioFraccionArancelaria(EVENT_CATALOGO);
      
      expect(component.formularioMercancia.get('fraccionDescripcion')?.value).toBeUndefined();
    });

    it('debería manejar descripción como string numérico', () => {
      const EVENT_CATALOGO: Catalogo = {
        id: 2,
        descripcion: '2',
        clave: 'test'
      };
      
      component.manejarCambioFraccionArancelaria(EVENT_CATALOGO);
      
      expect(component.formularioMercancia.get('fraccionDescripcion')?.value).toBe('Equipos de Rayos X para uso industrial');
    });

    it('no debería fallar si fraccionDescripcion control no existe', () => {
      // Crear formulario sin fraccionDescripcion
      component.formularioMercancia = formBuilder.group({
        otroCampo: ['']
      });
      
      const EVENT_CATALOGO: Catalogo = {
        id: 1,
        descripcion: '1',
        clave: 'test'
      };
      
      expect(() => component.manejarCambioFraccionArancelaria(EVENT_CATALOGO)).not.toThrow();
    });
  });

  // Pruebas para manejarFilaSeleccionada
  describe('manejarFilaSeleccionada', () => {
    it('debería deshabilitar botones cuando no hay filas seleccionadas', () => {
      component.manejarFilaSeleccionada([]);
      
      expect(component.enableModficarBoton).toBe(false);
      expect(component.enableEliminarBoton).toBe(false);
    });

    it('debería habilitar botones y actualizar datos cuando hay una fila seleccionada', () => {
      const FILA_SELECCIONADA = [MOCK_MERCANCIA_DATOS[0]];
      
      component.manejarFilaSeleccionada(FILA_SELECCIONADA);
      
      expect(component.enableModficarBoton).toBe(true);
      expect(component.enableEliminarBoton).toBe(true);
      expect(component.listaFilaSeleccionadaMercancia).toEqual(FILA_SELECCIONADA);
      expect(component.filaSeleccionadaMercancia).toEqual(MOCK_MERCANCIA_DATOS[0]);
    });

    it('debería seleccionar la última fila cuando hay múltiples filas', () => {
      component.manejarFilaSeleccionada(MOCK_MERCANCIA_DATOS);
      
      expect(component.filaSeleccionadaMercancia).toEqual(MOCK_MERCANCIA_DATOS[1]); // Última fila
      expect(component.listaFilaSeleccionadaMercancia).toEqual(MOCK_MERCANCIA_DATOS);
    });

    it('debería mantener todas las filas seleccionadas en la lista', () => {
      const FILAS_MULTIPLES = [MOCK_MERCANCIA_DATOS[0], MOCK_MERCANCIA_DATOS[1]];
      
      component.manejarFilaSeleccionada(FILAS_MULTIPLES);
      
      expect(component.listaFilaSeleccionadaMercancia).toEqual(FILAS_MULTIPLES);
      expect(component.listaFilaSeleccionadaMercancia.length).toBe(2);
    });
  });

  // Pruebas para actualizarFilaSeleccionada
  describe('actualizarFilaSeleccionada', () => {
    beforeEach(() => {
      component.datosTablaMercancia = MOCK_MERCANCIA_DATOS;
      component.filaSeleccionadaMercancia = { ...MOCK_MERCANCIA_DATOS[0] };
    });

    it('debería actualizar la fila seleccionada con datos más recientes', () => {
      // Modificar datos en la tabla
      component.datosTablaMercancia[0].marca = 'Marca Actualizada';
      
      component.actualizarFilaSeleccionada();
      
      expect(component.filaSeleccionadaMercancia.marca).toBe('Marca Actualizada');
    });

    it('no debería actualizar si no encuentra la fila', () => {
      component.filaSeleccionadaMercancia = { id: 999 } as any;
      const ORIGINAL_FILA = { ...component.filaSeleccionadaMercancia };
      
      component.actualizarFilaSeleccionada();
      
      expect(component.filaSeleccionadaMercancia).toEqual(ORIGINAL_FILA);
    });

    it('debería crear una copia independiente de los datos', () => {
      component.actualizarFilaSeleccionada();
      
      // Modificar la fila seleccionada no debería afectar los datos originales
      component.filaSeleccionadaMercancia.marca = 'Modificado';
      
      expect(component.datosTablaMercancia[0].marca).not.toBe('Modificado');
    });
  });

  // Pruebas para modificarItemMercancia
  describe('modificarItemMercancia', () => {
    beforeEach(() => {
      component.datosTablaMercancia = MOCK_MERCANCIA_DATOS;
      jest.spyOn(component, 'actualizarFilaSeleccionada');
      jest.spyOn(component, 'crearNuevoFormularioMercancia');
      jest.spyOn(component, 'alternarModalMercancia');
      jest.spyOn(component, 'abrirMultipleSeleccionPopup');
    });

    it('debería modificar item cuando hay una sola fila seleccionada', () => {
      component.listaFilaSeleccionadaMercancia = [MOCK_MERCANCIA_DATOS[0]];
      component.filaSeleccionadaMercancia = MOCK_MERCANCIA_DATOS[0];
      
      component.modificarItemMercancia();
      
      expect(component.actualizarFilaSeleccionada).toHaveBeenCalled();
      expect(component.esOperacionDeActualizacion).toBe(true);
      expect(component.crearNuevoFormularioMercancia).toHaveBeenCalled();
      expect(component.alternarModalMercancia).toHaveBeenCalled();
    });

    it('debería abrir popup de selección múltiple cuando hay múltiples filas', () => {
      component.listaFilaSeleccionadaMercancia = MOCK_MERCANCIA_DATOS;
      
      component.modificarItemMercancia();
      
      expect(component.abrirMultipleSeleccionPopup).toHaveBeenCalled();
      expect(component.esOperacionDeActualizacion).toBe(false);
    });

    it('debería convertir correctamente los índices de catálogos', () => {
      component.listaFilaSeleccionadaMercancia = [MOCK_MERCANCIA_DATOS[0]];
      component.filaSeleccionadaMercancia = MOCK_MERCANCIA_DATOS[0];
      
      component.modificarItemMercancia();
      
      // Verificar que se llamó con los datos convertidos
      expect(component.crearNuevoFormularioMercancia).toHaveBeenCalledWith(
        expect.objectContaining({
          id: MOCK_MERCANCIA_DATOS[0].id,
          marca: MOCK_MERCANCIA_DATOS[0].marca,
          modelo: MOCK_MERCANCIA_DATOS[0].modelo,
          serie: MOCK_MERCANCIA_DATOS[0].serie,
          voltaje: MOCK_MERCANCIA_DATOS[0].voltaje,
          corriente: MOCK_MERCANCIA_DATOS[0].corriente,
          numEquipos: MOCK_MERCANCIA_DATOS[0].numEquipos,
          unidadMedidaVoltaje: expect.any(String), // Índice convertido
          unidadMedidaCorriente: expect.any(String), // Índice convertido
          fraccionArancelaria: expect.any(String), // Índice convertido
          fraccionDescripcion: expect.any(String) // Descripción encontrada
        })
      );
    });

    it('debería encontrar la descripción de la fracción arancelaria', () => {
      component.listaFilaSeleccionadaMercancia = [MOCK_MERCANCIA_DATOS[0]];
      component.filaSeleccionadaMercancia = MOCK_MERCANCIA_DATOS[0];
      
      component.modificarItemMercancia();
      
      expect(component.crearNuevoFormularioMercancia).toHaveBeenCalledWith(
        expect.objectContaining({
          fraccionDescripcion: 'Equipos de Rayos X para uso médico'
        })
      );
    });

    it('debería manejar cuando no encuentra la fracción arancelaria descripción', () => {
      const FILA_CON_FRACCION_INEXISTENTE = {
        ...MOCK_MERCANCIA_DATOS[0],
        fraccionArancelaria: '999'
      };
      component.listaFilaSeleccionadaMercancia = [FILA_CON_FRACCION_INEXISTENTE];
      component.filaSeleccionadaMercancia = FILA_CON_FRACCION_INEXISTENTE;
      
      component.modificarItemMercancia();
      
      expect(component.crearNuevoFormularioMercancia).toHaveBeenCalledWith(
        expect.objectContaining({
          fraccionDescripcion: '' // Valor por defecto cuando no encuentra
        })
      );
    });
  });

  // Pruebas para confirmEliminarMercanciaItem
  describe('confirmEliminarMercanciaItem', () => {
    beforeEach(() => {
      jest.spyOn(component, 'abrirElimninarConfirmationopup');
    });

    it('debería abrir popup de confirmación cuando hay filas seleccionadas', () => {
      component.listaFilaSeleccionadaMercancia = [MOCK_MERCANCIA_DATOS[0]];
      
      component.confirmEliminarMercanciaItem();
      
      expect(component.abrirElimninarConfirmationopup).toHaveBeenCalled();
    });

    it('no debería hacer nada cuando no hay filas seleccionadas', () => {
      component.listaFilaSeleccionadaMercancia = [];
      
      component.confirmEliminarMercanciaItem();
      
      expect(component.abrirElimninarConfirmationopup).not.toHaveBeenCalled();
    });
  });

  // Pruebas para eliminarMercanciaItem
  describe('eliminarMercanciaItem', () => {
    beforeEach(() => {
      component.datosTablaMercancia = [...MOCK_MERCANCIA_DATOS];
      component.listaFilaSeleccionadaMercancia = [MOCK_MERCANCIA_DATOS[0]];
      jest.spyOn(component, 'cerrarEliminarConfirmationPopup');
    });

    it('debería eliminar los items seleccionados de la tabla', () => {
      component.eliminarMercanciaItem();
      
      expect(component.datosTablaMercancia.length).toBe(1);
      expect(component.datosTablaMercancia[0]).toEqual(MOCK_MERCANCIA_DATOS[1]);
    });

    it('debería actualizar el store con los datos filtrados', () => {
      component.eliminarMercanciaItem();
      
      expect(mockTramite300105Store.setMercanciaTablaDatos).toHaveBeenCalledWith(
        component.datosTablaMercancia
      );
    });

    it('debería limpiar la lista de filas seleccionadas', () => {
      component.eliminarMercanciaItem();
      
      expect(component.listaFilaSeleccionadaMercancia).toEqual([]);
    });

    it('debería cerrar el popup de confirmación', () => {
      component.eliminarMercanciaItem();
      
      expect(component.cerrarEliminarConfirmationPopup).toHaveBeenCalled();
    });

    it('debería eliminar múltiples items', () => {
      component.listaFilaSeleccionadaMercancia = MOCK_MERCANCIA_DATOS;
      
      component.eliminarMercanciaItem();
      
      expect(component.datosTablaMercancia.length).toBe(0);
    });
  });

  // Pruebas para métodos de notificaciones
  describe('Métodos de notificaciones', () => {
    describe('mostrarNotificacionSerieAgregada', () => {
      it('debería configurar notificación de éxito y abrir popup', () => {
        component.mostrarNotificacionSerieAgregada();
        
        expect(component.nuevaNotificacion).toEqual({
          tipoNotificacion: TipoNotificacionEnum.ALERTA,
          categoria: CategoriaMensaje.EXITO,
          modo: 'modal',
          titulo: '',
          mensaje: 'Número de serie agregado',
          cerrar: false,
          txtBtnAceptar: 'Aceptar',
          txtBtnCancelar: '',
        });
        expect(component.serieAgregadaPopupAbierto).toBe(true);
      });
    });

    describe('cerrarSerieAgregadaPopup', () => {
      it('debería cerrar el popup de serie agregada', () => {
        component.cerrarSerieAgregadaPopup();
        
        expect(component.serieAgregadaPopupAbierto).toBe(false);
      });
    });

    describe('mostrarNotificacionMercanciaAgregada', () => {
      it('debería configurar notificación de éxito y abrir popup', () => {
        component.mostrarNotificacionMercanciaAgregada();
        
        expect(component.nuevaNotificacion).toEqual({
          tipoNotificacion: TipoNotificacionEnum.ALERTA,
          categoria: CategoriaMensaje.EXITO,
          modo: 'modal',
          titulo: '',
          mensaje: 'La mercancia fue agregada correctamente.',
          cerrar: false,
          txtBtnAceptar: 'Aceptar',
          txtBtnCancelar: '',
        });
        expect(component.mercanciaAgregadaPopupAbierto).toBe(true);
      });
    });

    describe('cerrarMercanciaAgregadaPopup', () => {
      beforeEach(() => {
        jest.spyOn(component, 'alternarModalMercancia');
      });

      it('debería cerrar el popup de mercancía agregada y alternar modal', () => {
        component.cerrarMercanciaAgregadaPopup();
        
        expect(component.mercanciaAgregadaPopupAbierto).toBe(false);
        expect(component.alternarModalMercancia).toHaveBeenCalled();
      });
    });
  });

  // Pruebas para métodos de gestión de popups
  describe('Métodos de gestión de popups', () => {
    describe('abrirMultipleSeleccionPopup', () => {
      it('debería configurar notificación y abrir popup cuando modificar está habilitado', () => {
        component.enableModficarBoton = true;
        
        component.abrirMultipleSeleccionPopup();
        
        expect(component.nuevaNotificacion).toEqual({
          tipoNotificacion: TipoNotificacionEnum.ALERTA,
          categoria: CategoriaMensaje.ERROR,
          modo: 'modal',
          titulo: 'Aviso',
          mensaje: 'Selecciona sólo un registro para modificar.',
          cerrar: false,
          txtBtnAceptar: 'Aceptar',
          txtBtnCancelar: '',
        });
        expect(component.multipleSeleccionPopupAbierto).toBe(true);
      });

      it('no debería abrir popup cuando modificar está deshabilitado', () => {
        component.enableModficarBoton = false;
        
        component.abrirMultipleSeleccionPopup();
        
        expect(component.multipleSeleccionPopupAbierto).toBe(false);
      });
    });

    describe('cerrarMultipleSeleccionPopup', () => {
      it('debería cerrar el popup de selección múltiple', () => {
        component.cerrarMultipleSeleccionPopup();
        
        expect(component.multipleSeleccionPopupAbierto).toBe(false);
        expect(component.multipleSeleccionPopupCerrado).toBe(false);
      });
    });

    describe('abrirElimninarConfirmationopup', () => {
      it('debería configurar notificación y abrir popup de confirmación', () => {
        component.abrirElimninarConfirmationopup();
        
        expect(component.nuevaNotificacion).toEqual({
          tipoNotificacion: TipoNotificacionEnum.ALERTA,
          categoria: CategoriaMensaje.ERROR,
          modo: 'modal',
          titulo: 'Aviso',
          mensaje: '¿Estás seguro que deseas eliminar los registros marcados?',
          cerrar: false,
          txtBtnAceptar: 'Aceptar',
          txtBtnCancelar: 'Cancelar',
        });
        expect(component.confirmEliminarPopupAbierto).toBe(true);
      });
    });

    describe('cerrarEliminarConfirmationPopup', () => {
      it('debería cerrar el popup de confirmación de eliminación', () => {
        component.cerrarEliminarConfirmationPopup();
        
        expect(component.confirmEliminarPopupAbierto).toBe(false);
        expect(component.confirmEliminarPopupCerrado).toBe(false);
      });
    });
  });

  // Pruebas para gestión de modal de mercancía
  describe('Gestión de modal de mercancía', () => {
    describe('alternarModalMercancia', () => {
      it('debería alternar la visibilidad del modal', () => {
        const ESTADO_INICIAL = component.mostrarModalDatosMercancia;
        
        component.alternarModalMercancia();
        
        expect(component.mostrarModalDatosMercancia).toBe(!ESTADO_INICIAL);
      });

      it('debería cambiar de false a true', () => {
        component.mostrarModalDatosMercancia = false;
        
        component.alternarModalMercancia();
        
        expect(component.mostrarModalDatosMercancia).toBe(true);
      });

      it('debería cambiar de true a false', () => {
        component.mostrarModalDatosMercancia = true;
        
        component.alternarModalMercancia();
        
        expect(component.mostrarModalDatosMercancia).toBe(false);
      });
    });

    describe('mostrarFormularioMercanciaModal', () => {
      beforeEach(() => {
        jest.spyOn(component, 'crearNuevoFormularioMercancia');
        jest.spyOn(component, 'alternarModalMercancia');
      });

      it('debería configurar modo de creación y mostrar modal', () => {
        component.mostrarFormularioMercanciaModal();
        
        expect(component.esOperacionDeActualizacion).toBe(false);
        expect(mockAutorizacionDeRayosXService.inicializaMercanciaDatosCatalogos).toHaveBeenCalled();
        expect(component.crearNuevoFormularioMercancia).toHaveBeenCalled();
        expect(component.alternarModalMercancia).toHaveBeenCalled();
      });
    });
  });

  // Pruebas para esControlInvalido
  describe('esControlInvalido', () => {
    beforeEach(() => {
      component.crearNuevoFormularioMercancia();
    });

    it('debería retornar true cuando el control es inválido y touched', () => {
      const CONTROL = component.formularioMercancia.get('marca');
      CONTROL?.setValue('');
      CONTROL?.markAsTouched();
      
      const RESULTADO = component.esControlInvalido('marca');
      
      expect(RESULTADO).toBe(true);
    });

    it('debería retornar true cuando el control es inválido y dirty', () => {
      const CONTROL = component.formularioMercancia.get('marca');
      CONTROL?.setValue('');
      CONTROL?.markAsDirty();
      
      const RESULTADO = component.esControlInvalido('marca');
      
      expect(RESULTADO).toBe(true);
    });

    it('debería retornar false cuando el control es válido', () => {
      const CONTROL = component.formularioMercancia.get('marca');
      CONTROL?.setValue('Marca válida');
      CONTROL?.markAsTouched();
      
      const RESULTADO = component.esControlInvalido('marca');
      
      expect(RESULTADO).toBe(false);
    });

    it('debería retornar false cuando el control es inválido pero no touched ni dirty', () => {
      const CONTROL = component.formularioMercancia.get('marca');
      CONTROL?.setValue('');
      
      const RESULTADO = component.esControlInvalido('marca');
      
      expect(RESULTADO).toBe(false);
    });

    it('debería retornar false cuando el control no existe', () => {
      const RESULTADO = component.esControlInvalido('controlInexistente');
      
      expect(RESULTADO).toBe(false);
    });
  });

  // Pruebas para enviarFormularioMercancia
  describe('enviarFormularioMercancia', () => {
    beforeEach(() => {
      component.crearNuevoFormularioMercancia();
      component.datosTablaMercancia = [...MOCK_MERCANCIA_DATOS];
      jest.spyOn(component, 'mostrarNotificacionSerieAgregada');
      jest.spyOn(component, 'mostrarNotificacionMercanciaAgregada');
    });

    it('debería crear nuevo registro cuando no es actualización', () => {
      // Llenar formulario válido
      component.formularioMercancia.patchValue({
        marca: 'Nueva Marca',
        modelo: 'Nuevo Modelo',
        serie: 'Nueva Serie',
        voltaje: '240',
        unidadMedidaVoltaje: 1,
        corriente: '20',
        unidadMedidaCorriente: 1,
        numEquipos: '5',
        fraccionArancelaria: 1,
        fraccionDescripcion: 'Nueva Descripción'
      });
      component.esOperacionDeActualizacion = false;
      
      component.enviarFormularioMercancia(false);
      
      expect(component.datosTablaMercancia.length).toBe(3); // 2 originales + 1 nuevo
      expect(mockTramite300105Store.setMercanciaTablaDatos).toHaveBeenCalled();
    });

    it('debería actualizar registro existente cuando es operación de actualización', () => {
      // Configurar para actualización
      component.esOperacionDeActualizacion = true;
      component.formularioMercancia.patchValue({
        id: 1,
        marca: 'Marca Actualizada',
        modelo: 'Modelo Actualizado',
        serie: 'Serie Actualizada',
        voltaje: '240',
        unidadMedidaVoltaje: 1,
        corriente: '20',
        unidadMedidaCorriente: 1,
        numEquipos: '5',
        fraccionArancelaria: 1,
        fraccionDescripcion: 'Descripción Actualizada'
      });
      
      component.enviarFormularioMercancia(false);
      
      expect(component.datosTablaMercancia[0].marca).toBe('Marca Actualizada');
      expect(component.datosTablaMercancia.length).toBe(2); // No se agrega nuevo
    });

    it('debería mostrar notificación de serie agregada cuando isAgregar es true', () => {
      component.formularioMercancia.patchValue({
        marca: 'Test',
        modelo: 'Test',
        serie: 'Test',
        voltaje: '220',
        unidadMedidaVoltaje: 1,
        corriente: '15',
        unidadMedidaCorriente: 1,
        numEquipos: '2',
        fraccionArancelaria: 1,
        fraccionDescripcion: 'Test'
      });
      
      component.enviarFormularioMercancia(true);
      
      expect(component.mostrarNotificacionSerieAgregada).toHaveBeenCalled();
      expect(component.mostrarNotificacionMercanciaAgregada).not.toHaveBeenCalled();
    });

    it('debería mostrar notificación de mercancía agregada cuando isAgregar es false', () => {
      component.formularioMercancia.patchValue({
        marca: 'Test',
        modelo: 'Test',
        serie: 'Test',
        voltaje: '220',
        unidadMedidaVoltaje: 1,
        corriente: '15',
        unidadMedidaCorriente: 1,
        numEquipos: '2',
        fraccionArancelaria: 1,
        fraccionDescripcion: 'Test'
      });
      
      component.enviarFormularioMercancia(false);
      
      expect(component.mostrarNotificacionMercanciaAgregada).toHaveBeenCalled();
      expect(component.mostrarNotificacionSerieAgregada).not.toHaveBeenCalled();
    });

    it('debería resetear el formulario después de enviar', () => {
      const RESET_SPY = jest.spyOn(component.formularioMercancia, 'reset');
      component.formularioMercancia.patchValue({
        marca: 'Test',
        modelo: 'Test',
        serie: 'Test',
        voltaje: '220',
        unidadMedidaVoltaje: 1,
        corriente: '15',
        unidadMedidaCorriente: 1,
        numEquipos: '2',
        fraccionArancelaria: 1,
        fraccionDescripcion: 'Test'
      });
      
      component.enviarFormularioMercancia(false);
      
      expect(RESET_SPY).toHaveBeenCalled();
    });

    it('debería convertir correctamente los índices de catálogos a descripciones', () => {
      component.formularioMercancia.patchValue({
        marca: 'Test',
        modelo: 'Test',
        serie: 'Test',
        voltaje: '220',
        unidadMedidaVoltaje: 1, // Índice 1 = MOCK_UNIDAD_MEDIDA_VOLTAJE[0]
        corriente: '15',
        unidadMedidaCorriente: 2, // Índice 2 = MOCK_UNIDAD_MEDIDA_CORRIENTE[1]
        numEquipos: '2',
        fraccionArancelaria: 1, // Índice 1 = MOCK_FRACCION_ARANCELARIA[0]
        fraccionDescripcion: 'Test Descripción'
      });
      
      component.enviarFormularioMercancia(false);
      
      const NUEVO_REGISTRO = component.datosTablaMercancia[component.datosTablaMercancia.length - 1];
      expect(NUEVO_REGISTRO.unidadMedidaVoltaje).toBe('Voltios (V)'); // MOCK_UNIDAD_MEDIDA_VOLTAJE[0].descripcion
      expect(NUEVO_REGISTRO.unidadMedidaCorriente).toBe('Miliamperios (mA)'); // MOCK_UNIDAD_MEDIDA_CORRIENTE[1].descripcion
      expect(NUEVO_REGISTRO.fraccionArancelaria).toBe('90221900'); // MOCK_FRACCION_ARANCELARIA[0].descripcion
    });

    it('debería manejar índices fuera de rango en catálogos', () => {
      component.formularioMercancia.patchValue({
        marca: 'Test',
        modelo: 'Test',
        serie: 'Test',
        voltaje: '220',
        unidadMedidaVoltaje: 999, // Índice fuera de rango
        corriente: '15',
        unidadMedidaCorriente: 999, // Índice fuera de rango
        numEquipos: '2',
        fraccionArancelaria: 999, // Índice fuera de rango
        fraccionDescripcion: 'Test'
      });
      
      component.enviarFormularioMercancia(false);
      
      const NUEVO_REGISTRO = component.datosTablaMercancia[component.datosTablaMercancia.length - 1];
      expect(NUEVO_REGISTRO.unidadMedidaVoltaje).toBe(''); // Valor por defecto cuando no encuentra
      expect(NUEVO_REGISTRO.unidadMedidaCorriente).toBe(''); // Valor por defecto cuando no encuentra
      expect(NUEVO_REGISTRO.fraccionArancelaria).toBe(''); // Valor por defecto cuando no encuentra
    });
  });

  // Pruebas para ngOnDestroy
  describe('ngOnDestroy', () => {
    it('debería llamar next() en notificadorDestruccion$', () => {
      const NEXT_SPY = jest.spyOn(component['notificadorDestruccion$'], 'next');
      
      component.ngOnDestroy();
      
      expect(NEXT_SPY).toHaveBeenCalled();
    });

    it('debería llamar complete() en notificadorDestruccion$', () => {
      const COMPLETE_SPY = jest.spyOn(component['notificadorDestruccion$'], 'complete');
      
      component.ngOnDestroy();
      
      expect(COMPLETE_SPY).toHaveBeenCalled();
    });

    it('debería limpiar correctamente los recursos para evitar fugas de memoria', () => {
      const NEXT_SPY = jest.spyOn(component['notificadorDestruccion$'], 'next');
      const COMPLETE_SPY = jest.spyOn(component['notificadorDestruccion$'], 'complete');
      
      component.ngOnDestroy();
      
      expect(NEXT_SPY).toHaveBeenCalledTimes(1);
      expect(COMPLETE_SPY).toHaveBeenCalledTimes(1);
    });
  });

  // Pruebas de integración y flujo completo
  describe('Flujo completo del componente', () => {
    it('debería ejecutar el flujo completo de inicialización', () => {
      component.ngOnInit();
      
      expect(component.estadoSolicitud300105).toBeDefined();
      expect(component.datosTablaMercancia).toEqual(MOCK_MERCANCIA_DATOS);
      expect(component.botonesMovimientos).toEqual(MOCK_CROSSLIST_BOTONES);
      expect(component.formularioSolicitud).toBeDefined();
    });

    it('debería manejar el flujo completo de agregar nueva mercancía', () => {
      jest.spyOn(component, 'alternarModalMercancia');
      
      // Mostrar modal
      component.mostrarFormularioMercanciaModal();
      expect(component.mostrarModalDatosMercancia).toBe(true);
      expect(component.esOperacionDeActualizacion).toBe(false);
      
      // Llenar y enviar formulario
      component.formularioMercancia.patchValue({
        marca: 'Nueva Marca',
        modelo: 'Nuevo Modelo',
        serie: 'Nueva Serie',
        voltaje: '240',
        unidadMedidaVoltaje: 1,
        corriente: '20',
        unidadMedidaCorriente: 1,
        numEquipos: '3',
        fraccionArancelaria: 1,
        fraccionDescripcion: 'Nueva Descripción'
      });
      
      const LONGITUD_INICIAL = component.datosTablaMercancia.length;
      component.enviarFormularioMercancia(false);
      
      expect(component.datosTablaMercancia.length).toBe(LONGITUD_INICIAL + 1);
      expect(component.mostrarNotificacionMercanciaAgregada).toHaveBeenCalled();
    });

    it('debería manejar el flujo completo de modificar mercancía', () => {
      component.ngOnInit();
      
      // Seleccionar fila
      component.manejarFilaSeleccionada([MOCK_MERCANCIA_DATOS[0]]);
      expect(component.enableModficarBoton).toBe(true);
      
      // Modificar item
      component.modificarItemMercancia();
      expect(component.esOperacionDeActualizacion).toBe(true);
      
      // Actualizar y enviar
      component.formularioMercancia.patchValue({
        marca: 'Marca Modificada'
      });
      component.enviarFormularioMercancia(false);
      
      expect(component.datosTablaMercancia[0].marca).toBe('Marca Modificada');
    });

    it('debería manejar el flujo completo de eliminar mercancías', () => {
      component.ngOnInit();
      
      // Seleccionar filas
      component.manejarFilaSeleccionada(MOCK_MERCANCIA_DATOS);
      expect(component.enableEliminarBoton).toBe(true);
      
      // Confirmar eliminación
      component.confirmEliminarMercanciaItem();
      expect(component.confirmEliminarPopupAbierto).toBe(true);
      
      // Ejecutar eliminación
      component.eliminarMercanciaItem();
      expect(component.datosTablaMercancia.length).toBe(0);
      expect(mockTramite300105Store.setMercanciaTablaDatos).toHaveBeenCalled();
    });

    it('debería manejar el flujo completo de agregar serie', () => {
      component.mostrarFormularioMercanciaModal();
      
      // Llenar formulario válido
      component.formularioMercancia.patchValue({
        marca: 'Test Marca',
        modelo: 'Test Modelo',
        serie: 'Test Serie',
        voltaje: '220',
        unidadMedidaVoltaje: 1,
        corriente: '15',
        unidadMedidaCorriente: 1,
        numEquipos: '2',
        fraccionArancelaria: 1,
        fraccionDescripcion: 'Test Descripción'
      });
      
      // Enviar como agregar serie
      component.enviarFormularioMercancia(true);
      
      expect(component.mostrarNotificacionSerieAgregada).toHaveBeenCalled();
      expect(component.serieAgregadaPopupAbierto).toBe(true);
      
      // Cerrar notificación
      component.cerrarSerieAgregadaPopup();
      expect(component.serieAgregadaPopupAbierto).toBe(false);
    });
  });

  // Pruebas para casos edge y manejo de errores
  describe('Casos límite y manejo de errores', () => {
    it('debería manejar observables que no emiten en constructor', () => {
      const EMPTY_SUBJECT = new Subject();
      mockConsultaioQuery.selectConsultaioState$ = EMPTY_SUBJECT.asObservable() as Observable<ConsultaioState>;
      
      expect(() => {
        const NEW_FIXTURE = TestBed.createComponent(DatosSolicitudComponent);
      }).not.toThrow();
    });

    it('debería manejar observables que no emiten en ngOnInit', () => {
      const EMPTY_SUBJECT = new Subject();
      mockTramite300105Query.selectTramite300105$ = EMPTY_SUBJECT.asObservable() as Observable<Tramite300105State>;
      
      expect(() => component.ngOnInit()).not.toThrow();
    });

    it('debería manejar formulario undefined en esControlInvalido', () => {
      component.formularioMercancia = undefined as any;
      
      const RESULTADO = component.esControlInvalido('marca');
      
      expect(RESULTADO).toBe(false);
    });

    it('debería manejar datosTablaMercancia vacío en enviarFormularioMercancia', () => {
      component.datosTablaMercancia = [];
      component.crearNuevoFormularioMercancia();
      component.formularioMercancia.patchValue({
        marca: 'Test',
        modelo: 'Test',
        serie: 'Test',
        voltaje: '220',
        unidadMedidaVoltaje: 1,
        corriente: '15',
        unidadMedidaCorriente: 1,
        numEquipos: '2',
        fraccionArancelaria: 1,
        fraccionDescripcion: 'Test'
      });
      
      component.enviarFormularioMercancia(false);
      
      expect(component.datosTablaMercancia.length).toBe(1);
      expect(component.datosTablaMercancia[0].id).toBe(1); // 0 + 1
    });

    it('debería manejar catálogos vacíos en manejarCambioFraccionArancelaria', () => {
      mockAutorizacionDeRayosXService.fraccionArancelariaDescripcion = [];
      component.crearNuevoFormularioMercancia();
      
      const EVENT_CATALOGO: Catalogo = {
        id: 1,
        descripcion: '1',
        clave: 'test'
      };
      
      expect(() => component.manejarCambioFraccionArancelaria(EVENT_CATALOGO)).not.toThrow();
    });

    it('debería manejar filaSeleccionadaMercancia undefined en actualizarFilaSeleccionada', () => {
      component.filaSeleccionadaMercancia = undefined as any;
      component.datosTablaMercancia = MOCK_MERCANCIA_DATOS;
      
      expect(() => component.actualizarFilaSeleccionada()).not.toThrow();
    });

    it('debería manejar listaFilaSeleccionadaMercancia null en eliminarMercanciaItem', () => {
      component.listaFilaSeleccionadaMercancia = null as any;
      component.datosTablaMercancia = MOCK_MERCANCIA_DATOS;
      
      expect(() => component.eliminarMercanciaItem()).not.toThrow();
    });

    it('debería manejar estadoSolicitud300105 undefined en ngOnInit', () => {
      mockTramite300105Query.selectTramite300105$ = of(undefined as any);
      
      expect(() => component.ngOnInit()).not.toThrow();
    });
  });

  // Pruebas de la template
  describe('Interacciones con la template', () => {
    beforeEach(() => {
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('debería renderizar el título correctamente', () => {
      const COMPILED = fixture.nativeElement;
      const TITULO = COMPILED.querySelector('ng-titulo');
      expect(TITULO).toBeTruthy();
    });

    it('debería renderizar el formulario principal', () => {
      const COMPILED = fixture.nativeElement;
      const FORM = COMPILED.querySelector('form[formGroup]');
      expect(FORM).toBeTruthy();
    });

    it('debería renderizar la tabla dinámica', () => {
      const COMPILED = fixture.nativeElement;
      const TABLA = COMPILED.querySelector('app-tabla-dinamica');
      expect(TABLA).toBeTruthy();
    });

    it('debería renderizar los botones de acción', () => {
      const COMPILED = fixture.nativeElement;
      const BOTONES = COMPILED.querySelectorAll('button');
      expect(BOTONES.length).toBeGreaterThan(0);
    });

    it('debería renderizar el textarea de observaciones', () => {
      const COMPILED = fixture.nativeElement;
      const TEXTAREA = COMPILED.querySelector('textarea[formControlName="observaciones"]');
      expect(TEXTAREA).toBeTruthy();
    });

    it('debería deshabilitar botones cuando esFormularioSoloLectura es true', () => {
      component.esFormularioSoloLectura = true;
      fixture.detectChanges();
      
      const COMPILED = fixture.nativeElement;
      const BOTONES_DESHABILITADOS = COMPILED.querySelectorAll('button[disabled]');
      expect(BOTONES_DESHABILITADOS.length).toBeGreaterThan(0);
    });

    it('debería mostrar sección de aduanas cuando tipoOperacionSeleccionado tiene valor', () => {
      component.tipoOperacionSeleccionado = 'exportacion';
      fixture.detectChanges();
      
      const COMPILED = fixture.nativeElement;
      const CROSSLIST = COMPILED.querySelector('crosslist');
      expect(CROSSLIST).toBeTruthy();
    });

    it('no debería mostrar sección de aduanas cuando tipoOperacionSeleccionado es undefined', () => {
      component.tipoOperacionSeleccionado = undefined as any;
      fixture.detectChanges();
      
      const COMPILED = fixture.nativeElement;
      const CROSSLIST = COMPILED.querySelector('crosslist');
      expect(CROSSLIST).toBeFalsy();
    });

    it('debería mostrar el modal cuando mostrarModalDatosMercancia es true', () => {
      component.mostrarModalDatosMercancia = true;
      fixture.detectChanges();
      
      const COMPILED = fixture.nativeElement;
      const MODAL = COMPILED.querySelector('app-modal');
      expect(MODAL).toBeTruthy();
    });

    it('no debería mostrar el modal cuando mostrarModalDatosMercancia es false', () => {
      component.mostrarModalDatosMercancia = false;
      fixture.detectChanges();
      
      const COMPILED = fixture.nativeElement;
      const MODAL = COMPILED.querySelector('app-modal');
      expect(MODAL).toBeFalsy();
    });

    it('debería mostrar notificaciones cuando los popups están abiertos', () => {
      component.confirmEliminarPopupAbierto = true;
      fixture.detectChanges();
      
      const COMPILED = fixture.nativeElement;
      const NOTIFICACIONES = COMPILED.querySelectorAll('lib-notificaciones');
      expect(NOTIFICACIONES.length).toBeGreaterThan(0);
    });

    it('debería renderizar el formulario de mercancía en el modal', () => {
      component.mostrarModalDatosMercancia = true;
      component.crearNuevoFormularioMercancia();
      fixture.detectChanges();
      
      const COMPILED = fixture.nativeElement;
      const FORM_MERCANCIA = COMPILED.querySelector('form[formGroup] input[formControlName="marca"]');
      expect(FORM_MERCANCIA).toBeTruthy();
    });

    it('debería aplicar clases de validación en campos inválidos', () => {
      component.mostrarModalDatosMercancia = true;
      component.crearNuevoFormularioMercancia();
      
      // Hacer campo inválido
      const CONTROL = component.formularioMercancia.get('marca');
      CONTROL?.setValue('');
      CONTROL?.markAsTouched();
      
      fixture.detectChanges();
      
      const COMPILED = fixture.nativeElement;
      const INPUT_INVALIDO = COMPILED.querySelector('input.is-invalid');
      expect(INPUT_INVALIDO).toBeTruthy();
    });

    it('debería mostrar mensajes de error para campos inválidos', () => {
      component.mostrarModalDatosMercancia = true;
      component.crearNuevoFormularioMercancia();
      
      // Hacer campo inválido
      const CONTROL = component.formularioMercancia.get('marca');
      CONTROL?.setValue('');
      CONTROL?.markAsTouched();
      
      fixture.detectChanges();
      
      const COMPILED = fixture.nativeElement;
      const MENSAJE_ERROR = COMPILED.querySelector('.text-danger small');
      expect(MENSAJE_ERROR?.textContent?.trim()).toBe('Este campo es obligatorio.');
    });

    it('debería llamar a guardarObservaciones en el evento blur del textarea', () => {
      const GUARDAR_SPY = jest.spyOn(component, 'guardarObservaciones');
      
      const COMPILED = fixture.nativeElement;
      const TEXTAREA = COMPILED.querySelector('textarea[formControlName="observaciones"]');
      
      // Simular evento blur
      TEXTAREA.dispatchEvent(new Event('blur'));
      
      expect(GUARDAR_SPY).toHaveBeenCalled();
    });

    it('debería habilitar/deshabilitar botones según el estado de selección', () => {
      // Sin selección
      component.manejarFilaSeleccionada([]);
      fixture.detectChanges();
      
      const COMPILED = fixture.nativeElement;
      const BOTON_MODIFICAR = COMPILED.querySelector('button[disabled]');
      expect(BOTON_MODIFICAR).toBeTruthy();
      
      // Con selección
      component.manejarFilaSeleccionada([MOCK_MERCANCIA_DATOS[0]]);
      fixture.detectChanges();
      
      expect(component.enableModficarBoton).toBe(true);
      expect(component.enableEliminarBoton).toBe(true);
    });
  });

  // Pruebas de gestión de suscripciones
  describe('Gestión de suscripciones', () => {
    it('debería usar takeUntil para evitar fugas de memoria en constructor', () => {
      const MOCK_PIPE = jest.fn().mockReturnValue(of(MOCK_CONSULTAIO_STATE));
      mockConsultaioQuery.selectConsultaioState$ = {
        pipe: MOCK_PIPE
      } as any;
      
      const NEW_FIXTURE = TestBed.createComponent(DatosSolicitudComponent);
      
      expect(MOCK_PIPE).toHaveBeenCalledWith(expect.anything(), expect.anything());
    });

    it('debería usar takeUntil para evitar fugas de memoria en ngOnInit', () => {
      const MOCK_PIPE = jest.fn().mockReturnValue(of(MOCK_TRAMITE300105_STATE));
      mockTramite300105Query.selectTramite300105$ = {
        pipe: MOCK_PIPE
      } as any;
      
      component.ngOnInit();
      
      expect(MOCK_PIPE).toHaveBeenCalledWith(expect.anything());
    });

    it('debería cancelar todas las suscripciones al destruir', () => {
      const NEXT_SPY = jest.spyOn(component['notificadorDestruccion$'], 'next');
      const COMPLETE_SPY = jest.spyOn(component['notificadorDestruccion$'], 'complete');
      
      component.ngOnDestroy();
      
      expect(NEXT_SPY).toHaveBeenCalled();
      expect(COMPLETE_SPY).toHaveBeenCalled();
    });
  });

  // Pruebas de validación de formularios
  describe('Validación de formularios', () => {
    beforeEach(() => {
      component.crearNuevoFormularioMercancia();
    });

    it('debería validar campos requeridos', () => {
      const CAMPOS_REQUERIDOS = [
        'marca', 'modelo', 'serie', 'voltaje', 'unidadMedidaVoltaje',
        'corriente', 'unidadMedidaCorriente', 'numEquipos', 'fraccionArancelaria', 'fraccionDescripcion'
      ];
      
      CAMPOS_REQUERIDOS.forEach(CAMPO => {
        const CONTROL = component.formularioMercancia.get(CAMPO);
        CONTROL?.setValue('');
        expect(CONTROL?.hasError('required')).toBe(true);
        
        CONTROL?.setValue('valor válido');
        expect(CONTROL?.hasError('required')).toBe(false);
      });
    });

    it('debería validar maxLength para observaciones', () => {
      component.ngOnInit();
      
      const OBSERVACIONES_CONTROL = component.formularioSolicitud.get('observaciones');
      const TEXTO_LARGO = 'a'.repeat(501); // Excede maxLength(500)
      OBSERVACIONES_CONTROL?.setValue(TEXTO_LARGO);
      
      expect(OBSERVACIONES_CONTROL?.hasError('maxlength')).toBe(true);
    });

    it('debería marcar el formulario como válido cuando todos los campos están completos', () => {
      component.formularioMercancia.patchValue({
        marca: 'Marca Test',
        modelo: 'Modelo Test',
        serie: 'Serie Test',
        voltaje: '220',
        unidadMedidaVoltaje: 'V',
        corriente: '15',
        unidadMedidaCorriente: 'A',
        numEquipos: '2',
        fraccionArancelaria: '90221900',
        fraccionDescripcion: 'Descripción Test'
      });
      
      expect(component.formularioMercancia.valid).toBeTruthy();
    });

    it('debería marcar el formulario como inválido cuando faltan campos requeridos', () => {
      component.formularioMercancia.patchValue({
        marca: '', // Campo requerido vacío
        modelo: 'Modelo Test',
        serie: 'Serie Test',
        voltaje: '220',
        unidadMedidaVoltaje: 'V',
        corriente: '15',
        unidadMedidaCorriente: 'A',
        numEquipos: '2',
        fraccionArancelaria: '90221900',
        fraccionDescripcion: 'Descripción Test'
      });
      
      expect(component.formularioMercancia.valid).toBeFalsy();
    });
  });
});