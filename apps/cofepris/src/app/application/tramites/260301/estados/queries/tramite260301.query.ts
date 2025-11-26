import { Inject, Injectable } from '@angular/core';
import { Solicitud260301State, Tramite260301Store } from '../../estados/stores/tramite260301.store';
import { Query } from '@datorama/akita';
/**
 * Service to query the state of Solicitud260301.
 */
@Injectable({ providedIn: 'root' })
export class Tramite260301Query extends Query<Solicitud260301State> {

  /**
   * Observable to select the complete state of the solicitud.
   * @returns {Observable<Solicitud260301State>} The complete state of the solicitud.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**
   * Constructor for Tramite260301Query.
   * @param {Tramite260301Store} store - The store that holds the state of Solicitud260211.
   */
  constructor(
    @Inject(Tramite260301Store) protected override store: Tramite260301Store) {
    super(store);
  }
}