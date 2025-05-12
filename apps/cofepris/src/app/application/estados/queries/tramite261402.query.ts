import {
  Solicitud261402State,
  Tramite261402Store,
} from '../tramites/tramite261402.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

/**
 * Servicio para consultar el estado del Tramite261402.
 * 
 * @export
 * @class Tramite261402Query
 * @extends {Query<Solicitud261402State>}
 */
@Injectable({ providedIn: 'root' })
export class Tramite261402Query extends Query<Solicitud261402State> {
  /**
   * Observable para seleccionar el estado completo de la solicitud.
   * 
   * @type {Observable<Solicitud261402State>}
   * @memberof Tramite261402Query
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**
   * Crea una instancia de Tramite261402Query.
   * 
   * @param {Tramite261402Store} store - El store para consultar el estado.
   * @memberof Tramite261402Query
   */
  constructor(protected override store: Tramite261402Store) {
    super(store);
  }
}