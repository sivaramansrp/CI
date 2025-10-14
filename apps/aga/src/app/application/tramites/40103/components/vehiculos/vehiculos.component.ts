import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';

import { Subject, map, takeUntil } from 'rxjs';

import {
  Catalogo,
  ConsultaioQuery,
  ConsultaioState,
  Notificacion,
  TablaSeleccion,
  ValidacionesFormularioService
} from '@ng-mf/data-access-user';

import {
  UNIDAD_TABLA_CONFIG,
  VEHICULOS_TABLA_CONFIG
} from '../../enum/transportista-terrestre.enum';

import {
  CatalogoLista,
  DatosUnidad,
  UnidadTabla,
  VehiculoTabla,
  VehiculoTablaDatos
} from '../../models/registro-muestras-mercancias.model';

import {
  Tramite40103State,
  Tramite40103Store
} from '../../estados/tramite40103.store';

import { Tramite40103Query } from '../../estados/tramite40103.query';
import { modificarTerrestreService } from '../services/modificacar-terrestre.service';

/**
 * Componente para la gestión de vehículos y unidades de arrastre en el trámite 40103.
 * 
 * Este componente maneja:
 * - Formularios reactivos para vehículos y unidades de arrastre
 * - Tablas de datos con funcionalidad de CRUD
 * - Catálogos y validaciones
 * - Modales para agregar/editar registros
 * - Gestión de estado del trámite
 * 
 * @component
 * @implements {OnInit}
 * @implements {OnDestroy}
 * @selector app-vehiculos
 * @templateUrl ./vehiculos.component.html
 * @styleUrl ./vehiculos.component.scss
 * 
 * @example
 * ```html
 * <app-vehiculos></app-vehiculos>
 * ```
 */
@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrl: './vehiculos.component.scss',
})
export class VehiculosComponent implements OnInit, OnDestroy {
  /**
   * Lista de vehículos que se muestran en la tabla.
   * Contiene todos los registros de vehículos capturados.
   * 
   * @type {VehiculoTabla[]}
   * @memberof VehiculosComponent
   */
  VehiculoTabla: VehiculoTabla[] = [];

  /**
   * Referencia al modal de vehículo en el DOM.
   * Utilizada para controlar la apertura y cierre del modal de captura/edición de vehículos.
   * 
   * @type {ElementRef}
   * @memberof VehiculosComponent
   */
  @ViewChild('vehiculoModal') vehiculoModal!: ElementRef;

  /**
   * Referencia al modal de unidad de arrastre en el DOM.
   * Utilizada para controlar la apertura y cierre del modal de captura/edición de unidades.
   * 
   * @type {ElementRef}
   * @memberof VehiculosComponent
   */
  @ViewChild('unidadModal') unidadModal!: ElementRef;

  /**
   * Instancia del modal de vehículo para control programático.
   * Permite abrir y cerrar el modal de vehículos mediante código Bootstrap.
   * 
   * @type {Modal | null}
   * @public
   * @memberof VehiculosComponent
   */
  public vehiculoModalInstance: Modal | null = null;

  /**
   * Instancia del modal de unidad para control programático.
   * Permite abrir y cerrar el modal de unidades de arrastre mediante código Bootstrap.
   * 
   * @type {Modal | null}
   * @public
   * @memberof VehiculosComponent
   */
  public unidadModalInstance: Modal | null = null;

  /**
   * Formulario reactivo para la captura y edición de datos de vehículos.
   * Contiene validaciones y controles para todos los campos requeridos del vehículo.
   * 
   * @type {FormGroup}
   * @memberof VehiculosComponent
   */
  vehiculoFormulario!: FormGroup;

  /**
   * Formulario reactivo para la captura y edición de datos de unidades de arrastre.
   * Contiene validaciones y controles para todos los campos requeridos de la unidad.
   * 
   * @type {FormGroup}
   * @memberof VehiculosComponent
   */
  unidadFormulario!: FormGroup;

  /**
   * Sujeto utilizado para gestionar la destrucción de suscripciones y evitar fugas de memoria.
   * Se completa en ngOnDestroy para cancelar todas las suscripciones activas.
   * 
   * @type {Subject<void>}
   * @public
   * @memberof VehiculosComponent
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * Catálogo de tipos de vehículo disponibles.
   * Contiene la lista de tipos que se puede seleccionar al registrar un vehículo.
   * 
   * @type {Catalogo[]}
   * @memberof VehiculosComponent
   */
  tipoDeVehiculoCatalogo: Catalogo[] = [];

  /**
   * Catálogo de tipos de arrastre disponibles.
   * Lista auxiliar que mantiene los tipos de arrastre para compatibilidad.
   * 
   * @type {Catalogo[]}
   * @memberof VehiculosComponent
   */
  tipoArrastre: Catalogo[] = [];

  /**
   * Catálogo de tipos de unidad de arrastre disponibles.
   * Contiene la lista de tipos que se puede seleccionar al registrar una unidad de arrastre.
   * 
   * @type {Catalogo[]}
   * @memberof VehiculosComponent
   */
  tipoArrastreCatalogo: Catalogo[] = [];

  /**
   * Catálogo de años disponibles para selección.
   * Contiene la lista de años que se puede asignar a un vehículo o unidad.
   * 
   * @type {Catalogo[]}
   * @memberof VehiculosComponent
   */
  anoCatalogo: Catalogo[] = [];

  /**
   * Catálogo de países emisores disponibles.
   * Contiene la lista de países que pueden emitir placas vehiculares.
   * 
   * @type {Catalogo[]}
   * @memberof VehiculosComponent
   */
  paisEmisorCatalogo: Catalogo[] = [];

  /**
   * Catálogo de colores de vehículos disponibles.
   * Contiene la lista de colores que se puede asignar a un vehículo o unidad.
   * 
   * @type {Catalogo[]}
   * @memberof VehiculosComponent
   */
  colorVehiculoCatalogo: Catalogo[] = [];

  /**
   * Objeto de notificación actual para mostrar alertas y mensajes al usuario.
   * Contiene la configuración de tipo, mensaje y comportamiento de la notificación.
   * 
   * @type {Notificacion}
   * @public
   * @memberof VehiculosComponent
   */
  public nuevaNotificacion!: Notificacion;

  /**
   * Nombre de la pestaña seleccionada actualmente en la interfaz.
   * Puede ser 'Parque vehicular' o 'Unidad de arrastre'.
   * 
   * @type {string}
   * @memberof VehiculosComponent
   */
  selectedTab: string = 'Parque vehicular';

  /**
   * Identificador de la pestaña activa actualmente.
   * Puede ser 'parquevehicular' o 'unidaddearrastre'.
   * 
   * @type {string}
   * @memberof VehiculosComponent
   */
  activeTab: string = 'parquevehicular';

  /**
   * Tipo de selección utilizado en las tablas (checkbox, radio, etc.).
   * Determina cómo se pueden seleccionar los elementos en las tablas.
   * 
   * @type {TablaSeleccion}
   * @memberof VehiculosComponent
   */
  tipoSeleccionTabla = TablaSeleccion.CHECKBOX;

  /**
   * Estado actual del trámite 40103 obtenido del store.
   * Contiene toda la información del estado global del trámite.
   * 
   * @type {Tramite40103State}
   * @public
   * @memberof VehiculosComponent
   */
  public tramiteState!: Tramite40103State;

  /**
   * Referencia al botón de cierre del modal de vehículo.
   * Utilizada para cerrar el modal programáticamente cuando sea necesario.
   * 
   * @type {ElementRef}
   * @public
   * @memberof VehiculosComponent
   */
  @ViewChild('closeModal') public closeModal!: ElementRef;

  /**
   * Referencia al botón de cierre del modal de unidad de arrastre.
   * Utilizada para cerrar el modal programáticamente cuando sea necesario.
   * 
   * @type {ElementRef}
   * @public
   * @memberof VehiculosComponent
   */
  @ViewChild('closeUnidadModal') public closeUnidadModal!: ElementRef;

  /**
   * Indica si el formulario o componente está en modo solo lectura.
   * Cuando es true, desactiva la edición de campos y funcionalidades.
   * 
   * @type {boolean}
   * @memberof VehiculosComponent
   */
  esSoloLectura: boolean = false;

  /**
   * Almacena el estado de consulta actual obtenido del query de consulta.
   * Contiene información sobre el modo de operación (solo lectura, etc.).
   * 
   * @type {ConsultaioState}
   * @memberof VehiculosComponent
   */
  datosConsulta!: ConsultaioState;

/**
 * Constructor del componente `VehiculosComponent`.
 *
 * - Inicializa los servicios y dependencias necesarias para la gestión de vehículos y unidades de arrastre.
 * - Permite la inyección de servicios para formularios reactivos, gestión de estado, validaciones y consultas.
 *
 * @constructor
 * @param {FormBuilder} fb - Servicio para la creación y gestión de formularios reactivos.
 * @param {Tramite40103Store} store - Store del trámite 40103 para la gestión del estado global.
 * @param {Tramite40103Query} tramiteQuery - Query para consultar el estado del trámite 40103.
 * @param {modificarTerrestreService} modificarTerrestreService - Servicio para modificar y obtener datos terrestres.
 * @param {ValidacionesFormularioService} validacionesService - Servicio para validaciones personalizadas de formularios.
 * @param {ConsultaioQuery} consultaioQuery - Servicio para consultar el estado de consulta y determinar el modo de solo lectura.
 */
  constructor(
    public fb: FormBuilder,
    public store: Tramite40103Store,
    public tramiteQuery: Tramite40103Query,
    public modificarTerrestreService: modificarTerrestreService,
    private validacionesService: ValidacionesFormularioService,
    private consultaioQuery: ConsultaioQuery
  ) { 
    // Inicializar formularios con valores vacíos para prevenir errores de FormControl
    this.initializeEmptyForms();
  }

