import {
  SeccionLibStore,
  SeccionLibState,
} from '../../core/estados/seccion.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class SeccionLibQuery extends Query<SeccionLibState> {
  /**
   * Selecciona el estatdo completo de la sección
   */
  selectSeccionState$ = this.select((state) => {
    return state;
  });

  constructor(protected override store: SeccionLibStore) {
    super(store);
  }
}
