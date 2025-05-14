import {
  Solicitud261401State,
  Tramite261401Store,
} from '../tramites/tramite261401.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

/**
 * Servicio para consultar el estado del Tramite261401.
 * 
 * @export
 * @class Tramite261401Query
 * @extends {Query<Solicitud261401State>}
 */
@Injectable({ providedIn: 'root' })
export class Tramite261401Query extends Query<Solicitud261401State> {
  /**
   * Observable para seleccionar el estado completo de la solicitud.
   * 
   * @type {Observable<Solicitud261401State>}
   * @memberof Tramite261401Query
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**
   * Crea una instancia de Tramite261401Query.
   * 
   * @param {Tramite261401Store} store - El store para consultar el estado.
   * @memberof Tramite261401Query
   */
  constructor(protected override store: Tramite261401Store) {
    super(store);
  }
}