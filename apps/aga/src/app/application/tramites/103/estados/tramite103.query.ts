import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Solicitud103State, Tramite103Store } from './tramite103.store';

/**
 * Tramite103Query provides reactive access to the state of Solicitud103.
 */
@Injectable({ providedIn: 'root' })
export class Tramite103Query extends Query<Solicitud103State> {
  /**
   * Observable that emits the full state of the solicitud.
   */
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  /**
   * Creates an instance of Tramite103Query.
   * @param store The store instance that holds the Solicitud103 state.
   */
  constructor(protected override store: Tramite103Store) {
    super(store);
  }
}
