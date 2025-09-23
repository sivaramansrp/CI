/**
 * @fileoverview Componente para el primer paso del trámite de elegibilidad de textiles (120301)
 * @description Este archivo contiene la implementación del componente PasoUnoComponent que maneja
 * la interfaz de usuario y la lógica del primer paso del proceso de elegibilidad de textiles.
 * @version 1.0.0
 * @author Sistema VUCEM 3.0
 * @since 2025
 */

import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

import {
  ConsultaioQuery,
  ConsultaioState,
  ConsultaioStore,
} from '@ng-mf/data-access-user';

import { ElegibilidadDeTextilesStore } from '../../estados/elegibilidad-de-textiles.store';
import { ElegibilidadTextilesService } from '../../services/elegibilidad-textiles/elegibilidad-textiles.service';

import { PersonaTerceros } from '@ng-mf/data-access-user';

import { Subject, map, takeUntil } from 'rxjs';
import { CapturarFacturasComponent } from '../../components/capturar-facturas/capturar-facturas.component';
import { ConstanciaDelRegistroComponent } from '../../components/constancia-del-registro/constancia-del-registro.component';
import { FormularioAsociacionFacturaComponent } from '../../components/facturas-asociadas/facturas-asociadas.component';
import { HistoricoFabricantesComponent } from '../../components/historico-fabricantes/historico-fabricantes.component';
import { ImportadorEnDestinoComponent } from '../../components/importador-en-destino/importador-en-destino.component';

