import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Tramite11101Store } from './tramite11101.store';
import { Tramitenacionales11101State } from './tramite11101.store';

@Injectable({ providedIn: 'root' })
export class Tramite11101Query extends Query<Tramitenacionales11101State> {
  constructor(protected override store: Tramite11101Store) {
    super(store);
  }
  /**
   * Observable que selecciona el estado completo de la sección.
   */
  selectSeccionState$ = this.select((state) => {
    return state;
  });
}
