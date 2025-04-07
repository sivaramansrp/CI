
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Solicitud130301State, Tramite130301Store } from '../tramites/tramite130301.store';

/**
 * Servicio para consultar el estado de la Solicitud31601.
 */
@Injectable({ providedIn: 'root' })
export class Tramite130301Query extends Query<Solicitud130301State> {

  /**
   * Observable to select the complete state of the solicitud.
   * @returns {Observable<Solicitud130301State>} The complete state of the solicitud.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**
   * Constructor para Tramite130301Store.
   * @param {Tramite130301Store} store - The store that holds the state of Solicitud130301.
   */
  constructor(
    protected override store: Tramite130301Store) {
    super(store);
  }
}