  /**
   * Inicializa formularios vacíos para prevenir errores de FormControl antes de que los datos asíncronos se carguen.
   * 
   * Crea tanto el formulario de vehículos como el de unidades de arrastre con:
   * - Campos básicos y validaciones requeridas
   * - Campos deshabilitados por defecto (como descripción)
   * - Validaciones de longitud para campos específicos (VIN: 17 caracteres)
   * 
   * @private
   * @method initializeEmptyForms
   * @memberof VehiculosComponent
   * @returns {void}
   */
  private initializeEmptyForms(): void {
    this.vehiculoFormulario = this.fb.group({
      idDeVehiculo: [{ value: 1, disabled: true }],
      numero: ['', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
      tipoDeVehiculo: ['', [Validators.required]],
      numeroPlaca: ['', [Validators.required]],
      paisEmisor: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      ano: ['', [Validators.required]],
      transponder: ['', [Validators.required]],
      colorVehiculo: ['', [Validators.required]],
      numuroEconomico: ['', [Validators.required]],
      numero2daPlaca: [''],
      estado2daPlaca: [''],
      paisEmisor2daPlaca: [''],
      descripcion: [''],
    });

    this.unidadFormulario = this.fb.group({
      vinVehiculo: ['', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
      tipoDeUnidadArrastre: ['', [Validators.required]],
      idDeVehiculoUnidad: [{ value: 1, disabled: true }],
      numeroEconomico: ['', [Validators.required]],
      numeroPlaca: ['', [Validators.required]],
      paisEmisor: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      colorVehiculo: ['', [Validators.required]],
      numero2daPlaca: [''],
      estado2daPlaca: [''],
      paisEmisor2daPlaca: [''],
      descripcion: [''],
    });

    this.vehiculoFormulario.get('descripcion')?.disable();
    this.unidadFormulario.get('descripcion')?.disable();
  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * 
   * Realiza las siguientes operaciones:
   * - Limpia instancias de modales existentes
   * - Se suscribe al estado de la solicitud del trámite
   * - Inicializa formularios después de obtener el estado
   * - Configura suscripciones de cambios en formularios
   * - Se suscribe al estado de consulta para modo solo lectura
   * - Selecciona la pestaña inicial y carga catálogos
   * 
   * @method ngOnInit
   * @memberof VehiculosComponent
   * @returns {void}
   */
  ngOnInit(): void {
    VehiculosComponent.cleanupModalInstances();
    
    this.tramiteQuery.selectSolicitud$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.tramiteState = seccionState;
          
          this.inicializarFormulario();
          
          this.setupFormValueSubscriptions();
        })
      )
      .subscribe();

/**
 * Suscribe al estado de consulta para determinar si el formulario debe estar en modo solo lectura.
 * Si el estado indica `readonly`, actualiza las propiedades `datosConsulta` y `esSoloLectura` del componente.
 *
 * @observable selectConsultaioState$
 * @effect Actualiza el modo de solo lectura del formulario según el estado de consulta.
 */
      this.consultaioQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          if (seccionState.readonly) {
            this.datosConsulta = seccionState;
            this.esSoloLectura = this.datosConsulta.readonly;
          }
        })
      ).subscribe();
  /**
 * Inicializa la pestaña activa, los formularios y carga los catálogos necesarios al iniciar el componente.
 *
 * - Selecciona la pestaña "Parque vehicular" como activa.
 * - Inicializa los formularios reactivos de vehículo y unidad de arrastre.
 * - Carga los catálogos de tipos de vehículo, arrastre, año y país emisor.
 */
    this.seleccionarPestana('parquevehicular');
    this.cargarTipoDeVehiculo();
  }

/**
 * Configuración de la tabla de vehículos.
 *
 * Define las columnas (encabezadas) y los datos que se mostrarán en la tabla de vehículos.
 * La primera columna corresponde al ID del vehículo, seguida de las columnas definidas en `VEHICULOS_TABLA_CONFIG`.
 *
 * @property {Object} vehiculosTablaConfig
 * @property {Array<Object>} vehiculosTablaConfig.encabezadas - Arreglo de objetos que define los encabezados de la tabla.
 * @property {string} vehiculosTablaConfig.encabezadas[].encabezado - Nombre del encabezado.
 * @property {function} vehiculosTablaConfig.encabezadas[].clave - Función que retorna el valor de la columna para un vehículo.
 * @property {number} vehiculosTablaConfig.encabezadas[].orden - Orden de la columna en la tabla.
 * @property {VehiculoTabla[]} vehiculosTablaConfig.datos - Datos de los vehículos a mostrar en la tabla.
 */
  vehiculosTablaConfig: {
    encabezadas: {
      encabezado: string;
      clave: (item: VehiculoTabla) => string;
      orden: number;
    }[];
    datos: VehiculoTabla[];
  } = {
      ...VEHICULOS_TABLA_CONFIG,
      encabezadas: [
        {
          encabezado: 'ID',
          clave: (item: VehiculoTabla) => String(item.idDeVehiculo),
          orden: 0,
        },
        {
          encabezado: 'Número de identificación vehícular',
          clave: (item: VehiculoTabla) => item.numero,
          orden: 1,
        },
        {
          encabezado: 'Tipo de vehículo',
          clave: (item: VehiculoTabla) => item.tipoDeVehiculo,
          orden: 2,
        },
        {
          encabezado: 'Número económico',
          clave: (item: VehiculoTabla) => item.numuroEconomico,
          orden: 3,
        },
        {
          encabezado: 'Transponder',
          clave: (item: VehiculoTabla) => item.transponder,
          orden: 4,
        },
        {
          encabezado: 'Número de placas',
          clave: (item: VehiculoTabla) => item.numeroPlaca,
          orden: 5,
        },
        {
          encabezado: 'País emisor',
          clave: (item: VehiculoTabla) => item.paisEmisor,
          orden: 6,
        },
        {
          encabezado: 'Estado o provincia',
          clave: (item: VehiculoTabla) => item.estado,
          orden: 7,
        },
        {
          encabezado: 'Marca',
          clave: (item: VehiculoTabla) => item.marca,
          orden: 8,
        },
        {
          encabezado: 'Modelo',
          clave: (item: VehiculoTabla) => item.modelo,
          orden: 9,
        },
        {
          encabezado: 'Año',
          clave: (item: VehiculoTabla) => item.ano,
          orden: 10,
        }
      ]
    };

/**
 * Configuración de la tabla de unidades de arrastre.
 *
 * Define las columnas (encabezadas) y los datos que se mostrarán en la tabla de unidades de arrastre,
 * utilizando la configuración base proporcionada por `UNIDAD_TABLA_CONFIG`.
 *
 * @property {Object} unidadesTablaConfig
 * @property {Array<Object>} unidadesTablaConfig.encabezadas - Arreglo de objetos que define los encabezados de la tabla.
 * @property {string} unidadesTablaConfig.encabezadas[].encabezado - Nombre del encabezado.
 * @property {function} unidadesTablaConfig.encabezadas[].clave - Función que retorna el valor de la columna para una unidad.
 * @property {number} unidadesTablaConfig.encabezadas[].orden - Orden de la columna en la tabla.
 * @property {UnidadTabla[]} unidadesTablaConfig.datos - Datos de las unidades de arrastre a mostrar en la tabla.
 */
  unidadesTablaConfig: {
    encabezadas: {
      encabezado: string;
      clave: (item: UnidadTabla) => string;
      orden: number;
    }[];
    datos: UnidadTabla[];
  } = {
      ...UNIDAD_TABLA_CONFIG,
      encabezadas: [
        {
          encabezado: 'IDENTIFICACIÓN',
          clave: (item: UnidadTabla) => String(item.idDeVehiculo),
          orden: 0,
        },
        ...UNIDAD_TABLA_CONFIG.encabezadas.map((col, idx) => {
          return { ...col, orden: idx + 1 };
        })
      ]
    };

/**
 * Cambia la pestaña seleccionada y activa en el componente.
 *
 * Asigna el nombre de la pestaña visible (`selectedTab`) y el identificador de la pestaña activa (`activeTab`)
 * según el valor recibido. Si el valor es 'parquevehicular', selecciona 'Parque vehicular', de lo contrario selecciona 'Unidad de arrastre'.
 *
 * @param {string} tabName - Identificador de la pestaña a seleccionar ('parquevehicular' o 'unidaddearrastre').
 * @returns {string} El identificador de la pestaña activa.
 */
  seleccionarPestana(tabName: string): string {
    this.selectedTab =
      tabName === 'parquevehicular' ? 'Parque vehicular' : 'Unidad de arrastre';
    this.activeTab = tabName;
    return this.activeTab;
  }

