import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { ImmexAmpliacionSensiblesState } from './immex-ampliacion-sensibles.store';
import { ImmexAmpliacionSensiblesStore } from './immex-ampliacion-sensibles.store';

@Injectable({ providedIn: 'root' })
export class ImmexAmpliacionSensiblesQuery extends Query<ImmexAmpliacionSensiblesState> {
  selectSolicitud$ = this.select((state) => {
    return state;
  });

  constructor(protected override store: ImmexAmpliacionSensiblesStore) {
    super(store);
  }
}
