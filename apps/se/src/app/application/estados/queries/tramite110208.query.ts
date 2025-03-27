
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Solicitud110208State, Tramite110208Store } from '../tramites/tramite110208.store';

/**
 * Service to query the state of Solicitud31601.
 */
@Injectable({ providedIn: 'root' })
export class Tramite110208Query extends Query<Solicitud110208State> {

  /**
   * Observable to select the complete state of the solicitud.
   * @returns {Observable<Solicitud110208State>} The complete state of the solicitud.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**
   * Constructor for Tramite110208Store.
   * @param {Tramite110208Store} store - The store that holds the state of Solicitud110208.
   */
  constructor(
    protected override store: Tramite110208Store) {
    super(store);
  }
}