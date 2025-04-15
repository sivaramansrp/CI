import { Solicitud31616TercerosState, Tramite31616TercerosStore } from '../../estados/tramites/tramite31616_terceros.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

/**
 * Service to query the state of Solicitud31616.
 */
@Injectable({ providedIn: 'root' })
export class Tramite31616TercerosQuery extends Query<Solicitud31616TercerosState> {

  /**
   * Observable to select the complete state of the solicitud.
   * @returns {Observable<Solicitud31616State>} The complete state of the solicitud.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**
   * Constructor for Tramite31616Query.
   * @param {Tramite31616TercerosStore} store - The store that holds the state of Solicitud31616.
   */
  constructor(
    protected override store: Tramite31616TercerosStore) {
    super(store);
  }
}