/**
 * @class PasoUnoComponent
 * @description
 * Componente Angular responsable de manejar el primer paso del trámite de elegibilidad de textiles (120301).
 * Este componente gestiona la interfaz de usuario de pestañas, controla el estado del formulario,
 * y maneja la carga de datos previos cuando el trámite está en modo de actualización.
 * 
 * Implementa los interfaces OnInit y OnDestroy para manejar adecuadamente el ciclo de vida
 * del componente y evitar fugas de memoria mediante la gestión de suscripciones RxJS.
 *
 * @implements {OnInit} - Para inicialización del componente
 * @implements {OnDestroy} - Para limpieza al destruir el componente
 * 
 * @example
 * ```html
 * <!-- Uso básico del componente -->
 * <app-paso-uno></app-paso-uno>
 * ```
 * 
 * @example
 * ```typescript
 * // Inyección en otro componente
 * constructor(private pasoUnoRef: PasoUnoComponent) {}
 * ```
 *
 * @property {boolean} formularioDeshabilitado - Indica si el formulario está deshabilitado para edición
 * @property {number} indice - El índice de la pestaña actualmente seleccionada
 * @property {boolean} mostrarOtraPestana - Controla la visibilidad de pestañas adicionales
 * @property {Subject<void>} destroyNotifier$ - Subject privado para manejar la destrucción del componente
 * @property {ConsultaioState} consultaState - Estado actual de la consulta del trámite
 *
 * @method constructor Inicializa las dependencias del componente
 * @method seleccionaTab Cambia la pestaña activa del componente
 * @method ngOnInit Inicializa el componente y configura suscripciones
 * @method onMostrarTabs Maneja la visibilidad de pestañas adicionales
 * @method cargarDatosPrevios Carga datos existentes del trámite
 * @method ngOnDestroy Limpia recursos y cancela suscripciones
 *
 * @since 1.0.0
 * @version 1.0.0
 * @author Sistema VUCEM 3.0
 * 
 * @see {@link ConsultaioQuery} - Servicio de consulta de estado
 * @see {@link ConsultaioStore} - Store de estado de consulta
 * @see {@link ElegibilidadDeTextilesStore} - Store específico de elegibilidad de textiles
 * @see {@link ElegibilidadTextilesService} - Servicio de lógica de negocio de textiles
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styles: ``,
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * @property {EventEmitter<boolean>} mostrarOtraPestanaChange
   * @description
   * Evento de salida que notifica al componente padre cuando cambia el estado de visibilidad de pestañas adicionales.
   * Se emite un valor booleano (`true` para mostrar, `false` para ocultar) cada vez que el usuario realiza una acción
   * que afecta la visualización de pestañas extra en el flujo del trámite.
   * Permite la comunicación entre el componente hijo y el padre para coordinar la interfaz de usuario.
   * @public
   * @memberof PasoUnoComponent
   * @example
   * ```typescript
   * // En el componente padre
   * <app-paso-uno (mostrarOtraPestanaChange)="onCambioPestana($event)"></app-paso-uno>
   * // En el hijo
   * this.mostrarOtraPestanaChange.emit(true);
   * ```
   */
  @Output() mostrarOtraPestanaChange = new EventEmitter<boolean>();
  /**
   * @property {number} indice
   * @description Índice de la pestaña actualmente seleccionada en el paso uno.
   * @default 1
   */
  indice: number = 1;

  /**
   * @property {boolean} formularioDeshabilitado
   * @description Indica si el formulario está deshabilitado para edición.
   * @default false
   */
  formularioDeshabilitado: boolean = false;

  /**
   * @property {EventEmitter<void>} tabChanged
   * @description Evento emitido cuando la pestaña activa cambia.
   */
  @Output() tabChanged = new EventEmitter<void>();

  /**
   * @property {EventEmitter<boolean>} errorValidacion
   * @description Evento emitido cuando hay errores de validación en el formulario de año.
   */
  @Output() errorValidacion = new EventEmitter<boolean>();

  /**
   * @property {ConstanciaDelRegistroComponent} constanciaDelRegistroComp
   * @description Referencia al componente de constancia del registro de origen.
   */
  @ViewChild('constanciaDelRegistroRef') constanciaDelRegistroComp!: ConstanciaDelRegistroComponent;

  /**
   * @property {FormularioAsociacionFacturaComponent} formularioAsociacionFacturaComp
   * @description Referencia al componente de asociación de facturas.
   */
  @ViewChild('formularioAsociacionFacturaRef') formularioAsociacionFacturaComp!: FormularioAsociacionFacturaComponent;

  /**
   * @property {CapturarFacturasComponent} capturarFacturasComp
   * @description Referencia al componente de captura de facturas.
   */
  @ViewChild('capturarFacturasRef') capturarFacturasComp!: CapturarFacturasComponent;

  /**
   * @property {HistoricoFabricantesComponent} historicoFabricantesComp
   * @description Referencia al componente de histórico de fabricantes.
   */
  @ViewChild('historicoFabricantesRef') historicoFabricantesComp!: HistoricoFabricantesComponent;

  /**
   * @property {ImportadorEnDestinoComponent} importadorEnDestinoComp
   * @description Referencia al componente de importador en destino.
   */
  @ViewChild('importadorEnDestinoRef') importadorEnDestinoComp!: ImportadorEnDestinoComponent;

  /**
   * Maneja el evento emitido por el componente hijo para mostrar pestañas adicionales.
   * @param event Valor booleano emitido por el hijo.
   */
  /**
   * @method onMostrarTabs
   * @description
   * Maneja el evento emitido por el componente hijo para mostrar u ocultar pestañas adicionales.
   * Si el evento es verdadero, habilita la visualización de la pestaña extra y avanza el índice a la pestaña de facturas asociadas.
   * Si el evento es falso, oculta la pestaña adicional. En ambos casos, emite el cambio al componente padre mediante mostrarOtraPestanaChange.
   * @param {boolean} event - Valor booleano que indica si se deben mostrar las pestañas adicionales.
   * @returns {void} No retorna ningún valor.
   * @example
   * // Desde el hijo: this.mostrarTabs.emit(true);
   * // Desde el padre: <app-paso-uno (mostrarOtraPestanaChange)="onCambioPestana($event)"></app-paso-uno>
   */
  public onMostrarTabs(event: boolean): void {
    if (event) {
      this.mostrarOtraPestana = true;
      this.indice = 3; // Avanza a la siguiente tab (Facturas asociadas)
      this.mostrarOtraPestanaChange.emit(this.mostrarOtraPestana);
    } else {
      this.mostrarOtraPestana = false;
      this.mostrarOtraPestanaChange.emit(this.mostrarOtraPestana);
    }
  }

  /**
   * Maneja el evento de error de validación emitido por el componente hijo.
   * @param event Valor booleano que indica si hay errores de validación.
   */
  public alErrorDeValidacion(event: boolean): void {
    this.errorValidacion.emit(event);
  }
  /**
   * @property {boolean} mostrarOtraPestana
   * @description
   * Controla la visibilidad de pestañas adicionales en la interfaz del componente.
   * Se establece como `true` cuando el componente hijo emite un evento indicando
   * que las pestañas adicionales deben ser mostradas al usuario.
   * 
   * @type {boolean}
   * @default false
   * @public
   * @memberof PasoUnoComponent
   * @since 1.0.0
   * 
   * @example
   * ```typescript
   * // Las pestañas adicionales se muestran cuando el hijo emite el evento
   * onMostrarTabs(true); // this.mostrarOtraPestana se convierte en true
   * ```
   */
  mostrarOtraPestana: boolean = false;

  /**
   * @property {Subject<void>} destroyNotifier$
   * @description
   * Subject privado utilizado para notificar la destrucción del componente.
   * Se utiliza con el operador `takeUntil` para cancelar automáticamente
   * todas las suscripciones activas cuando el componente es destruido,
   * evitando así fugas de memoria en la aplicación.
   * 
   * @type {Subject<void>}
   * @private
   * @readonly
   * @memberof PasoUnoComponent
   * @since 1.0.0
   * 
   * @example
   * ```typescript
   * // Uso típico para evitar fugas de memoria
   * this.someObservable$
   *   .pipe(takeUntil(this.destroyNotifier$))
   *   .subscribe(data => {
   *     // lógica de manejo de datos
   *   });
   * ```
   */
  private destroyNotifier$: Subject<void> = new Subject();

   
  /**
   * Indica si existen datos de respuesta para mostrar en el formulario.
   * @type {boolean}
   */
  public esDatosRespuesta: boolean = false;

  /**
   * @property {ConsultaioState} consultaState
   * @description
   * Estado actual relacionado con la consulta del trámite de elegibilidad de textiles.
   * Contiene información sobre el modo de operación (readonly, update), datos del trámite,
   * y otros metadatos necesarios para el funcionamiento del componente.
   * Se actualiza automáticamente a través de la suscripción al ConsultaioQuery.
   * 
   * @type {ConsultaioState}
   * @public
   * @memberof PasoUnoComponent
   * @since 1.0.0
   * 
   * @example
   * ```typescript
   * // Verificar el estado para determinar el comportamiento
   * if (this.consultaState.update) {
   *   this.cargarDatosPrevios();
   * } else if (this.consultaState.readonly) {
   *   this.formularioDeshabilitado = true;
   * }
   * ```
   */
 public consultaState!: ConsultaioState;
   /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   */
  esFormularioSoloLectura: boolean = false;

    /**
   * Lista de personas relacionadas con el trámite.
   * @type {PersonaTerceros[]}
   */
  public personas: PersonaTerceros[] = [];

  /**
   * Tracking de tabs completadas
   * Almacena qué tabs han sido visitadas y completadas por el usuario
   * @type {Set<number>}
   */
  tabsCompletadas: Set<number> = new Set();

  /**
   * @method seleccionaTab
   * @description
   * Selecciona una pestaña específica y actualiza el índice correspondiente.
   * Este método es utilizado para cambiar la pestaña activa en la interfaz de usuario,
   * permitiendo al usuario navegar entre diferentes secciones del primer paso del trámite.
   * 
   * @param {number} i - El índice de la pestaña que se desea seleccionar.
   *                    Debe ser un número entero positivo que represente
   *                    una pestaña válida en la interfaz.
   * 
   * @returns {void} No retorna ningún valor.
   * 
   * @public
   * @memberof PasoUnoComponent
   * @since 1.0.0
   * 
   * @example
   * ```typescript
   * // Seleccionar la primera pestaña
   * this.seleccionaTab(1);
   * 
   * // Seleccionar la tercera pestaña
   * this.seleccionaTab(3);
   * 
   * // Uso desde el template
   * // <button (click)="seleccionaTab(2)">Ir a pestaña 2</button>
   * ```
   */
  seleccionaTab(i: number): void {
    // Marcar la tab actual como completada si tiene form válido
    this.marcarTabComoCompletada(this.indice);

    this.indice = i;

    this.ElegibilidadDeTextilesStore.setPestanaActiva(this.indice);
    this.tabChanged.emit(); // Emite evento cuando cambia de tab
  }

  /**
   * Marca una tab como completada si su formulario es válido
   * @param tabIndex - Índice de la tab a verificar
   */
  private marcarTabComoCompletada(tabIndex: number): void {
    let isValid = false;

    // Tab 2: Constancia Del Registro de origen
    if (tabIndex === 2 && this.constanciaDelRegistroComp?.fitosanitarioForm) {
      isValid = this.constanciaDelRegistroComp.fitosanitarioForm.valid;
    }

    // Tab 3: Asociacion Factura
    if (tabIndex === 3 && this.formularioAsociacionFacturaComp?.formularioAsociacionFactura) {
      isValid = this.formularioAsociacionFacturaComp.formularioAsociacionFactura.valid;
    }

    // Tab 4: capturar Facturas  
    if (tabIndex === 4 && this.capturarFacturasComp?.facturaForm) {
      isValid = this.capturarFacturasComp.facturaForm.valid;
    }

    // Tab 5: Datos certificado
    if (tabIndex === 5 && this.historicoFabricantesComp?.historicoFabricantesForm) {
      isValid = this.historicoFabricantesComp.historicoFabricantesForm.valid;
    }

    // Tab 6: Datos certificado
    if (tabIndex === 6 && this.importadorEnDestinoComp?.importadorForm) {
      isValid = this.importadorEnDestinoComp.importadorForm.valid;
    }


    // Si es válida, marcarla como completada
    if (isValid) {
      this.tabsCompletadas.add(tabIndex);
    } else if ([2, 3, 4, 5, 6].includes(tabIndex)) {
      // Si es una tab requerida pero inválida, removerla de completadas
      this.tabsCompletadas.delete(tabIndex);
    }
  }

  /**
   * Valida todos los formularios del paso uno.
   * 
   * Requiere que TODAS las tabs necesarias estén completadas:
   * - Tab 2: Certificado de origen
   * - Tab 4: Destinatario  
   * - Tab 5: Datos certificado
   * 
   * @returns {boolean} `true` si TODAS las tabs requeridas están completadas
   */
  public validarTodosLosFormularios(): boolean {
    // Marcar la tab actual como completada antes de validar
    this.marcarTabComoCompletada(this.indice);

    // Tabs requeridas que deben estar completadas
    const REQUIRED_TABS = [2, 4, 5];

    // Verificar si todas las tabs requeridas están completadas
    const ALL_TABS_COMPLETED = REQUIRED_TABS.every(tab => this.tabsCompletadas.has(tab));

    // Si no todas están completadas, mostrar errores en la tab actual
    if (!ALL_TABS_COMPLETED) {
      // Validar y mostrar errores en la tab actual
      if (this.indice === 2 && this.constanciaDelRegistroComp?.fitosanitarioForm) {
        this.constanciaDelRegistroComp.fitosanitarioForm.markAllAsTouched();
      }

      if (this.indice === 3 && this.formularioAsociacionFacturaComp?.formularioAsociacionFactura) {
        this.formularioAsociacionFacturaComp.formularioAsociacionFactura.markAllAsTouched();
      }

      if (this.indice === 4 && this.capturarFacturasComp?.facturaForm) {
        this.capturarFacturasComp.facturaForm.markAllAsTouched();
      }

      if (this.indice === 5 && this.historicoFabricantesComp?.historicoFabricantesForm) {
        this.historicoFabricantesComp.historicoFabricantesForm.markAllAsTouched();
      }

      if (this.indice === 6 && this.importadorEnDestinoComp?.importadorForm) {
        this.importadorEnDestinoComp.importadorForm.markAllAsTouched();
      }
    }

    // Verificar que todas las tabs requeridas estén completadas
    return ALL_TABS_COMPLETED;
  }
  /**
   * @constructor
   * @description
   * Constructor del componente PasoUnoComponent que inicializa todas las dependencias
   * necesarias para el funcionamiento del primer paso del trámite de elegibilidad de textiles.
   * Se inyectan los servicios y stores requeridos para la gestión de estado y lógica de negocio.
   * 
   * @param {ConsultaioQuery} consultaQuery - Servicio para consultar el estado de la consulta del trámite
   * @param {ConsultaioStore} consultaStore - Store para gestionar el estado global de la consulta
   * @param {ElegibilidadDeTextilesStore} ElegibilidadDeTextilesStore - Store específico para el estado de elegibilidad de textiles
   * @param {ElegibilidadTextilesService} elegibilidadTextilesService - Servicio con la lógica de negocio para textiles
   * 
   * @memberof PasoUnoComponent
   * @since 1.0.0
   * 
   * @example
   * ```typescript
   * // El constructor es llamado automáticamente por Angular DI
   * // No es necesario instanciarlo manualmente
   * const component = TestBed.createComponent(PasoUnoComponent);
   * ```
   */
  constructor(
    private consultaQuery: ConsultaioQuery,
    private consultaStore: ConsultaioStore,
    private ElegibilidadDeTextilesStore: ElegibilidadDeTextilesStore,
    private elegibilidadTextilesService: ElegibilidadTextilesService
  ) {}

  /**
   * @method ngOnInit
   * @description
   * Método del ciclo de vida de Angular que se ejecuta después de la inicialización del componente.
   * Configura la suscripción al estado de consulta para reaccionar automáticamente a cambios
   * en el modo de operación (readonly/update) y ejecutar las acciones correspondientes.
   * 
   * Establece el comportamiento del formulario basado en el estado:
   * - Si está en modo 'update': habilita el formulario y carga datos previos
   * - Si está en modo 'readonly': deshabilita el formulario para solo lectura
   * 
   * @returns {void} No retorna ningún valor.
   * 
   * @implements {OnInit}
   * @public
   * @memberof PasoUnoComponent
   * @since 1.0.0
   * 
   * @example
   * ```typescript
   * // ngOnInit es llamado automáticamente por Angular
   * // después de la construcción del componente
   * ngOnInit() {
   *   // lógica de inicialización
   * }
   * ```
   */
  ngOnInit(): void {
        this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.destroyNotifier$),
        map((seccionState) => {
          this.consultaState = seccionState;
          this.esFormularioSoloLectura = seccionState.readonly;
          // Normal logic: readonly true = disable fields, readonly false = enable fields
          this.formularioDeshabilitado = seccionState.readonly;
          if (this.consultaState.update) {
            this.guardarDatosFormulario();
          } else {
            this.esDatosRespuesta = true;
          }
        })
      )
      .subscribe();
  }
    /**
     * Guarda los datos del formulario obtenidos del servicio.
     * Este método se suscribe al servicio para obtener los datos de la solicitud
     * y actualiza el estado del formulario con la información recibida.
     * @method guardarDatosFormulario
     */
    guardarDatosFormulario(): void {
      this.elegibilidadTextilesService
        .getPrefillDatos()
        .pipe(takeUntil(this.destroyNotifier$))
        .subscribe((resp) => {
          if (resp) {
            this.esDatosRespuesta = true;
            this.personas =
              (resp as { personas?: PersonaTerceros[] }).personas || [];
            this.elegibilidadTextilesService.actualizarEstadoFormulario(resp);
          }
        });
    }
  /**
   * @method onMostrarTabs
   * @description
   * Maneja el evento emitido por un componente hijo para controlar la visibilidad de pestañas adicionales.
   * Este método se ejecuta cuando el componente hijo determina que se deben mostrar pestañas extra
   * basándose en la lógica de negocio o en la entrada del usuario. Solo actualiza el estado
   * cuando el valor recibido es verdadero, manteniendo la visibilidad una vez habilitada.
   * 
   * @param {boolean} value - Valor booleano emitido por el componente hijo que indica
   *                         si las pestañas adicionales deben ser mostradas.
   *                         - `true`: Las pestañas adicionales se mostrarán
   *                         - `false`: No realiza ninguna acción (mantiene el estado actual)
   * 
   * @returns {void} No retorna ningún valor.
   * 
   * @public
   * @memberof PasoUnoComponent
   * @since 1.0.0
   * 
   * @example
   * ```typescript
   * // Uso desde el template del componente hijo
   * // <app-hijo-component (mostrarTabs)="onMostrarTabs($event)"></app-hijo-component>
   * 
   * // El componente hijo emite el evento
   * // this.mostrarTabs.emit(true);
   * 
   * // Resultado: this.mostrarOtraPestana = true
   * ```
   * 
   * @example
   * ```html
   * <!-- Uso en el template del componente padre -->
   * <app-formulario-hijo 
   *   (mostrarTabsEvent)="onMostrarTabs($event)"
   *   [formularioDeshabilitado]="formularioDeshabilitado">
   * </app-formulario-hijo>
   * ```
   */

  /**
   * @method cargarDatosPrevios
   * @description
   * Carga datos previos del trámite desde el servicio de elegibilidad de textiles y actualiza
   * el estado en el store correspondiente. Este método se utiliza cuando el trámite está en
   * modo de actualización ('update') para cargar la información existente y permitir su edición.
   * 
   * La carga de datos se realiza de forma asíncrona a través de un observable que se suscribe
   * automáticamente y utiliza el patrón `takeUntil` para evitar fugas de memoria al destruir
   * el componente. Una vez obtenidos los datos, se actualizan en el store local del componente.
   * 
   * @returns {void} No retorna ningún valor.
   * 
   * @private
   * @memberof PasoUnoComponent
   * @since 1.0.0
   * 
   * @throws {Error} Podría lanzar errores si el servicio de elegibilidad de textiles falla
   *                 o si hay problemas de conectividad con el backend.
   * 
   * @example
   * ```typescript
   * // Se llama automáticamente cuando el estado cambia a 'update'
   * if (this.consultaState.update) {
   *   this.formularioDeshabilitado = false;
   *   this.cargarDatosPrevios(); // Carga los datos existentes
   * }
   * ```
   * 
   * @example
   * ```typescript
   * // El flujo interno del método
   * cargarDatosPrevios(): void {
   *   // 1. Obtiene observable de datos prefill
   *   const PREFILL_DATOS = this.elegibilidadTextilesService.getPrefillDatos();
   *   
   *   // 2. Se suscribe con protección contra fugas de memoria
   *   PREFILL_DATOS.pipe(takeUntil(this.destroyNotifier$))
   *     .subscribe((datos) => {
   *       // 3. Actualiza el store con los datos cargados
   *       this.ElegibilidadDeTextilesStore.setTextilesState(datos);
   *     });
   * }
   * ```
   * 
   * @see {@link ElegibilidadTextilesService#getPrefillDatos} - Método que obtiene los datos del servicio
   * @see {@link ElegibilidadDeTextilesStore#setTextilesState} - Método que actualiza el estado del store
   */
  cargarDatosPrevios(): void {
    const PREFILL_DATOS = this.elegibilidadTextilesService.getPrefillDatos();
    PREFILL_DATOS.pipe(takeUntil(this.destroyNotifier$)).subscribe((datos) => {
      this.ElegibilidadDeTextilesStore.setTextilesState(datos);
    });
  }

  /**
   * @method ngOnDestroy
   * @description
   * Método del ciclo de vida de Angular que se ejecuta automáticamente cuando el componente
   * está a punto de ser destruido. Este método es crucial para la gestión de memoria y
   * la prevención de fugas (memory leaks) en la aplicación.
   * 
   * Realiza las siguientes acciones de limpieza:
   * 1. Emite una señal a través del `destroyNotifier$` para notificar a todas las suscripciones activas
   * 2. Completa el Subject `destroyNotifier$` para liberar todos sus recursos internos
   * 
   * Todas las suscripciones que utilizan `takeUntil(this.destroyNotifier$)` se cancelarán
   * automáticamente cuando este método se ejecute, garantizando una limpieza adecuada.
   * 
   * @returns {void} No retorna ningún valor.
   * 
   * @implements {OnDestroy}
   * @public
   * @memberof PasoUnoComponent
   * @since 1.0.0
   * 
   * @example
   * ```typescript
   * // ngOnDestroy es llamado automáticamente por Angular
   * // cuando el componente va a ser destruido (ej: navegación, etc.)
   * 
   * // Esto cancela automáticamente todas las suscripciones como:
   * this.consultaQuery.selectConsultaioState$
   *   .pipe(takeUntil(this.destroyNotifier$)) // Se cancela aquí
   *   .subscribe();
   * ```
   * 
   * @example
   * ```typescript
   * // Patrón típico de uso en otros observables del componente
   * this.someService.getData()
   *   .pipe(takeUntil(this.destroyNotifier$))
   *   .subscribe(data => {
   *     // Esta suscripción se cancela automáticamente
   *     // cuando ngOnDestroy() se ejecuta
   *   });
   * ```
   * 
   * @see {@link OnDestroy} - Interface de Angular para el ciclo de vida
   * @see {@link Subject#next} - Método para emitir valores en el Subject
   * @see {@link Subject#complete} - Método para completar el Subject
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
