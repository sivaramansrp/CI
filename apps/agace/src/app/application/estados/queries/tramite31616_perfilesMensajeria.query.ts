import { Solicitud31616PerfilesMensajeriaState, Tramite31616PerfilesMensajeriaStore } from '../../estados/tramites/tramite31616_perfilesMensajeria.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

/**
 * Service to query the state of Solicitud31616.
 */
@Injectable({ providedIn: 'root' })
export class Tramite31616PerfilesMensajeriaQuery extends Query<Solicitud31616PerfilesMensajeriaState> {

  /**
   * Observable to select the complete state of the solicitud.
   * @returns {Observable<Solicitud31616State>} The complete state of the solicitud.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**
   * Constructor for Tramite31616Query.
   * @param {Tramite31616PerfilesMensajeriaStore} store - The store that holds the state of Solicitud31616.
   */
  constructor(
    protected override store: Tramite31616PerfilesMensajeriaStore) {
    super(store);
  }
}