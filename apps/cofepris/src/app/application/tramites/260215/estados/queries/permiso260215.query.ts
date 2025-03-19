
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { Sanitario260215Store, Solicitud260215State } from '../tramites/sanitario260215.store';

/**
 * Service to query the state of Solicitud260215.
 */
@Injectable({ providedIn: 'root' })
export class Permiso260215Query extends Query<Solicitud260215State> {

  /**
   * Observable to select the complete state of the solicitud.
   * @returns {Observable<Solicitud260215State>} The complete state of the solicitud.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**
   * Constructor for Permiso260215Query.
   * @param {Tramite260215Store} store - The store that holds the state of Solicitud260215.
   */
  constructor(
    protected override store: Sanitario260215Store) {
    super(store);
  }
}