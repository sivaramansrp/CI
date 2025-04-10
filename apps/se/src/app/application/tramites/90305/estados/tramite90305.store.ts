import { Injectable } from '@angular/core';

import { Store, StoreConfig } from '@datorama/akita';
import { CatalogoResponse } from '@libs/shared/data-access-user/src';

export interface Tramite90305State {
  selectedEstado: CatalogoResponse | null;
}

export function createInitialState(): Tramite90305State {
  return {
    selectedEstado: null,
  };
}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'estadoState', resettable: true })
export class Tramite90305Store extends Store<Tramite90305State> {
  constructor() {
    super(createInitialState());
  }

  public setSelectedEstado(selectedEstado: CatalogoResponse) : void {
    this.update((state) => ({
      ...state,
      selectedEstado,
    }));
  }
}
