
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { Avisocalidad260514Store, Solicitud260514State } from '../../estados/stores/aviso-calidad.store';

/**
 * Service to query the state of Solicitud260211.
 */
@Injectable({ providedIn: 'root' })
export class Avisocalidad260514Query extends Query<Solicitud260514State> {

  /**
   * Observable to select the complete state of the solicitud.
   * @returns {Observable<Solicitud260211State>} The complete state of the solicitud.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**
   * Constructor for Permiso260211Query.
   * @param {Tramite216001Store} store - The store that holds the state of Solicitud260211.
   */
  constructor(
    protected override store: Avisocalidad260514Store) {
    super(store);
  }
}