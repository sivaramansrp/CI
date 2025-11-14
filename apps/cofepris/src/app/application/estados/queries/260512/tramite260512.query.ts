import { Solicitud260512State, Tramite260512Store } from '../../tramites/260512/tramite260512.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
/**
 * Service to query the state of Solicitud260303.
 */
@Injectable({ providedIn: 'root' })
export class Tramite260512Query extends Query<Solicitud260512State> {

  /**
   * Observable selector for retrieving the entire state.
   */
  allStoreData$ = this.select((state) => state);

  /**
   * Observable to select the complete state of the solicitud.
   * @returns {Observable<Solicitud260512State>} The complete state of the solicitud.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**
   * Constructor for Tramite260512Query.
   * @param {Tramite260512Store} store - The store that holds the state of Solicitud260512.
   */
  constructor(
    protected override store: Tramite260512Store) {
    super(store);
  }
}