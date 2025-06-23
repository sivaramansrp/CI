import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Solicitud31501State } from '../tramites/tramite31501.store';
import { Tramite31501Store } from '../tramites/tramite31501.store';

/**
 * Service to query the state of Solicitud31501.
 */
@Injectable({ providedIn: 'root' })
export class Tramite31501Query extends Query<Solicitud31501State> {
  /**
   * Observable to select the complete state of the solicitud.
   * @returns {Observable<Solicitud31501State>} The complete state of the solicitud.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**
   * Constructor for Tramite31501Query.
   * @param {Tramite31501Store} store - The store that holds the state of Solicitud31501.
   */
  constructor(protected override store: Tramite31501Store) {
    super(store);
  }
}
