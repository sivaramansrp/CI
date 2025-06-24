import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface Tramite90305State {
  selectedEstado: string | null;
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

  public setSelectedEstado(selectedEstado: string) : void {
    this.update((state) => ({
      ...state,
      selectedEstado,
    }));
  }
}
