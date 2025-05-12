/* eslint-disable sort-imports */

import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Solicitud260303State, Tramite260303Store } from '../../tramites/260303/tramite260303.store';

/**
 * Service to query the state of Solicitud260303.
 */
@Injectable({ providedIn: 'root' })
export class Tramite260303Query extends Query<Solicitud260303State> {

  /**
   * Observable to select the complete state of the solicitud.
   * @returns {Observable<Solicitud260303State>} The complete state of the solicitud.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**
   * Constructor for Tramite260303Query.
   * @param {Tramite260303Store} store - The store that holds the state of Solicitud260211.
   */
  constructor(
    protected override store: Tramite260303Store) {
    super(store);
  }
}