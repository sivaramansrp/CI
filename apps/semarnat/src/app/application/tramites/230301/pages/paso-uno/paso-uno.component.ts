/**
 * @fileoverview Componente para el primer paso del trámite 230301 de SEMARNAT.
 * Este archivo contiene la lógica para manejar la interfaz de usuario del primer paso
 * del proceso de solicitud, incluyendo la gestión del estado y la carga de datos.
 * @author Equipo de desarrollo VUCEM 3.0
 * @version 1.0.0
 * @since 2025
 */

/** Importaciones necesarias para el acceso a datos de usuario y estados de consulta */
import { AVISO, ConsultaioQuery, ConsultaioState, SolicitanteComponent } from '@ng-mf/data-access-user';
/** Importaciones del núcleo de Angular para componentes y ciclo de vida */
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
/** Importaciones de RxJS para manejo de observables y operadores reactivos */
import { Subject, map, takeUntil } from 'rxjs';
/** Servicio para manejar el desistimiento de solicitudes del trámite */
import { DesistimientoSolicitudService } from '../../services/desistimiento-solicitud.service';
/** Store para gestionar el estado global del trámite 230301 */
import { Solicitud230301Store } from '../../estados/tramites/tramites230301.store';
import { SolicitudComponent } from '../../component/solicitud/solicitud.component';

/**
 * @class PasoUnoComponent
 * @description Componente Angular que representa el primer paso del trámite 230301 de SEMARNAT.
 * Este componente maneja la interfaz de usuario inicial del proceso de solicitud,
 * incluyendo la validación de estados, carga de datos existentes y navegación por pestañas.
 * 
 * @implements {OnInit} - Interfaz para el método ngOnInit del ciclo de vida de Angular
 * @implements {OnDestroy} - Interfaz para el método ngOnDestroy del ciclo de vida de Angular
 * 
 * @example
 * ```typescript
 * // Uso del componente en la plantilla
 * <app-paso-uno></app-paso-uno>
 * ```
 */
@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrl: './paso-uno.component.scss',
})
export class PasoUnoComponent implements OnInit , OnDestroy{

  /**
   * @property {number} indice
   * @description Índice actual del paso en el proceso de navegación por pestañas.
   * Se utiliza para controlar qué pestaña está activa en la interfaz de usuario.
   * @default 1
   * @example
   * ```typescript
   * this.indice = 2; // Cambiar a la segunda pestaña
   * ```
   */
  indice: number = 1;

  /**
   * @property {string} TEXTOS
   * @description Contiene los textos del aviso de privacidad simplificado.
   * Asigna el aviso de privacidad simplificado al atributo `TEXTOS` para su uso en la plantilla.
   * @readonly
   * @see {@link AVISO.Aviso} - Fuente de los textos del aviso
   */
  TEXTOS = AVISO.Aviso;

  /**
   * @property {ConsultaioState} consultaState
   * @description Estado de la consulta actual que contiene información sobre el procedimiento,
   * incluyendo el ID del procedimiento, permisos de actualización y estado de solo lectura.
   * Esta variable se utiliza para determinar el comportamiento del componente.
   * @public
   * @see {@link ConsultaioState} - Interfaz que define la estructura del estado
   */
  public consultaState!: ConsultaioState;

  /**
   * @property {boolean} esDatosRespuesta
   * @description Indicador que determina si los datos han sido cargados desde el servidor.
   * Se establece en `true` cuando se han obtenido datos de respuesta del servidor
   * para actualizar el formulario con información existente.
   * @default false
   * @public
   */
  public esDatosRespuesta: boolean = false;

  /**
   * @property {boolean} formularioDeshabilitado
   * @description Controla si el formulario debe estar deshabilitado para edición.
   * Se actualiza basándose en el estado de solo lectura (`readonly`) del `consultaState`.
   * Cuando es `true`, los campos del formulario no pueden ser modificados por el usuario.
   * @default false
   * @public
   */
  public formularioDeshabilitado: boolean = false;

  /**
   * @property {Subject<void>} destroyNotifier$
   * @description Subject utilizado para el patrón de limpieza de suscripciones en Angular.
   * Se utiliza para notificar la destrucción del componente y evitar fugas de memoria
   * cancelando todas las suscripciones activas cuando el componente es destruido.
   * @public
   * @see {@link ngOnDestroy} - Método donde se completa este Subject
   * @example
   * ```typescript
   * // Uso típico en suscripciones
   * this.observable$.pipe(takeUntil(this.destroyNotifier$)).subscribe();
   * ```
   */
  public destroyNotifier$: Subject<void> = new Subject();

