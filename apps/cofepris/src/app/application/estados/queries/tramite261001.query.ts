
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Solicitud216001State, Tramite216001Store } from '../tramites/tramite261001.store';

/**
 * Service to query the state of Solicitud31601.
 */
@Injectable({ providedIn: 'root' })
export class Tramite216001Query extends Query<Solicitud216001State> {

  /**
   * Observable to select the complete state of the solicitud.
   * @returns {Observable<Solicitud216001State>} The complete state of the solicitud.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**
   * Constructor for Tramite31601Query.
   * @param {Tramite216001Store} store - The store that holds the state of Solicitud216001.
   */
  constructor(
    protected override store: Tramite216001Store) {
    super(store);
  }
}