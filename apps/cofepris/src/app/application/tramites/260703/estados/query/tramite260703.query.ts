import { SolicitudPermisoState, Tramite260703Store } from '../store/tramite260703.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

/*
  * Tramite260703Query
  * Clase que extiende Query para gestionar el estado de la solicitud de permiso 260703.
  * Proporciona un observable para acceder al estado actual de la solicitud.
  * @property {Observable<SolicitudPermiso260703State>} selectSolicitudPermiso$ - Observable que emite el estado actual de la solicitud.
  */
@Injectable({ providedIn: 'root' })
export class Tramite260703Query extends Query<SolicitudPermisoState> {
  /**
   * Observable que emite el estado actual de la "SolicitudPermiso 260703".
   * Se puede usar para suscribirse a los cambios en el estado.
   * {Observable<SolicitudPermiso260703State>}
   */
  selectSolicitudPermiso$ = this.select((state) => {
    return state;
  });
  /**
   * Constructor de la clase Tramite260703Query.
   * store - La instancia de `Tramite260703Store` que se utiliza para gestionar el estado de la aplicación.
   */
  constructor(
    /**
     * Referencia al store de `Tramite260703Store` que se utiliza para acceder y gestionar el estado de la solicitud de permiso.
     * @type {Tramite260703Store}
     */
    protected override store: Tramite260703Store) {
      /**
       * Llama al constructor de la clase base `Query` con el store proporcionado.
       * Esto permite que la clase `Tramite260703Query` herede las funcionalidades de `Query`
       */
    super(store);
  }
}