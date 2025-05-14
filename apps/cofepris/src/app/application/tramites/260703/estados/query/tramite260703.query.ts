import { SolicitudPermisoState, Tramite260703Store } from '../store/tramite260703.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite260703Query extends Query<SolicitudPermisoState> {

  /**
   * Observable que emite el estado actual de la "SolicitudPermiso 260703".
   * Se puede usar para suscribirse a los cambios en el estado.
   *
   * {Observable<SolicitudPermiso260703State>}
   */
  selectSolicitudPermiso$ = this.select((state) => {
    return state;
  });


  /**
   * Constructor de la clase Tramite260703Query.
   * 
   * store - La instancia de `Tramite260703Store` que se utiliza para gestionar el estado de la aplicación.
   */
  constructor(
    protected override store: Tramite260703Store) {
    super(store);
  }
}