/**
 * Elimina todos los registros de la tabla de vehículos y restablece el formulario.
 *
 * - Limpia el arreglo de datos de la tabla de vehículos.
 * - Reinicia el índice de edición.
 * - Restablece el formulario de vehículo a su estado inicial.
 */
  eliminarPedimento(): void {
    this.vehiculosTablaConfig.datos = [];
    this.editIndex = null;
    this.vehiculoFormulario.reset();
  }

/**
 * Elimina todos los registros de la tabla de unidades de arrastre y restablece el formulario.
 *
 * - Limpia el arreglo de datos de la tabla de unidades de arrastre.
 * - Reinicia el índice de edición de unidad.
 * - Restablece el formulario de unidad de arrastre a su estado inicial.
 */
  eliminarUnidadPedimento(): void {
    this.unidadesTablaConfig.datos = [];
    this.editUnidadIndex = null;
    this.unidadFormulario.reset();
  }

  /**
   * Limpia cualquier instancia de modal existente del DOM.
   * 
   * Realiza las siguientes operaciones de limpieza:
   * - Destruye instancias de modales existentes de vehículos y unidades
   * - Elimina elementos backdrop residuales del DOM
   * - Resetea las clases CSS del body para modales
   * - Maneja errores de forma silenciosa para evitar interrupciones
   * 
   * @private
   * @method cleanupModalInstances
   * @memberof VehiculosComponent
   * @returns {void}
   */
  private static cleanupModalInstances(): void {
    try {
      const ELEMENTO_MODAL_VEHICULO = document.getElementById('vehiculoModal');
      if (ELEMENTO_MODAL_VEHICULO) {
        const MODAL_VEHICULO_EXISTENTE = Modal.getInstance(ELEMENTO_MODAL_VEHICULO);
        if (MODAL_VEHICULO_EXISTENTE) {
          MODAL_VEHICULO_EXISTENTE.dispose();
        }
      }
      
      const ELEMENTO_MODAL_UNIDAD = document.getElementById('unidadModal');
      if (ELEMENTO_MODAL_UNIDAD) {
        const MODAL_UNIDAD_EXISTENTE = Modal.getInstance(ELEMENTO_MODAL_UNIDAD);
        if (MODAL_UNIDAD_EXISTENTE) {
          MODAL_UNIDAD_EXISTENTE.dispose();
        }
      }
      
      const FONDOS = document.querySelectorAll('.modal-backdrop');
      FONDOS.forEach(backdrop => backdrop.remove());
      
      document.body.classList.remove('modal-open');
    } catch (error) {
      // Manejo silencioso de errores
    }
  }

  /**
   * Fuerza el cierre del modal de vehículo usando múltiples métodos.
   * 
   * Intenta cerrar el modal usando diferentes estrategias:
   * 1. Instancia Bootstrap Modal almacenada
   * 2. Instancia existente obtenida del DOM
   * 3. Creación de nueva instancia para cerrar
   * 4. Manipulación manual del DOM como fallback
   * 
   * Garantiza que el modal se cierre independientemente del estado de la instancia.
   * 
   * @private
   * @method forceCloseVehiculoModal
   * @memberof VehiculosComponent
   * @returns {void}
   */
  private forceCloseVehiculoModal(): void {
    try {
      if (this.vehiculoModalInstance) {
        this.vehiculoModalInstance.hide();
        return;
      }
    } catch (error) {
      // Manejo silencioso de errores
    }
    
    try {
      const ELEMENTO_MODAL = document.getElementById('vehiculoModal');
      if (ELEMENTO_MODAL) {
        const MODAL_EXISTENTE = Modal.getInstance(ELEMENTO_MODAL);
        if (MODAL_EXISTENTE) {
          MODAL_EXISTENTE.hide();
          return;
        }
      }
    } catch (error) {
      // Manejo silencioso de errores
    }
    
    try {
      const ELEMENTO_MODAL = document.getElementById('vehiculoModal');
      if (ELEMENTO_MODAL) {
        const NUEVO_MODAL = new Modal(ELEMENTO_MODAL);
        NUEVO_MODAL.hide();
        return;
      }
    } catch (error) {
      // Manejo silencioso de errores
    }
    
    try {
      const ELEMENTO_MODAL = document.getElementById('vehiculoModal');
      const FONDO = document.querySelector('.modal-backdrop');
      
      if (ELEMENTO_MODAL) {
        ELEMENTO_MODAL.style.display = 'none';
        ELEMENTO_MODAL.classList.remove('show');
        ELEMENTO_MODAL.setAttribute('aria-hidden', 'true');
        ELEMENTO_MODAL.removeAttribute('aria-modal');
        document.body.classList.remove('modal-open');
      }
      
      if (FONDO) {
        FONDO.remove();
      }
    } catch (error) {
      // Manejo silencioso de errores
    }
  }

  /**
   * Abre el modal para agregar o editar un vehículo.
   * 
   * Realiza las siguientes operaciones:
   * - Asegura que los formularios estén inicializados
   * - Configura suscripciones a cambios de formulario
   * - Limpia instancias previas del modal
   * - Crea nueva instancia de modal Bootstrap
   * - Implementa fallback de manipulación DOM si falla Bootstrap
   * 
   * @method abrirModalPedimento
   * @memberof VehiculosComponent
   * @returns {void}
   */
  abrirModalPedimento(): void {
    if (!this.vehiculoFormulario) {
      this.initializeEmptyForms();
    }
    
    setTimeout(() => {
      this.setupFormValueSubscriptions();
    }, 100);
    
    if (this.vehiculoModal) {
      try {
        if (this.vehiculoModalInstance) {
          this.vehiculoModalInstance.dispose();
          this.vehiculoModalInstance = null;
        }
        
        this.vehiculoModalInstance = new Modal(this.vehiculoModal.nativeElement);
        this.vehiculoModalInstance.show();
      } catch (error) {
        try {
          const ELEMENTO_MODAL = this.vehiculoModal.nativeElement;
          ELEMENTO_MODAL.style.display = 'block';
          ELEMENTO_MODAL.classList.add('show');
          ELEMENTO_MODAL.setAttribute('aria-modal', 'true');
          ELEMENTO_MODAL.removeAttribute('aria-hidden');
          document.body.classList.add('modal-open');
          
          const FONDO = document.createElement('div');
          FONDO.className = 'modal-backdrop fade show';
          document.body.appendChild(FONDO);
        } catch (fallbackError) {
          // Manejo silencioso de errores
        }
      }
    }
  }

/**
 * Abre el modal para agregar o editar una unidad de arrastre.
 *
 * Muestra el modal asociado al formulario de unidades de arrastre si la referencia existe.
 */
  abrirModalPedimentoUnidad(): void {
    if (!this.unidadFormulario) {
      this.initializeEmptyForms();
    }

    // Asegura que las suscripciones estén configuradas al abrir el modal
    setTimeout(() => {
      this.setupFormValueSubscriptions();
    }, 100);
    
    if (this.unidadModal) {
      try {
        if (this.unidadModalInstance) {
          this.unidadModalInstance.dispose();
          this.unidadModalInstance = null;
        }
        
        this.unidadModalInstance = new Modal(this.unidadModal.nativeElement);
        this.unidadModalInstance.show();
      } catch (error) {
        try {
          const ELEMENTO_MODAL = this.unidadModal.nativeElement;
          ELEMENTO_MODAL.style.display = 'block';
          ELEMENTO_MODAL.classList.add('show');
          ELEMENTO_MODAL.setAttribute('aria-modal', 'true');
          ELEMENTO_MODAL.removeAttribute('aria-hidden');
          document.body.classList.add('modal-open');
          
          const FONDO = document.createElement('div');
          FONDO.className = 'modal-backdrop fade show';
          document.body.appendChild(FONDO);
        } catch (fallbackError) {
          // Manejo silencioso de errores
        }
      }
    }
  }

  /**
   * Actualiza el valor de un campo específico en el store del trámite.
   * 
   * Obtiene el valor actual del campo del formulario y lo envía al método
   * correspondiente del store para actualizar el estado global.
   * 
   * @method setValoresStore
   * @memberof VehiculosComponent
   * @param {FormGroup} form - Formulario reactivo del cual obtener el valor
   * @param {string} campo - Nombre del campo cuyo valor se actualizará
   * @param {keyof Tramite40103Store} metodoNombre - Nombre del método del store a ejecutar
   * @returns {void}
   */
  setValoresStore(
    form: FormGroup,
    campo: string,
    metodoNombre: keyof Tramite40103Store
  ): void {
    const VALOR = form.get(campo)?.value;
    (this.store[metodoNombre] as (value: unknown) => void)(VALOR);
  }

