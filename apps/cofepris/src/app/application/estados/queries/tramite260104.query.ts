
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Solicitud260104State, Tramite260104Store } from '../tramites/tramite260104.store';

/**
 * Service to query the state of Solicitud31601.
 */
@Injectable({ providedIn: 'root' })
export class Tramite260104Query extends Query<Solicitud260104State> {

  /**
   * Observable to select the complete state of the solicitud.
   * @returns {Observable<Solicitud260104State>} The complete state of the solicitud.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**
   * Constructor for Tramite260104Query.
   * @param {Tramite260104Store} store - The store that holds the state of Solicitud260104.
   */
  constructor(
    protected override store: Tramite260104Store) {
    super(store);
  }
}