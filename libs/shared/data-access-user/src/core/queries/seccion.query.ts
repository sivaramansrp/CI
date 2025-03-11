<<<<<<<<< Temporary merge branch 1
=========
// eslint-disable-next-line @nx/enforce-module-boundaries
import { SeccionState, SeccionStore } from 'apps/aga/src/app/application/estados/seccion.store';
>>>>>>>>> Temporary merge branch 2
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SeccionLibState, SeccionLibStore } from '../estados/seccion.store';


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