/**
 * Inicializa los formularios reactivos de vehículo y unidad de arrastre.
 *
 * - Calcula el siguiente ID disponible para el vehículo.
 * - Crea el formulario reactivo `vehiculoFormulario` con los valores y validaciones requeridas,
 *   utilizando los datos actuales del estado del trámite.
 * - Crea el formulario reactivo `unidadFormulario` para las unidades de arrastre,
 *   también con los valores y validaciones requeridas.
 *
 * Este método prepara ambos formularios para la captura o edición de datos, asegurando que los campos
 * estén correctamente inicializados y validados.
 */
  inicializarFormulario(): void {
    if (!this.tramiteState) {
      return;
    }
    
    this.initializeVehiculoForm();
    this.initializeUnidadForm();
    this.disableIdFields();
  }

  /**
   * Inicializa el formulario de vehículo con datos del estado y próximo ID
   */
  private initializeVehiculoForm(): void {
    const ULTIMO_ID = Array.isArray(this.vehiculosTablaConfig?.datos) && this.vehiculosTablaConfig.datos.length > 0
      ? Math.max(...this.vehiculosTablaConfig.datos.map(v => Number(v.idDeVehiculo) || 0))
      : 0;
    const SIGUIENTE_ID = ULTIMO_ID + 1;

    this.vehiculoFormulario.patchValue({
      idDeVehiculo: SIGUIENTE_ID,
      numero: this.tramiteState.datosVehiculo?.numero || '',
      tipoDeVehiculo: this.tramiteState.datosVehiculo?.tipoDeVehiculo || '',
      numeroPlaca: this.tramiteState.datosVehiculo?.numeroPlaca || '',
      paisEmisor: this.tramiteState.datosVehiculo?.paisEmisor || '',
      estado: this.tramiteState.datosVehiculo?.estado || '',
      marca: this.tramiteState.datosVehiculo?.marca || '',
      modelo: this.tramiteState.datosVehiculo?.modelo || '',
      ano: this.tramiteState.datosVehiculo?.ano || '',
      transponder: this.tramiteState.datosVehiculo?.transponder || '',
      colorVehiculo: this.tramiteState.datosVehiculo?.colorVehiculo || '',
      numuroEconomico: this.tramiteState.datosVehiculo?.numuroEconomico || '',
      numero2daPlaca: this.tramiteState.datosVehiculo?.numero2daPlaca || '',
      estado2daPlaca: this.tramiteState.datosVehiculo?.estado2daPlaca || '',
      paisEmisor2daPlaca: this.tramiteState.datosVehiculo?.paisEmisor2daPlaca || '',
      descripcion: this.tramiteState.datosVehiculo?.descripcion || ''
    });
  }

  /**
   * Inicializa el formulario de unidad con datos del estado y próximo ID
   */
  private initializeUnidadForm(): void {
    const ULTIMO_ID_UNIDAD = Array.isArray(this.unidadesTablaConfig?.datos) && this.unidadesTablaConfig.datos.length > 0
      ? Math.max(...this.unidadesTablaConfig.datos.map(u => Number(u.idDeVehiculo) || 0))
      : 0;
    const SIGUIENTE_ID_UNIDAD = ULTIMO_ID_UNIDAD + 1;

    this.unidadFormulario.patchValue({
      vinVehiculo: this.tramiteState.datosUnidad?.vinVehiculo || '',
      tipoDeUnidadArrastre: this.tramiteState.datosUnidad?.tipoDeUnidadArrastre || '',
      idDeVehiculoUnidad: SIGUIENTE_ID_UNIDAD,
      numeroEconomico: this.tramiteState.datosUnidad?.numeroEconomico || '',
      numeroPlaca: this.tramiteState.datosUnidad?.numeroPlaca || '',
      paisEmisor: this.tramiteState.datosUnidad?.paisEmisor || '',
      estado: this.tramiteState.datosUnidad?.estado || '',
      colorVehiculo: this.tramiteState.datosUnidad?.colorVehiculo || '',
      numero2daPlaca: this.tramiteState.datosUnidad?.numero2daPlaca || '',
      estado2daPlaca: this.tramiteState.datosUnidad?.estado2daPlaca || '',
      paisEmisor2daPlaca: this.tramiteState.datosUnidad?.paisEmisor2daPlaca || '',
      descripcion: this.tramiteState.datosUnidad?.descripcion || ''
    });
  }

  /**
   * Deshabilita los campos de ID en ambos formularios
   */
  private disableIdFields(): void {
    this.vehiculoFormulario.get('idDeVehiculo')?.disable();
    this.unidadFormulario.get('idDeVehiculoUnidad')?.disable();
  }

  /**
   * Valida si un campo específico del formulario es válido.
   * 
   * Utiliza el servicio de validaciones para determinar si el campo
   * cumple con todas las reglas de validación establecidas.
   * 
   * @method isValid
   * @memberof VehiculosComponent
   * @param {FormGroup} form - Formulario reactivo a validar
   * @param {string} field - Nombre del campo a validar
   * @returns {boolean | null} true si es válido, false si es inválido, null si no existe
   */
  isValid(form: FormGroup, field: string): boolean | null {
    return this.validacionesService.isValid(form, field);
  }

  /**
   * Valida los formularios de vehículos y unidades.
   * En este componente se valida que exista al menos un vehículo y una unidad registrados.
   * @returns {boolean} true si hay al menos un vehículo y una unidad registrados, false en caso contrario.
   */
  public validarFormularios(): boolean {
    // Validar que exista al menos un vehículo
    const TIENE_VEHICULOS = this.vehiculosTablaConfig?.datos && this.vehiculosTablaConfig.datos.length > 0;
    
    // Validar que exista al menos una unidad de arrastre
    const TIENE_UNIDADES = this.unidadesTablaConfig?.datos && this.unidadesTablaConfig.datos.length > 0;
    
    return Boolean(TIENE_VEHICULOS && TIENE_UNIDADES);
  }

  /**
   * Índice de edición para la tabla de vehículos.
   * Cuando es null indica modo de agregar nuevo, cuando tiene valor indica modo de edición.
   * 
   * @type {number | null}
   * @memberof VehiculosComponent
   */
  editIndex: number | null = null;

  /**
   * Inicia la edición de un vehículo existente o abre el modal para agregar uno nuevo.
   * 
   * Comportamiento según el parámetro index:
   * - null/undefined: Abre modal para agregar nuevo vehículo
   * - Número válido: Carga datos del vehículo existente para edición
   * - Índice inválido: Abre modal para nuevo vehículo como fallback
   * 
   * Convierte descripciones de catálogos a IDs para edición y maneja el estado
   * del campo descripción según el tipo de vehículo seleccionado.
   * 
   * @method iniciarEdicionVehiculo
   * @memberof VehiculosComponent
   * @param {number | null} index - Índice del vehículo a editar (null para agregar nuevo)
   * @returns {void}
   */
  iniciarEdicionVehiculo(index: number | null): void {
    if (index === null || index === undefined) {
      this.editIndex = null;
      
      this.limpiarDatosVehiculo();
      
      this.abrirModalPedimento();
      return;
    }
    
    try {
      if (!this.vehiculosTablaConfig || !this.vehiculosTablaConfig.datos) {
        this.editIndex = null;
        this.limpiarDatosVehiculo();
        this.abrirModalPedimento();
        return;
      }
      
      if (index < 0 || index >= this.vehiculosTablaConfig.datos.length) {
        this.editIndex = null;
        this.limpiarDatosVehiculo();
        this.abrirModalPedimento();
        return;
      }
      
      this.editIndex = index;
      const VEHICULO_DATOS = this.vehiculosTablaConfig.datos[index];
      
      if (!VEHICULO_DATOS) {
        this.editIndex = null;
        this.limpiarDatosVehiculo();
        this.abrirModalPedimento();
        return;
      }
      
      Object.keys(this.vehiculoFormulario.controls).forEach(key => {
        this.vehiculoFormulario.get(key)?.enable();
      });
      
      this.vehiculoFormulario.get('idDeVehiculo')?.setValue(VEHICULO_DATOS.idDeVehiculo);
      this.vehiculoFormulario.get('numero')?.setValue(VEHICULO_DATOS.numero);
      
      const TIPO_VEHICULO_ID = this.tipoDeVehiculoCatalogo.find(t => t.descripcion === VEHICULO_DATOS.tipoDeVehiculo)?.id || VEHICULO_DATOS.tipoDeVehiculo;
      this.vehiculoFormulario.get('tipoDeVehiculo')?.setValue(TIPO_VEHICULO_ID);
      
      this.vehiculoFormulario.get('numeroPlaca')?.setValue(VEHICULO_DATOS.numeroPlaca);
      
      const PAIS_EMISOR_ID = this.paisEmisorCatalogo.find(p => p.descripcion === VEHICULO_DATOS.paisEmisor)?.id || VEHICULO_DATOS.paisEmisor;
      this.vehiculoFormulario.get('paisEmisor')?.setValue(PAIS_EMISOR_ID);
      
      this.vehiculoFormulario.get('estado')?.setValue(VEHICULO_DATOS.estado);
      this.vehiculoFormulario.get('marca')?.setValue(VEHICULO_DATOS.marca);
      this.vehiculoFormulario.get('modelo')?.setValue(VEHICULO_DATOS.modelo);
      
      const ANO_ID = this.anoCatalogo.find(a => a.descripcion === VEHICULO_DATOS.ano)?.id || VEHICULO_DATOS.ano;
      this.vehiculoFormulario.get('ano')?.setValue(ANO_ID);
      
      this.vehiculoFormulario.get('transponder')?.setValue(VEHICULO_DATOS.transponder);
      
      const COLOR_VEHICULO_ID = this.colorVehiculoCatalogo.find((c: Catalogo) => c.descripcion === VEHICULO_DATOS.colorVehiculo)?.clave || VEHICULO_DATOS.colorVehiculo;
      this.vehiculoFormulario.get('colorVehiculo')?.setValue(COLOR_VEHICULO_ID);
      
      this.vehiculoFormulario.get('numuroEconomico')?.setValue(VEHICULO_DATOS.numuroEconomico);
      this.vehiculoFormulario.get('numero2daPlaca')?.setValue(VEHICULO_DATOS.numero2daPlaca);
      this.vehiculoFormulario.get('estado2daPlaca')?.setValue(VEHICULO_DATOS.estado2daPlaca);
      
      const PAIS_EMISOR_2DA_PLACA_ID = VEHICULO_DATOS.paisEmisor2daPlaca ? (this.paisEmisorCatalogo.find(p => p.descripcion === VEHICULO_DATOS.paisEmisor2daPlaca)?.id || VEHICULO_DATOS.paisEmisor2daPlaca) : VEHICULO_DATOS.paisEmisor2daPlaca;
      this.vehiculoFormulario.get('paisEmisor2daPlaca')?.setValue(PAIS_EMISOR_2DA_PLACA_ID);
      
      this.vehiculoFormulario.get('descripcion')?.setValue(VEHICULO_DATOS.descripcion);
      
      this.vehiculoFormulario.updateValueAndValidity();
      
      const TIPO_VEHICULO = Number(VEHICULO_DATOS.tipoDeVehiculo);
      
      if (TIPO_VEHICULO === 1) {
        this.vehiculoFormulario.get('descripcion')?.enable();
      } else {
        this.vehiculoFormulario.get('descripcion')?.disable();
      }
      
      this.vehiculoFormulario.get('idDeVehiculo')?.disable();
    } catch (error) {
      this.editIndex = null;
      this.limpiarDatosVehiculo();
    }
    
    this.abrirModalPedimento();
  }

