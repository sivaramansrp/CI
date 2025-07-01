import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  SolicitudPermisoState,
  Tramite260703Store,
} from '../../estados/store/tramite260703.store';
import { Subject, map, takeUntil } from 'rxjs';
import { CONFIGURACIONCOLUMNA } from '../../enum/solicitud-permiso.enum';
import {
  ConfiguracionColumna
} from '@libs/shared/data-access-user/src';
import { SolicitudPermisoService } from '../../services/solicitud-permiso.service';
import { Tramite260703Query } from '../../estados/query/tramite260703.query';
import { TramiteAsociados } from '../../../../shared/models/tramite-asociados.model';

/**
 * Componente que representa el primer paso en un proceso de múltiples pasos.
 * Este componente se encarga de gestionar la información del pago de derechos
 * y de mostrar los trámites asociados a la solicitud de permiso.
 * 
 * @example
 * ```html
 * <app-paso-uno></app-paso-uno>
 * ```
 * 
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  providers: [SolicitudPermisoService]
})
export class PasoUnoComponent implements OnInit, OnDestroy {
  /**
   * El índice de la pestaña actualmente seleccionada.
   * Por defecto es 1 que representa la primera pestaña.
   * 
   * @type {number}
   * @default 1
   * @example
   * ```typescript
   * this.indice = 3; // Selecciona la tercera pestaña
   * ```
   */
  indice: number = 1;

  /**
   * Formulario reactivo para capturar los datos del pago de derechos.
   * Se inicializa dinámicamente con los valores del estado de la solicitud.
   * 
   * @type {FormGroup}
   * @see {@link crearformularioPagoDerechos}
   * @example
   * ```typescript
   * this.formularioPagoDerechos.get('claveDeReferencia')?.value;
   * ```
   */
  formularioPagoDerechos!: FormGroup;

  /**
   * Estado actual de la solicitud de permiso.
   * Contiene toda la información relacionada con el proceso de la solicitud.
   * 
   * @type {SolicitudPermisoState}
   * @see {@link SolicitudPermisoState}
   */
  estadoSolicitudPermiso!: SolicitudPermisoState;

  /**
   * Lista de trámites asociados que se mostrarán en la tabla.
   * Se obtiene del servicio y se utiliza para renderizar la información tabular.
   * 
   * @type {TramiteAsociados[]}
   * @see {@link TramiteAsociados}
   */
  tramiteAsociados!: TramiteAsociados[];

  /**
   * Configuración de las columnas de la tabla para mostrar los trámites asociados.
   * Define la estructura y formato de cada columna en la tabla de trámites.
   * 
   * @type {ConfiguracionColumna<TramiteAsociados>[]}
   * @default CONFIGURACIONCOLUMNA
   * @see {@link ConfiguracionColumna}
   * @see {@link CONFIGURACIONCOLUMNA}
   */
  configuracionTabla: ConfiguracionColumna<TramiteAsociados>[] =
    CONFIGURACIONCOLUMNA;

  /**
   * Observable utilizado para limpiar las suscripciones al destruir el componente.
   * Esto ayuda a evitar fugas de memoria mediante el patrón takeUntil.
   * 
   * @private
   * @type {Subject<void>}
   * @see {@link ngOnDestroy}
   * @example
   * ```typescript
   * someObservable.pipe(takeUntil(this.notificadorDestruccion$))
   * ```
   */
  private notificadorDestruccion$: Subject<void> = new Subject();

  /**
   * Datos de respuesta del servidor utilizados para actualizar el formulario.
   * Indica si los datos han sido cargados desde el servidor correctamente.
   * 
   * @type {boolean}
   * @default false
   * @example
   * ```typescript
   * if (this.esDatosRespuesta) {
   *   // Procesar datos del servidor
   * }
   * ```
   */
  public esDatosRespuesta: boolean = false;

  /**
   * Estado de la consulta, que contiene información sobre el estado actual del formulario.
   * Incluye información sobre el modo de visualización y permisos del usuario.
   * 
   * @type {ConsultaioState}
   * @see {@link ConsultaioState}
   */
  public consultaState!: ConsultaioState;

  /**
   * Indica si el formulario está en modo solo lectura.
   * Cuando es `true`, los campos del formulario no se pueden editar.
   * 
   * @type {boolean}
   * @default false
   * @example
   * ```typescript
   * if (this.esFormularioSoloLectura) {
   *   // Deshabilitar controles del formulario
   * }
   * ```
   */
  esFormularioSoloLectura: boolean = false;

 

  /**
   * Constructor del componente.
   * Inicializa los servicios y dependencias necesarias.
   * Configura la suscripción inicial para el estado de solo lectura.
   * 
   * @param {FormBuilder} formBuilder - Servicio para crear formularios reactivos
   * @param {SolicitudPermisoService} solicitudPermisoService - Servicio para operaciones de solicitud de permiso
   * @param {Tramite260703Store} tramite260703Store - Store para gestión del estado del trámite
   * @param {Tramite260703Query} tramite260703Query - Query para consultas del estado del trámite
   * @param {ConsultaioQuery} consultaQuery - Query para el estado de consulta
   * 
   * @example
   * ```typescript
   * // El constructor se ejecuta automáticamente al instanciar el componente
   * const component = new PasoUnoComponent(
   *   formBuilder, 
   *   solicitudPermisoService, 
   *   tramite260703Store, 
   *   tramite260703Query, 
   *   consultaQuery
   * );
   * ```
   */
  constructor(
    private formBuilder: FormBuilder,
    public solicitudPermisoService: SolicitudPermisoService,
    private tramite260703Store: Tramite260703Store,
    private tramite260703Query: Tramite260703Query,
    private consultaQuery: ConsultaioQuery
  ) {
     this.consultaQuery.selectConsultaioState$
    .pipe(
      takeUntil(this.notificadorDestruccion$),
      map((seccionState) => {
       this.esFormularioSoloLectura = seccionState.readonly;
       
      })
    )
    .subscribe()
  }

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Configura las suscripciones necesarias y carga los datos iniciales.
   * 
   * Realiza las siguientes operaciones:
   * - Suscribe al estado de consulta
   * - Decide si cargar datos del servidor o usar datos de respuesta
   * - Suscribe al estado de la solicitud de permiso
   * - Obtiene los trámites asociados
   * - Inicializa los catálogos de pago de derechos
   * 
   * @returns {void}
   * @see {@link guardarDatosFormulario}
   * @see {@link SolicitudPermisoService.obtenerTramitesAsociados}
   * @see {@link SolicitudPermisoService.inicializaPagoDeDerechosDatosCatalogos}
   * 
   * @example
   * ```typescript
   * // Se ejecuta automáticamente al inicializar el componente
   * component.ngOnInit();
   * ```
   */
  ngOnInit(): void {
    this.consultaQuery.selectConsultaioState$
      .pipe(
        takeUntil(this.notificadorDestruccion$),
        map((seccionState) => {
          this.consultaState = seccionState;
        })
      )
      .subscribe();
    if (this.consultaState.update) {
      this.guardarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }

    this.tramite260703Query.selectSolicitudPermiso$
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((estadoSolicitudPermiso: SolicitudPermisoState) => {
        this.estadoSolicitudPermiso = estadoSolicitudPermiso;
      });

    this.solicitudPermisoService
      .obtenerTramitesAsociados()
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((tramiteAsociados) => {
        this.tramiteAsociados = tramiteAsociados;
      });

    this.solicitudPermisoService.inicializaPagoDeDerechosDatosCatalogos();
  }

  /**
   * Carga datos desde un archivo JSON y actualiza el store con la información obtenida.
   * Luego reinicializa el formulario con los valores actualizados desde el store.
   * 
   * Este método se ejecuta cuando se necesita cargar datos previamente guardados
   * o cuando se está en modo de actualización.
   * 
   * @returns {void}
   * @see {@link SolicitudPermisoService.getRegistroTomaMuestrasMercanciasData}
   * @see {@link SolicitudPermisoService.actualizarEstadoFormulario}
   * 
   * @example
   * ```typescript
   * // Llamar cuando se necesite cargar datos del servidor
   * this.guardarDatosFormulario();
   * ```
   */
  guardarDatosFormulario(): void {
    this.solicitudPermisoService
      .getRegistroTomaMuestrasMercanciasData()
      .pipe(takeUntil(this.notificadorDestruccion$))
      .subscribe((resp) => {
        if (resp) {
          this.esDatosRespuesta = true;
          this.solicitudPermisoService.actualizarEstadoFormulario(resp);
        }
      });
  }

  /**
   * Crea el formulario reactivo para capturar los datos del pago de derechos.
   * Algunos campos como `claveDeReferencia`, `cadenaPagoDependencia` e `impPago`
   * están configurados con validaciones específicas.
   * 
   * Los campos del formulario incluyen:
   * - claveDeReferencia: Clave de referencia de la transacción
   * - cadenaPagoDependencia: Cadena de pago de la dependencia
   * - bancoClave: Clave del banco
   * - llaveDePago: Llave única de pago
   * - fecPago: Fecha de pago
   * - impPago: Importe del pago (con validación mínima de 0)
   * 
   * @returns {void}
   * @see {@link FormBuilder.group}
   * @see {@link Validators.min}
   * 
   * @example
   * ```typescript
   * // Crear el formulario antes de mostrarlo al usuario
   * this.crearformularioPagoDerechos();
   * console.log(this.formularioPagoDerechos.value);
   * ```
   */
  crearformularioPagoDerechos(): void {
    this.formularioPagoDerechos = this.formBuilder.group({
      claveDeReferencia: new FormControl(
        this.estadoSolicitudPermiso.claveDeReferencia
      ),
      cadenaPagoDependencia: new FormControl(
        this.estadoSolicitudPermiso.cadenaPagoDependencia
      ),
      bancoClave: new FormControl(this.estadoSolicitudPermiso.bancoClave),
      llaveDePago: new FormControl(this.estadoSolicitudPermiso.llaveDePago),
      fecPago: new FormControl(this.estadoSolicitudPermiso.fecPago),
      impPago: new FormControl(
        this.estadoSolicitudPermiso.impPago,
        Validators.min(0)
      ),
    });
  }

  /**
   * Establece valores en el store según el campo y el método proporcionados.
   * Toma el valor del formulario y lo actualiza en el estado global del componente.
   * 
   * @param {Object} $event - Objeto que contiene la información del evento
   * @param {FormGroup} $event.formularioPagoDerechos - El formulario de pago de derechos
   * @param {string} $event.campo - El nombre del campo que se está actualizando
   * 
   * @returns {void}
   * @see {@link Tramite260703Store.actualizarEstado}
   * 
   * @example
   * ```typescript
   * // Actualizar un campo específico en el store
   * this.setValoresStore({
   *   formularioPagoDerechos: this.formularioPagoDerechos,
   *   campo: 'bancoClave'
   * });
   * ```
   */
  setValoresStore($event: {
    formularioPagoDerechos: FormGroup;
    campo: string;
  }): void {
    const VALOR = $event.formularioPagoDerechos.get($event.campo)?.value;
    this.tramite260703Store.actualizarEstado({ [$event.campo]: VALOR });
  }

  /**
   * Selecciona una pestaña estableciendo su índice.
   * Si se selecciona la pestaña 4, se crea automáticamente el formulario de pago de derechos.
   * 
   * Las pestañas disponibles son:
   * - 1: Primera pestaña (por defecto)
   * - 2: Segunda pestaña
   * - 3: Tercera pestaña
   * - 4: Cuarta pestaña (activa la creación del formulario de pago)
   * 
   * @param {number} i - El índice de la pestaña a seleccionar (1-4)
   * 
   * @returns {void}
   * @see {@link crearformularioPagoDerechos}
   * 
   * @example
   * ```typescript
   * // Seleccionar la tercera pestaña
   * this.seleccionaTab(3);
   * 
   * // Seleccionar la pestaña de pago (crea el formulario automáticamente)
   * this.seleccionaTab(4);
   * ```
   */
  seleccionaTab(i: number): void {
    if (i === 4) {
      this.crearformularioPagoDerechos();
    }
    this.indice = i;
  }

  /**
   * Método del ciclo de vida que se ejecuta al destruir el componente.
   * Limpia las suscripciones para evitar fugas de memoria utilizando el patrón takeUntil.
   * 
   * Realiza las siguientes operaciones de limpieza:
   * - Emite una señal de destrucción a todas las suscripciones activas
   * - Completa el subject notificadorDestruccion$
   * - Libera los recursos utilizados por las suscripciones
   * 
   * @returns {void}
   * @see {@link notificadorDestruccion$}
   * 
   * @example
   * ```typescript
   * // Se ejecuta automáticamente al destruir el componente
   * component.ngOnDestroy();
   * ```
   */
  ngOnDestroy(): void {
    this.notificadorDestruccion$.next();
    this.notificadorDestruccion$.complete();
  }
}