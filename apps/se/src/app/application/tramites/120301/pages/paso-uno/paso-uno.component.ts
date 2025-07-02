/**
 * @fileoverview Componente para el primer paso del trámite de elegibilidad de textiles (120301)
 * @description Este archivo contiene la implementación del componente PasoUnoComponent que maneja
 * la interfaz de usuario y la lógica del primer paso del proceso de elegibilidad de textiles.
 * @version 1.0.0
 * @author Sistema VUCEM 3.0
 * @since 2025
 */

import { Component, OnDestroy, OnInit } from '@angular/core';

import {
  ConsultaioQuery,
  ConsultaioState,
  ConsultaioStore,
} from '@ng-mf/data-access-user';

import { ElegibilidadDeTextilesStore } from '../../estados/elegibilidad-de-textiles.store';
import { ElegibilidadTextilesService } from '../../services/elegibilidad-textiles/elegibilidad-textiles.service';

import { Subject, map, takeUntil } from 'rxjs';

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
   * @property {boolean} formularioDeshabilitado
   * @description
   * Indica si el formulario del primer paso está deshabilitado para edición.
   * Se establece como `true` cuando el trámite está en modo de solo lectura (readonly),
   * y como `false` cuando está en modo de actualización (update) o creación.
   * 
   * @default false
   * @public
   * @memberof PasoUnoComponent
   * @since 1.0.0
   * 
   * @example
   * ```typescript
   * // El formulario se deshabilita en modo readonly
   * if (this.consultaState.readonly) {
   *   this.formularioDeshabilitado = true;
   * }
   * ```
   */
  formularioDeshabilitado: boolean = false;

  /**
   * @property {number} indice
   * @description
   * El índice de la pestaña actualmente seleccionada en la interfaz de usuario.
   * Se utiliza para controlar cuál pestaña está activa y visible al usuario.
   * El valor por defecto es 1, indicando que la primera pestaña está seleccionada.
   * 
   * @type {number}
   * @default 1
   * @public
   * @memberof PasoUnoComponent
   * @since 1.0.0
   * 
   * @example
   * ```typescript
   * // Cambiar a la segunda pestaña
   * this.seleccionaTab(2);
   * console.log(this.indice); // 2
   * ```
   */
  indice: number = 1;

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
    this.indice = i;
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

          if (this.consultaState.update) {
            this.formularioDeshabilitado = false;
            this.cargarDatosPrevios();
          } else if (this.consultaState.readonly) {
            this.formularioDeshabilitado = true;
          }
        })
      )
      .subscribe();
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
  onMostrarTabs(value: boolean): void {
    if (value) {
      this.mostrarOtraPestana = true;
    }
  }

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