/**
 * Agrega o actualiza un vehículo en la tabla de vehículos.
 *
 * - Si el formulario es válido y se está editando un vehículo existente (`editIndex` no es null),
 *   actualiza el registro correspondiente en la tabla.
 * - Si no se está editando, agrega el nuevo vehículo a la lista y actualiza la selección.
 * - Calcula el último ID utilizado en la tabla de vehículos.
 * - Determina el siguiente ID incrementando en uno el valor máximo encontrado.
 * - Restablece el formulario de vehículo a su estado inicial.
 * - Asigna el nuevo ID al campo 'idDeVehiculo' y lo deshabilita para evitar su edición manual.
 */
  agregarDatosVehiculo(): void {
    if (this.vehiculoFormulario.valid) {
      const DATOS_FORMULARIO = this.vehiculoFormulario.getRawValue();
      
      const DATOS_VEHICULO = {
        ...DATOS_FORMULARIO,
        tipoDeVehiculo: this.tipoDeVehiculoCatalogo.find(t => t.id === Number(DATOS_FORMULARIO.tipoDeVehiculo))?.descripcion || DATOS_FORMULARIO.tipoDeVehiculo,
        paisEmisor: this.paisEmisorCatalogo.find(p => p.id === Number(DATOS_FORMULARIO.paisEmisor))?.descripcion || DATOS_FORMULARIO.paisEmisor,
        ano: this.anoCatalogo.find(a => a.id === Number(DATOS_FORMULARIO.ano))?.descripcion || DATOS_FORMULARIO.ano,
        colorVehiculo: this.colorVehiculoCatalogo.find((c: Catalogo) => c.clave === DATOS_FORMULARIO.colorVehiculo)?.descripcion || DATOS_FORMULARIO.colorVehiculo,
        paisEmisor2daPlaca: DATOS_FORMULARIO.paisEmisor2daPlaca ? (this.paisEmisorCatalogo.find(p => p.id === Number(DATOS_FORMULARIO.paisEmisor2daPlaca))?.descripcion || DATOS_FORMULARIO.paisEmisor2daPlaca) : DATOS_FORMULARIO.paisEmisor2daPlaca
      };
      if (this.editIndex !== null) {
        const VEHICULOS_MUTABLES = [...this.vehiculosTablaConfig.datos];
        VEHICULOS_MUTABLES[this.editIndex] = DATOS_VEHICULO;
        this.vehiculosTablaConfig.datos = VEHICULOS_MUTABLES;
        this.editIndex = null;
      } else {
        // Crear una copia mutable del array para agregar el nuevo elemento
        const VEHICULOS_MUTABLES = [...this.vehiculosTablaConfig.datos];
        VEHICULOS_MUTABLES.push(DATOS_VEHICULO);
        this.vehiculosTablaConfig.datos = VEHICULOS_MUTABLES;
        const ULTIMO_INDICE = this.vehiculosTablaConfig.datos.length - 1;
        this.onVehiculoRowSelected([{ index: ULTIMO_INDICE }]);
        
        const ULTIMO_ID = Array.isArray(this.vehiculosTablaConfig?.datos) && this.vehiculosTablaConfig.datos.length > 0
          ? Math.max(...this.vehiculosTablaConfig.datos.map(v => Number(v.idDeVehiculo) || 0))
          : 0;
        const PROXIMO_ID = ULTIMO_ID + 1;
        this.vehiculoFormulario.get('idDeVehiculo')?.setValue(PROXIMO_ID);
      }
      
      this.forceCloseVehiculoModal();
      this.vehiculoFormulario.reset();
      
      this.vehiculoFormulario.get('idDeVehiculo')?.disable();
      this.vehiculoFormulario.get('descripcion')?.disable();
    } else {
      this.vehiculoFormulario.markAllAsTouched();
    }
  }

  /**
   * Índice de edición para la tabla de unidades de arrastre.
   * Cuando es null indica modo de agregar nueva, cuando tiene valor indica modo de edición.
   * 
   * @type {number | null}
   * @memberof VehiculosComponent
   */
  editUnidadIndex: number | null = null;

  /**
   * Inicia la edición de una unidad de arrastre existente o abre el modal para agregar una nueva.
   * 
   * Comportamiento según el parámetro index:
   * - null/undefined: Abre modal para agregar nueva unidad
   * - Número válido: Carga datos de la unidad existente para edición
   * - Índice inválido: Abre modal para nueva unidad como fallback
   * 
   * Convierte descripciones de catálogos a IDs para edición y maneja el estado
   * del campo descripción según el tipo de unidad seleccionado.
   * 
   * @method iniciarEdicionUnidad
   * @memberof VehiculosComponent
   * @param {number | null} index - Índice de la unidad a editar (null para agregar nueva)
   * @returns {void}
   */
  iniciarEdicionUnidad(index: number | null): void {
    if (index === null || index === undefined) {
      this.editUnidadIndex = null;
      this.limpiarDatosUnidad();
      this.abrirModalPedimentoUnidad();
      return;
    }
    
    try {
      if (!this.unidadesTablaConfig || !this.unidadesTablaConfig.datos) {
        this.editUnidadIndex = null;
        this.limpiarDatosUnidad();
        this.abrirModalPedimentoUnidad();
        return;
      }
      
      if (index < 0 || index >= this.unidadesTablaConfig.datos.length) {
        this.editUnidadIndex = null;
        this.limpiarDatosUnidad();
        this.abrirModalPedimentoUnidad();
        return;
      }
      
      this.editUnidadIndex = index;
      const DATOS_UNIDAD_TABLA = this.unidadesTablaConfig.datos[index];
      if (!DATOS_UNIDAD_TABLA) {
        this.editUnidadIndex = null;
        this.limpiarDatosUnidad();
        this.abrirModalPedimentoUnidad();
        return;
      }
    
      Object.keys(this.unidadFormulario.controls).forEach(key => {
        this.unidadFormulario.get(key)?.enable();
      });
      
      this.unidadFormulario.get('idDeVehiculoUnidad')?.setValue(DATOS_UNIDAD_TABLA.idDeVehiculo);
      this.unidadFormulario.get('vinVehiculo')?.setValue(DATOS_UNIDAD_TABLA.vinVehiculo);
      
      const TIPO_UNIDAD_ID = this.tipoArrastreCatalogo.find((t: Catalogo) => t.descripcion === DATOS_UNIDAD_TABLA.tipoDeUnidadArrastre)?.id || DATOS_UNIDAD_TABLA.tipoDeUnidadArrastre;
      this.unidadFormulario.get('tipoDeUnidadArrastre')?.setValue(TIPO_UNIDAD_ID);
      
      this.unidadFormulario.get('numeroEconomico')?.setValue(DATOS_UNIDAD_TABLA.numeroEconomico);
      this.unidadFormulario.get('numeroPlaca')?.setValue(DATOS_UNIDAD_TABLA.numeroPlaca);
      
      const PAIS_EMISOR_ID = this.paisEmisorCatalogo.find(p => p.descripcion === DATOS_UNIDAD_TABLA.paisEmisor)?.id || DATOS_UNIDAD_TABLA.paisEmisor;
      this.unidadFormulario.get('paisEmisor')?.setValue(PAIS_EMISOR_ID);
      
      this.unidadFormulario.get('estado')?.setValue(DATOS_UNIDAD_TABLA.estado);
      const DATOS_UNIDAD = DATOS_UNIDAD_TABLA as unknown as DatosUnidad;
      
      const COLOR_VEHICULO_ID = DATOS_UNIDAD.colorVehiculo ? (this.colorVehiculoCatalogo.find((c: Catalogo) => c.descripcion === DATOS_UNIDAD.colorVehiculo)?.clave || DATOS_UNIDAD.colorVehiculo) : '';
      this.unidadFormulario.get('colorVehiculo')?.setValue(COLOR_VEHICULO_ID);
      
      this.unidadFormulario.get('numero2daPlaca')?.setValue(DATOS_UNIDAD.numero2daPlaca || '');
      this.unidadFormulario.get('estado2daPlaca')?.setValue(DATOS_UNIDAD.estado2daPlaca || '');
      
      const PAIS_EMISOR_2DA_PLACA_ID = DATOS_UNIDAD.paisEmisor2daPlaca ? (this.paisEmisorCatalogo.find(p => p.descripcion === DATOS_UNIDAD.paisEmisor2daPlaca)?.id || DATOS_UNIDAD.paisEmisor2daPlaca) : '';
      this.unidadFormulario.get('paisEmisor2daPlaca')?.setValue(PAIS_EMISOR_2DA_PLACA_ID);
      
      this.unidadFormulario.get('descripcion')?.setValue(DATOS_UNIDAD.descripcion || '');
      
      const TIPO_UNIDAD = Number(DATOS_UNIDAD_TABLA.tipoDeUnidadArrastre);
      
      if (TIPO_UNIDAD === 1) {
        this.unidadFormulario.get('descripcion')?.enable();
      } else {
        this.unidadFormulario.get('descripcion')?.disable();
      }
      
      this.unidadFormulario.get('idDeVehiculoUnidad')?.disable();
    } catch (error) {
      this.editUnidadIndex = null;
      this.limpiarDatosUnidad();
    }
    
    this.abrirModalPedimentoUnidad();
  }

  /**
   * Agrega o actualiza una unidad de arrastre en la tabla de datos.
   * 
   * Comportamiento según el modo:
   * - Modo edición (editUnidadIndex no null): Actualiza registro existente
   * - Modo agregar (editUnidadIndex null): Agrega nuevo registro a la tabla
   * 
   * Realiza las siguientes operaciones:
   * - Convierte IDs de catálogos a descripciones para visualización
   * - Mapea campos del formulario a estructura de datos de tabla
   * - Actualiza arrays de datos de forma inmutable
   * - Cierra el modal y reinicia el formulario
   * - Calcula nuevo ID para próxima unidad
   * 
   * @method agregarDatosUnidad
   * @memberof VehiculosComponent
   * @returns {void}
   */
  agregarDatosUnidad(): void {
    if (this.unidadFormulario.valid) {
      const FORM_DATA = this.unidadFormulario.getRawValue();
      const DATOS_UNIDAD = {
        ...FORM_DATA,
        idDeVehiculo: FORM_DATA.idDeVehiculoUnidad,

        tipoDeUnidadArrastre: this.tipoArrastreCatalogo.find(t => t.id === Number(FORM_DATA.tipoDeUnidadArrastre))?.descripcion || FORM_DATA.tipoDeUnidadArrastre,
        paisEmisor: this.paisEmisorCatalogo.find(p => p.id === Number(FORM_DATA.paisEmisor))?.descripcion || FORM_DATA.paisEmisor,
        colorVehiculo: FORM_DATA.colorVehiculo ? (this.colorVehiculoCatalogo.find((c: Catalogo) => c.clave === FORM_DATA.colorVehiculo)?.descripcion || FORM_DATA.colorVehiculo) : FORM_DATA.colorVehiculo,
        paisEmisor2daPlaca: FORM_DATA.paisEmisor2daPlaca ? (this.paisEmisorCatalogo.find(p => p.id === Number(FORM_DATA.paisEmisor2daPlaca))?.descripcion || FORM_DATA.paisEmisor2daPlaca) : FORM_DATA.paisEmisor2daPlaca
      };
      delete DATOS_UNIDAD.idDeVehiculoUnidad;
      if (this.editUnidadIndex !== null) {
        const UNIDADES_MUTABLES = [...this.unidadesTablaConfig.datos];
        UNIDADES_MUTABLES[this.editUnidadIndex] = DATOS_UNIDAD;
        this.unidadesTablaConfig.datos = UNIDADES_MUTABLES;
        this.editUnidadIndex = null;
      } else {
        // Crear una copia mutable del array para agregar el nuevo elemento
        const UNIDADES_MUTABLES = [...this.unidadesTablaConfig.datos];
        UNIDADES_MUTABLES.push(DATOS_UNIDAD);
        this.unidadesTablaConfig.datos = UNIDADES_MUTABLES;
        const ULTIMO_ID_UNIDAD = Array.isArray(this.unidadesTablaConfig?.datos) && this.unidadesTablaConfig.datos.length > 0
          ? Math.max(...this.unidadesTablaConfig.datos.map(u => Number(u.idDeVehiculo) || 0))
          : 0;
        const PROXIMO_ID_UNIDAD = ULTIMO_ID_UNIDAD + 1;
        this.unidadFormulario.get('idDeVehiculoUnidad')?.setValue(PROXIMO_ID_UNIDAD);
      }
      if (this.unidadModalInstance) {
        this.unidadModalInstance.hide();
      } else {
        this.closeUnidadModal.nativeElement.click();
      }
      
      this.unidadFormulario.reset();
      
      this.unidadFormulario.get('idDeVehiculoUnidad')?.disable();
      this.unidadFormulario.get('descripcion')?.disable();
    } else {
      this.unidadFormulario.markAllAsTouched();
    }
  }

  /**
   * Carga los datos del pedimento en la tabla de vehículos desde el servicio.
   * 
   * Realiza una llamada al servicio para obtener los datos de vehículos
   * y actualiza la tabla de vehículos con la información recibida.
   * Utiliza takeUntil para limpiar la suscripción al destruir el componente.
   * 
   * @method cargarPedimentoTabla
   * @public
   * @memberof VehiculosComponent
   * @returns {void}
   */
  public cargarPedimentoTabla(): void {
    this.modificarTerrestreService
      .obtenerPedimentoTabla()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: VehiculoTablaDatos) => {
        this.vehiculosTablaConfig.datos = datos.datos;
      });
  }