  /**
   * @property {SolicitanteComponent} SolicitanteComponent
   * @description
   * Referencia al componente hijo SolicitanteComponent a través del selector 'solicitante'.
   * Permite acceder a los métodos y propiedades del componente, especialmente para validar
   * el formulario de datos del solicitante.
   */
  @ViewChild('solicitante') SolicitanteComponent!: SolicitanteComponent;

  /**
   * @property {SolicitudComponent} SolicitudComponent
   * @description
   * Referencia al componente hijo SolicitudComponent a través del selector 'solicitud'.
   * Permite acceder a los métodos y propiedades del componente, especialmente para validar
   * el formulario de datos de la solicitud de desistimiento.
   */
  @ViewChild('solicitud') SolicitudComponent!: SolicitudComponent;

  /**
   * @property {Array<{index: number, title: string, component: string}>} seccionesDeLaSolicitud
   * @description
   * Configuración de las secciones o pestañas que componen el formulario del primer paso.
   * Cada elemento del array define una sección con su índice, título y nombre del componente asociado.
   * Se utiliza para la navegación entre pestañas en la interfaz de usuario.
   */
  seccionesDeLaSolicitud = [
    { index: 1, title: 'Solicitante', component: 'solicitante' },
    { index: 2, title: 'Solicitud', component: 'solicitud' },
  ];

  /**
   * @constructor
   * @description Constructor del componente `PasoUnoComponent`.
   * Inicializa el componente y establece la suscripción al estado de la consulta para
   * obtener información sobre el procedimiento actual y configurar el estado del formulario.
   * 
   * @param {Solicitud230301Store} tramite230301Store - Almacén (store) para gestionar el estado global de la solicitud del trámite 230301
   * @param {ConsultaioQuery} consultaQuery - Servicio de consulta para obtener el estado actual de la consulta y sus cambios reactivos
   * @param {DesistimientoSolicitudService} desistimientoSolicitudService - Servicio especializado para manejar solicitudes de desistimiento del trámite
   * 
   * @description
   * Durante la inicialización, el constructor:
   * 1. Configura la suscripción reactiva al estado de la consulta
   * 2. Actualiza automáticamente el estado local cuando cambia el estado de la consulta
   * 3. Configura el modo de solo lectura del formulario según el estado
   * 4. Utiliza el patrón `takeUntil` para evitar fugas de memoria
   * 
   * @throws {Error} Si alguno de los servicios inyectados no está disponible
   * 
   * @example
   * ```typescript
   * // El constructor se invoca automáticamente por Angular
   * // No es necesario llamarlo manualmente
   * ```
   */
   constructor(private tramite230301Store:Solicitud230301Store,
    private consultaQuery: ConsultaioQuery,
    private desistimientoSolicitudService: DesistimientoSolicitudService) {
       this.consultaQuery.selectConsultaioState$.pipe(takeUntil(this.destroyNotifier$), map((seccionState) => {
      this.consultaState = seccionState;
      this.formularioDeshabilitado = seccionState.readonly;
    })).subscribe();
   }


   /**
    * @method ngOnInit
    * @description Método del ciclo de vida de Angular que se ejecuta después de la inicialización del componente.
    * Verifica las condiciones del estado de la consulta para determinar si debe cargar datos existentes
    * o establecer el componente en modo de datos de respuesta.
    * 
    * @implements {OnInit.ngOnInit}
    * @returns {void}
    * 
    * @description
    * La lógica de inicialización:
    * 1. Verifica si existe un estado de consulta válido
    * 2. Comprueba si el procedimiento corresponde al ID '230301' (trámite específico de SEMARNAT)
    * 3. Determina si está en modo de actualización
    * 4. Si todas las condiciones se cumplen, carga los datos del formulario existente
    * 5. En caso contrario, marca el componente como listo para mostrar datos de respuesta
    * 
    * @example
    * ```typescript
    * // Este método se ejecuta automáticamente por Angular
    * // después de la construcción del componente
    * ```
    */
   ngOnInit(): void {
      if (this.consultaState && this.consultaState.procedureId === '230301' &&
      this.consultaState.update) {
      this.cargarDatosFormulario();
    } else {
      this.esDatosRespuesta = true;
    }
   }

