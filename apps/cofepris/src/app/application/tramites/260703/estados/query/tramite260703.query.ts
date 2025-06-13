import { SolicitudPermisoState, Tramite260703Store } from '../store/tramite260703.store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Query } from '@datorama/akita';

/**
 * Clase Query para gestionar las consultas del estado de la solicitud de permiso del trámite 260703.
 * 
 * Esta clase extiende la funcionalidad base de Akita Query para proporcionar
 * métodos específicos de consulta para el estado de la solicitud de permiso.
 * Actúa como una capa de abstracción entre los componentes y el store,
 * proporcionando observables reactivos para el estado de la aplicación.
 * 
 * Funcionalidades principales:
 * - Consulta reactiva del estado completo de la solicitud
 * - Gestión automática de la reactividad del estado
 * - Integración con el patrón de gestión de estado de Akita
 * 
 * @extends {Query<SolicitudPermisoState>}
 * @injectable
 * 
 * ```
 * 
 * @see {@link SolicitudPermisoState}
 * @see {@link Tramite260703Store}
 * @see {@link Query}
 */
@Injectable({ providedIn: 'root' })
export class Tramite260703Query extends Query<SolicitudPermisoState> {
  
  /**
   * Observable que emite el estado completo de la solicitud de permiso del trámite 260703.
   * 
   * Este observable proporciona acceso reactivo a todo el estado de la solicitud,
   * incluyendo todos los formularios, datos de pago, información del establecimiento,
   * y cualquier otro dato relacionado con el trámite.
   * 
   * Características:
   * - Emite automáticamente cuando el estado cambia
   * - Proporciona el estado completo sin filtros
   * - Se puede combinar con operadores RxJS para transformaciones
   * - Gestiona automáticamente la limpieza de suscripciones
   * 
   * @type {Observable<SolicitudPermisoState>}
   * @readonly
   * @see {@link SolicitudPermisoState}
   * @see {@link Query.select}
   * 
   * @example
   * ```typescript
   * // Suscripción básica
   * this.tramiteQuery.selectSolicitudPermiso$.subscribe(estado => {
   *   console.log('Estado actual:', estado);
   * });
   * ```
   * 
   * @example
   * ```typescript
   * // Uso con async pipe en template
   * // En el componente:
   * estado$ = this.tramiteQuery.selectSolicitudPermiso$;
   * 
   * // En el template:
   * // <div *ngIf="estado$ | async as estado">
   * //   <p>Clave: {{ estado.claveDeReferencia }}</p>
   * // </div>
   * ```
   */
  selectSolicitudPermiso$: Observable<SolicitudPermisoState> = this.select((state) => {
    return state;
  });

  /**
   * Constructor de la clase Tramite260703Query.
   * 
   * Inicializa la query con el store proporcionado, estableciendo la conexión
   * entre la capa de consulta y el store de gestión de estado.
   * El parámetro `override` es necesario porque estamos sobrescribiendo
   * la propiedad `store` de la clase base Query.
   * 
   * @param {Tramite260703Store} store - La instancia del store que gestiona el estado de la solicitud de permiso
   * 
   * @see {@link Tramite260703Store}
   * @see {@link Query}
   * 
   * @example
   * ```typescript
   * // Inyección automática con Angular
   * @Component({...})
   * export class MiComponente {
   *   constructor(
   *     private query: Tramite260703Query // Angular inyecta automáticamente
   *   ) {}
   * }
   * ```
   */
  constructor(
    /**
     * Referencia al store de Tramite260703Store que gestiona el estado de la solicitud de permiso.
     * 
     * Este store contiene todo el estado relacionado con el trámite 260703,
     * incluyendo formularios, datos de pago, información del establecimiento
     * y cualquier otro dato necesario para el proceso de solicitud.
     * 
     * La palabra clave `protected override` indica que:
     * - `protected`: Solo accesible desde esta clase y sus subclases
     * - `override`: Sobrescribe la propiedad `store` de la clase base Query
     * 
     * @type {Tramite260703Store}
     * @protected
     * @override
     * @see {@link Tramite260703Store}
     * 
     * @example
     * ```typescript
     * // Acceso al store desde métodos de la clase (si se extendiera)
     * obtenerValorActual(): SolicitudPermisoState {
     *   return this.store.getValue();
     * }
     * ```
     */
    protected override store: Tramite260703Store
  ) {
    /**
     * Llama al constructor de la clase base Query con el store proporcionado.
     * 
     * Esta llamada es esencial para:
     * - Inicializar correctamente la funcionalidad base de Query
     * - Establecer la conexión entre la query y el store
     * - Habilitar todos los métodos de consulta heredados
     * - Configurar el sistema de observables de Akita
     * 
     * Sin esta llamada, la query no funcionaría correctamente ya que
     * no tendría acceso a los métodos y propiedades de la clase base.
     * 
     * @see {@link Query}
     * 
     * @example
     * ```typescript
     * // Esto es lo que hace internamente super(store):
     * // 1. Establece this.store = store
     * // 2. Inicializa los observables base
     * // 3. Configura los métodos de consulta
     * // 4. Prepara el sistema de reactividad
     * ```
     */
    super(store);
  }
}