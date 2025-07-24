import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { Solicitud33304State, Solicitud33304Store } from '../estados/solicitud33304Store';

/**
 * Service to query the state of Solicitud33304.
 */
@Injectable({ providedIn: 'root' })
export class Solicitud33304Query extends Query<Solicitud33304State> {

  /**
   * Observable to select the complete state of the solicitud.
   * @returns {Observable<Solicitud33304State>} The complete state of the solicitud.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**
   * Constructor for Solicitud33304Query.
   * @param {Solicitud33304Store} store - The store that holds the state of Solicitud33304State.
   */
  constructor(
    protected override store: Solicitud33304Store) {
    super(store);
  }
}