  /**
   * @method seleccionaTab
   * @description Método para la navegación entre pestañas en la interfaz de usuario.
   * Selecciona una pestaña específica estableciendo el índice correspondiente,
   * lo que permite al usuario navegar entre diferentes secciones del formulario.
   * 
   * @param {number} i - El índice de la pestaña a seleccionar (base 1)
   * @returns {void}
   * 
   * @throws {Error} Si el índice proporcionado no es un número válido
   * 
   * @example
   * ```typescript
   * // Seleccionar la primera pestaña
   * this.seleccionaTab(1);
   * 
   * // Seleccionar la segunda pestaña
   * this.seleccionaTab(2);
   * ```
   * 
   * @see {@link indice} - Propiedad que almacena el índice actual
   */
  seleccionaTab(i: number): void {
    this.indice = i;
  }

  /**
   * @method cargarDatosFormulario
   * @description Método para cargar y procesar datos existentes del formulario desde el servidor.
   * Obtiene los datos de registro de toma de muestras de mercancías y actualiza el estado
   * del formulario con la información recuperada. Este método es esencial para la funcionalidad
   * de actualización de solicitudes existentes.
   * 
   * @returns {void}
   * 
   * @description
   * Flujo de ejecución:
   * 1. Llama al servicio para obtener datos del registro de toma de muestras
   * 2. Utiliza el operador `takeUntil` para manejar la limpieza automática de suscripciones
   * 3. Si se reciben datos válidos, marca el componente como datos de respuesta
   * 4. Actualiza el estado del formulario a través del servicio correspondiente
   * 
   * @throws {Error} Si hay problemas en la comunicación con el servidor
   * 
   * @example
   * ```typescript
   * // Llamar manualmente para cargar datos
   * this.guardarDatosFormulario();
   * ```
   * 
   * @see {@link DesistimientoSolicitudService.getRegistroTomaMuestrasMercanciasData} - Método para obtener datos
   * @see {@link DesistimientoSolicitudService.actualizarEstadoFormulario} - Método para actualizar estado
   * @see {@link esDatosRespuesta} - Propiedad que se actualiza tras cargar datos
   */
  cargarDatosFormulario(): void {
    this.desistimientoSolicitudService
      .getRegistroTomaMuestrasMercanciasData().pipe(
        takeUntil(this.destroyNotifier$)).subscribe((resp) => {
          if (resp) {
            this.esDatosRespuesta = true;
            this.desistimientoSolicitudService.actualizarEstadoFormulario(resp);
          }
        });
  }
  /**
   * @method validarFormularios
   * @description
   * Valida todos los formularios contenidos en los componentes hijos del primer paso.
   * Verifica tanto el formulario del solicitante como el de la solicitud de desistimiento.
   * Si algún formulario es inválido, marca todos los campos como tocados para mostrar los mensajes de error.
   * 
   * @returns {boolean} true si todos los formularios son válidos, false si alguno es inválido o
   * si alguna referencia a los componentes hijos no está disponible.
   * @public
   */
  public validarFormularios(): boolean {
    let isValid = true;

    if (this.SolicitanteComponent?.form) {
      if (this.SolicitanteComponent.form.invalid) {
        this.SolicitanteComponent.form.markAllAsTouched();
        isValid = false;
      }
    } else {
      isValid = false;
    }

    if (this.SolicitudComponent) {
      if (!this.SolicitudComponent.validarFormulario()) {
        isValid = false;
      }
    } else {
      isValid = false;
    }

    return isValid;
  }

  /**
   * @method ngOnDestroy
   * @description Método del ciclo de vida de Angular que se ejecuta al destruir el componente.
   * Implementa el patrón de limpieza de recursos para evitar fugas de memoria
   * y garantizar que todas las suscripciones activas sean canceladas apropiadamente.
   * 
   * @implements {OnDestroy.ngOnDestroy}
   * @returns {void}
   * 
   * @description
   * Proceso de limpieza:
   * 1. Emite un valor final en el Subject `destroyNotifier$`
   * 2. Completa el observable para notificar a todas las suscripciones que deben cancelarse
   * 3. Libera recursos y previene fugas de memoria
   * 
   * @example
   * ```typescript
   * // Este método se ejecuta automáticamente por Angular
   * // cuando el componente es destruido
   * ```
   * 
   * @see {@link destroyNotifier$} - Subject utilizado para la notificación de destrucción
   * @see {@link OnDestroy} - Interfaz que define el contrato del método
   * 
   * @note Es una buena práctica implementar este método en todos los componentes
   * que manejan suscripciones para evitar fugas de memoria
   */
  ngOnDestroy(): void {
    this.destroyNotifier$.next();
    this.destroyNotifier$.complete();
  }
}
