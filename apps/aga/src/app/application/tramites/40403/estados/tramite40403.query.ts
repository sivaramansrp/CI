import {
  Tramite40403Store,
  Tramitenacionales40403State,
} from './tramite40403.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite40403Query extends Query<Tramitenacionales40403State> {
  constructor(protected override store: Tramite40403Store) {
    super(store);
  }
  /**
   * Observable que selecciona el estado completo de la sección.
   */
  selectSeccionState$ = this.select((state) => {
    return state;
  });
}