/**
 * Limpia el formulario de vehículo y restablece campos clave a su estado adecuado.
 *
 * - Obtiene el valor actual del campo 'idDeVehiculo' antes de limpiar.
 * - Restablece el formulario de vehículo a su estado inicial.
 * - Restaura el valor de 'idDeVehiculo' y lo deshabilita para evitar su edición.
 * - Deshabilita el campo 'descripcion' tanto en el formulario de vehículo como en el de unidad de arrastre.
 */
  limpiarDatosVehiculo(): void {
    this.editIndex = null;
    
    if (this.vehiculoFormulario) {
      const VALOR_ID = this.vehiculoFormulario.get('idDeVehiculo')?.value;
      this.vehiculoFormulario.reset();
      this.vehiculoFormulario.markAsUntouched();
      this.vehiculoFormulario.markAsPristine();
      this.vehiculoFormulario.get('idDeVehiculo')?.setValue(VALOR_ID);
      this.vehiculoFormulario.get('idDeVehiculo')?.disable();
      this.vehiculoFormulario.get('descripcion')?.disable();
    }
    
    if (this.unidadFormulario) {
      this.unidadFormulario.get('descripcion')?.disable();
    }
  }

/**
 * Limpia el formulario de unidad de arrastre y deshabilita campos de descripción.
 *
 * - Restablece el formulario de unidad de arrastre a su estado inicial.
 * - Deshabilita el campo 'descripcion' tanto en el formulario de unidad de arrastre como en el de vehículo.
 */
  limpiarDatosUnidad(): void {
    this.editUnidadIndex = null;
    
    if (this.unidadFormulario) {
      const VALOR_ID = this.unidadFormulario.get('idDeVehiculoUnidad')?.value;
      this.unidadFormulario.reset();
      this.unidadFormulario.markAsUntouched();
      this.unidadFormulario.markAsPristine();
      this.unidadFormulario.get('idDeVehiculoUnidad')?.setValue(VALOR_ID);
      this.unidadFormulario.get('idDeVehiculoUnidad')?.disable();
      this.unidadFormulario.get('descripcion')?.disable();
    }
    
    if (this.vehiculoFormulario) {
      this.vehiculoFormulario.get('descripcion')?.disable();
    }
  }

/**
 * Abre una notificación modal con los parámetros predefinidos.
 *
 * - Inicializa el objeto `nuevaNotificacion` con los valores necesarios para mostrar una alerta modal.
 * - La notificación es de tipo "alert" y categoría "danger", con un mensaje de confirmación de registro exitoso.
 * - El botón de aceptación se muestra con el texto "Aceptar" y la notificación se cierra automáticamente después de 2 segundos.
 *
 * @method abrirModal
 * @public
 * @returns {void}
 */
  public abrirModal(): void {
    this.nuevaNotificacion = {
      tipoNotificacion: 'alert',
      categoria: 'danger',
      modo: 'action',
      titulo: '',
      mensaje: 'El registro fue agregado correctamente.',
      cerrar: false,
      tiempoDeEspera: 2000,
      txtBtnAceptar: 'Aceptar',
      txtBtnCancelar: '',
    };
  }

/**
 * Carga el catálogo de tipos de vehículo.
 *
 * - Realiza una llamada al servicio `modificarTerrestreService` para obtener el catálogo de tipos de vehículo.
 * - Asigna los datos recibidos a la propiedad `tipoDeVehiculoCatalogo` del componente.
 * - Utiliza `takeUntil(this.destroyNotifier$)` para limpiar la suscripción al destruir el componente.
 *
 * @method cargarTipoDeVehiculo
 * @public
 * @returns {void}
 */
  public cargarTipoDeVehiculo(): void {
    this.modificarTerrestreService
      .obtenerTipoDeVehiculo()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.tipoDeVehiculoCatalogo = datos.datos;
      });
/**
 * Carga los catálogos de tipo de arrastre, año y país emisor.
 *
 * - Realiza llamadas a los servicios correspondientes para obtener los catálogos requeridos.
 * - Asigna los datos recibidos a las propiedades del componente (`tipoArrastre`, `anoCatalogo`, `paisEmisorCatalogo`).
 * - Utiliza `takeUntil(this.destroyNotifier$)` para limpiar las suscripciones al destruir el componente.
 *
 * @effect Actualiza los catálogos utilizados en los formularios de vehículos y unidades de arrastre.
 */
    this.modificarTerrestreService
      .obtenerTipoArrastre()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.tipoArrastre = datos.datos as Catalogo[];
        this.tipoArrastreCatalogo = datos.datos as Catalogo[];
        setTimeout(() => {
          this.setupFormValueSubscriptions();
        }, 100);
      });

    this.modificarTerrestreService
      .obtenerAno()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.anoCatalogo = datos.datos as Catalogo[];
      });

    this.modificarTerrestreService
      .obtenerPaisEmisor()
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((datos: CatalogoLista) => {
        this.paisEmisorCatalogo = datos.datos as Catalogo[];
      });

    /**
     * Carga el catálogo de colores de vehículos si el servicio está disponible.
     */
    if (this.modificarTerrestreService.obtenerColorVehiculo) {
      this.modificarTerrestreService.obtenerColorVehiculo()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((datos: CatalogoLista) => {
          this.colorVehiculoCatalogo = datos.datos as Catalogo[];
        });
    }
  }

  selectedVehiculoIndex: number | null = null;
  selectedUnidadIndex: number | null = null;

  /**
   * Configuración de suscripciones a cambios de valores en formularios.
   * 
   * Establece la lógica para habilitar/deshabilitar el campo 'descripcion' basado
   * en el tipo seleccionado (vehículo o unidad de arrastre):
   * - Si el tipo es 1 (OTROS): habilita el campo descripción
   * - Si es cualquier otro tipo: deshabilita y limpia el campo descripción
   * 
   * También incluye una verificación inicial con setTimeout para asegurar que
   * los formularios estén completamente inicializados antes de verificar estados.
   * 
   * @method setupFormValueSubscriptions
   * @memberof VehiculosComponent
   * @returns {void}
   */
  setupFormValueSubscriptions(): void {
    if (!this.vehiculoFormulario || !this.unidadFormulario) {
      return;
    }

    /**
     * Deshabilita el campo 'descripcion' del formulario de vehículo y lo habilita solo si el tipo seleccionado es 1.
     */
    this.vehiculoFormulario.get('descripcion')?.disable();
    this.vehiculoFormulario.get('tipoDeVehiculo')?.valueChanges
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((selectedValue) => {
        const ID = Number(selectedValue);
        const DESCRIPCION_CONTROL = this.vehiculoFormulario.get('descripcion');
        
        if (ID === 1) {
          DESCRIPCION_CONTROL?.enable();
        } else {
          DESCRIPCION_CONTROL?.disable();
          DESCRIPCION_CONTROL?.setValue(''); 
        }
      });

    /**
     * Deshabilita el campo 'descripcion' del formulario de unidad de arrastre y lo habilita solo si el tipo seleccionado es 1.
     */
    this.unidadFormulario.get('descripcion')?.disable();
    this.unidadFormulario.get('tipoDeUnidadArrastre')?.valueChanges
      .pipe(takeUntil(this.destroyNotifier$))
      .subscribe((selectedValue) => {
        const ID = Number(selectedValue);
        const DESCRIPCION_CONTROL = this.unidadFormulario.get('descripcion');
        if (ID === 1) {
          DESCRIPCION_CONTROL?.enable();
        } else {
          DESCRIPCION_CONTROL?.disable();
          DESCRIPCION_CONTROL?.setValue('');
        }
      });

    /**
     * Verifica y ajusta el estado inicial de los campos de descripción después de la inicialización.
     * 
     * Se ejecuta con un retraso de 100ms para asegurar que los formularios estén completamente inicializados
     * y que los valores de los catálogos se hayan cargado correctamente antes de verificar los estados.
     * 
     * Para el formulario de vehículo:
     * - Obtiene el valor actual del campo 'tipoDeVehiculo'
     * - Si el tipo seleccionado es 1 (OTROS), habilita el campo 'descripcion'
     * - Si es cualquier otro tipo, deshabilita el campo 'descripcion'
     * 
     * Para el formulario de unidad de arrastre:
     * - Obtiene el valor actual del campo 'tipoDeUnidadArrastre'
     * - Si el tipo seleccionado es 1 (OTROS), habilita el campo 'descripcion'
     * - Si es cualquier otro tipo, deshabilita el campo 'descripcion'
     * 
     * @private
     * @method
     * @memberof VehiculosComponent
     * @since 1.0.0
     */
    setTimeout(() => {
      const CURRENT_VEHICULO_VALUE = this.vehiculoFormulario.get('tipoDeVehiculo')?.value;
      if (CURRENT_VEHICULO_VALUE) {
        const ID = Number(CURRENT_VEHICULO_VALUE);
        const DESCRIPCION_CONTROL = this.vehiculoFormulario.get('descripcion');
        
        if (ID === 1) {
          DESCRIPCION_CONTROL?.enable();
        } else {
          DESCRIPCION_CONTROL?.disable();
        }
      }

      const CURRENT_UNIDAD_VALUE = this.unidadFormulario.get('tipoDeUnidadArrastre')?.value;
      if (CURRENT_UNIDAD_VALUE) {
        const ID = Number(CURRENT_UNIDAD_VALUE);
        const DESCRIPCION_CONTROL = this.unidadFormulario.get('descripcion');
        
        if (ID === 1) {
          DESCRIPCION_CONTROL?.enable();
        } else {
          DESCRIPCION_CONTROL?.disable();
        }
      }
    }, 100);
  }

  /**
   * Maneja la selección de filas en la tabla de vehículos.
   * 
   * Busca el índice del vehículo seleccionado usando múltiples identificadores únicos
   * para mayor robustez:
   * - Número de identificación vehicular (VIN)
   * - ID del vehículo
   * - Combinación de número de placa y marca
   * 
   * Si no encuentra coincidencias, usa la referencia del objeto como fallback.
   * 
   * @method onVehiculoRowSelected
   * @memberof VehiculosComponent
   * @param {any} event - Evento de selección que contiene los datos del vehículo seleccionado
   * @returns {void}
   */
  onVehiculoRowSelected(event: unknown[]): void {
    if (Array.isArray(event) && event.length > 0) {
      const SELECTED_VEHICLE = event[0] as VehiculoTabla;
      // Buscar el índice usando múltiples identificadores únicos para mayor robustez
      this.selectedVehiculoIndex = this.vehiculosTablaConfig.datos.findIndex(v => 
        (SELECTED_VEHICLE.numero && v.numero === SELECTED_VEHICLE.numero) ||
        (SELECTED_VEHICLE.idDeVehiculo && v.idDeVehiculo === SELECTED_VEHICLE.idDeVehiculo) ||
        (SELECTED_VEHICLE.numeroPlaca && v.numeroPlaca === SELECTED_VEHICLE.numeroPlaca && 
         SELECTED_VEHICLE.marca && v.marca === SELECTED_VEHICLE.marca)
      );
      
      // Si no se encuentra por los identificadores únicos, usar la referencia como fallback
      if (this.selectedVehiculoIndex === -1) {
        this.selectedVehiculoIndex = this.vehiculosTablaConfig.datos.indexOf(SELECTED_VEHICLE);
      }
    } else {
      this.selectedVehiculoIndex = null;
    }
  }

  /**
   * Maneja la selección de filas en la tabla de unidades de arrastre.
   * 
   * Busca el índice de la unidad seleccionada usando múltiples identificadores únicos
   * para mayor robustez:
   * - VIN del vehículo
   * - ID del vehículo/unidad
   * - Número de placa
   * 
   * Si no encuentra coincidencias, usa la referencia del objeto como fallback.
   * 
   * @method onUnidadRowSelected
   * @memberof VehiculosComponent
   * @param {any} event - Evento de selección que contiene los datos de la unidad seleccionada
   * @returns {void}
   */
  onUnidadRowSelected(event: unknown[]): void {
    if (Array.isArray(event) && event.length > 0) {
      const SELECTED_UNIT = event[0] as UnidadTabla;
      
      // Buscar el índice usando múltiples identificadores únicos para mayor robustez
      this.selectedUnidadIndex = this.unidadesTablaConfig.datos.findIndex(u => 
        (SELECTED_UNIT.vinVehiculo && u.vinVehiculo === SELECTED_UNIT.vinVehiculo) ||
        (SELECTED_UNIT.idDeVehiculo && u.idDeVehiculo === SELECTED_UNIT.idDeVehiculo) ||
        (SELECTED_UNIT.numeroPlaca && u.numeroPlaca === SELECTED_UNIT.numeroPlaca)
      );
      
      // Si no se encuentra por los identificadores únicos, usar la referencia como fallback
      if (this.selectedUnidadIndex === -1) {
        this.selectedUnidadIndex = this.unidadesTablaConfig.datos.indexOf(SELECTED_UNIT);
      }
    } else {
      this.selectedUnidadIndex = null;
    }
  }

  /**
   * Elimina el vehículo seleccionado de la tabla de datos.
   * 
   * Utiliza un enfoque de filtrado robusto con múltiples capas de identificación:
   * 1. Filtrado por número de identificación vehicular (VIN)
   * 2. Filtrado por ID del vehículo
   * 3. Filtrado por combinación placa+marca
   * 4. Comparación de referencia de objeto como fallback
   * 
   * Resetea el índice de selección después de la eliminación.
   * 
   * @method eliminarVehiculoRow
   * @memberof VehiculosComponent
   * @returns {void}
   */
  eliminarVehiculoRow(): void {
    if (this.selectedVehiculoIndex !== null && this.selectedVehiculoIndex >= 0) {
      // Obtener el vehículo a eliminar
      const VEHICULO_A_ELIMINAR = this.vehiculosTablaConfig.datos[this.selectedVehiculoIndex];
      
      if (VEHICULO_A_ELIMINAR) {
        // Crear conjuntos de identificadores únicos para filtrado eficiente
        const NUMEROS_A_ELIMINAR = new Set([VEHICULO_A_ELIMINAR.numero].filter(Boolean));
        const IDS_A_ELIMINAR = new Set([VEHICULO_A_ELIMINAR.idDeVehiculo].filter(Boolean));
        const PLACAS_MARCAS_A_ELIMINAR = new Set();
        
        // Crear identificador compuesto para placa+marca si ambos existen
        if (VEHICULO_A_ELIMINAR.numeroPlaca && VEHICULO_A_ELIMINAR.marca) {
          PLACAS_MARCAS_A_ELIMINAR.add(`${VEHICULO_A_ELIMINAR.numeroPlaca}|${VEHICULO_A_ELIMINAR.marca}`);
        }
        
        // Filtrar usando múltiples capas de identificación
        this.vehiculosTablaConfig.datos = this.vehiculosTablaConfig.datos.filter(vehiculo => {
          // Primera capa: filtrar por número (VIN)
          if (vehiculo.numero && NUMEROS_A_ELIMINAR.has(vehiculo.numero)) {
            return false;
          }
          
          // Segunda capa: filtrar por ID
          if (vehiculo.idDeVehiculo && IDS_A_ELIMINAR.has(vehiculo.idDeVehiculo)) {
            return false;
          }
          
          // Tercera capa: filtrar por combinación placa+marca
          if (vehiculo.numeroPlaca && vehiculo.marca) {
            const COMBO_ID = `${vehiculo.numeroPlaca}|${vehiculo.marca}`;
            if (PLACAS_MARCAS_A_ELIMINAR.has(COMBO_ID)) {
              return false;
            }
          }
          
          // Cuarta capa: comparación de referencia de objeto como fallback
          return vehiculo !== VEHICULO_A_ELIMINAR;
        });
      }
      
      this.selectedVehiculoIndex = null;
    }
  }

  /**
   * Elimina la unidad de arrastre seleccionada de la tabla de datos.
   * 
   * Utiliza un enfoque de filtrado robusto con múltiples capas de identificación:
   * 1. Filtrado por VIN del vehículo
   * 2. Filtrado por ID del vehículo/unidad
   * 3. Filtrado por número de placa
   * 4. Comparación de referencia de objeto como fallback
   * 
   * Resetea el índice de selección después de la eliminación.
   * 
   * @method eliminarUnidadRow
   * @memberof VehiculosComponent
   * @returns {void}
   */
  eliminarUnidadRow(): void {
    if (this.selectedUnidadIndex !== null && this.selectedUnidadIndex >= 0) {
      // Obtener la unidad a eliminar
      const UNIDAD_A_ELIMINAR = this.unidadesTablaConfig.datos[this.selectedUnidadIndex];
      
      if (UNIDAD_A_ELIMINAR) {
        // Crear conjuntos de identificadores únicos para filtrado eficiente
        const VINS_A_ELIMINAR = new Set([UNIDAD_A_ELIMINAR.vinVehiculo].filter(Boolean));
        const IDS_A_ELIMINAR = new Set([UNIDAD_A_ELIMINAR.idDeVehiculo].filter(Boolean));
        const PLACAS_A_ELIMINAR = new Set([UNIDAD_A_ELIMINAR.numeroPlaca].filter(Boolean));
        
        // Filtrar usando múltiples capas de identificación
        this.unidadesTablaConfig.datos = this.unidadesTablaConfig.datos.filter(unidad => {
          // Primera capa: filtrar por VIN
          if (unidad.vinVehiculo && VINS_A_ELIMINAR.has(unidad.vinVehiculo)) {
            return false;
          }
          
          // Segunda capa: filtrar por ID
          if (unidad.idDeVehiculo && IDS_A_ELIMINAR.has(unidad.idDeVehiculo)) {
            return false;
          }
          
          // Tercera capa: filtrar por número de placa
          if (unidad.numeroPlaca && PLACAS_A_ELIMINAR.has(unidad.numeroPlaca)) {
            return false;
          }
          
          // Cuarta capa: comparación de referencia de objeto como fallback
          return unidad !== UNIDAD_A_ELIMINAR;
        });
      }
      
      this.selectedUnidadIndex = null;
    }
  }

  /**
   * Busca la descripción en un catálogo por su clave.
   * @param {string} clave - Clave a buscar en el catálogo.
   * @param {Catalogo[]} catalogo - Array del catálogo donde buscar.
   * @returns {string} La descripción encontrada o la clave original si no se encuentra.
   */
  private static obtenerDescripcionDeCatalogo(clave: string, catalogo: Catalogo[]): string {
    if (!clave || !catalogo || catalogo.length === 0) {
      return clave || '';
    }
    const ITEM = catalogo.find(c => c.clave === clave);
    return ITEM ? ITEM.descripcion : clave;
  }

  /**
   * Obtiene la descripción del tipo de vehículo.
   * @param {VehiculoTabla} item - Elemento de la tabla de vehículos.
   * @returns {string} Descripción del tipo de vehículo.
   */
  private obtenerTipoVehiculoDescripcion = (item: VehiculoTabla): string => {
    return VehiculosComponent.obtenerDescripcionDeCatalogo(item.tipoDeVehiculo, this.tipoDeVehiculoCatalogo);
  }

  /**
   * Obtiene la descripción del país emisor.
   * @param {VehiculoTabla} item - Elemento de la tabla de vehículos.
   * @returns {string} Descripción del país emisor.
   */
  private obtenerPaisEmisorDescripcion = (item: VehiculoTabla): string => {
    return VehiculosComponent.obtenerDescripcionDeCatalogo(item.paisEmisor, this.paisEmisorCatalogo);
  }

  /**
   * Obtiene la descripción del año.
   * @param {VehiculoTabla} item - Elemento de la tabla de vehículos.
   * @returns {string} Descripción del año.
   */
  private obtenerAnoDescripcion = (item: VehiculoTabla): string => {
    return VehiculosComponent.obtenerDescripcionDeCatalogo(item.ano, this.anoCatalogo);
  }

  /**
   * Obtiene la descripción del color del vehículo.
   * @param {VehiculoTabla} item - Elemento de la tabla de vehículos.
   * @returns {string} Descripción del color.
   */
  private obtenerColorVehiculoDescripcion = (item: VehiculoTabla): string => {
    return VehiculosComponent.obtenerDescripcionDeCatalogo(item.colorVehiculo, this.colorVehiculoCatalogo);
  }

  /**
   * Obtiene la descripción del país emisor de la segunda placa.
   * @param {VehiculoTabla} item - Elemento de la tabla de vehículos.
   * @returns {string} Descripción del país emisor de la segunda placa.
   */
  private obtenerPaisEmisor2daPlacaDescripcion = (item: VehiculoTabla): string => {
    return VehiculosComponent.obtenerDescripcionDeCatalogo(item.paisEmisor2daPlaca, this.paisEmisorCatalogo);
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * 
   * Realiza las siguientes operaciones de limpieza:
   * - Completa y cierra el Subject destroyNotifier$ para cancelar suscripciones
   * - Destruye instancias de modales Bootstrap para evitar fugas de memoria
   * - Limpia referencias a instancias de modales
   * 
   * Previene fugas de memoria y garantiza una destrucción limpia del componente.
   * 
   * @method ngOnDestroy
   * @memberof VehiculosComponent
   * @returns {void}
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
    
    // Limpiar instancias de modales
    if (this.vehiculoModalInstance) {
      this.vehiculoModalInstance.dispose();
      this.vehiculoModalInstance = null;
    }
    
    if (this.unidadModalInstance) {
      this.unidadModalInstance.dispose();
      this.unidadModalInstance = null;
    }
  }
}

