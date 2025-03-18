import { Injectable } from '@angular/core';

import { Store, StoreConfig } from '@datorama/akita';
import { catalogoResponse } from '@libs/shared/data-access-user/src';

export interface Tramite260212State {
  selectedEstado: catalogoResponse | null;
  setClave: catalogoResponse | null,
  setDescripcion: catalogoResponse | null,
}

export function createInitialState(): Tramite260212State {
  return {
    selectedEstado: null,
    setClave: null,
    setDescripcion: null,
  };
}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'estadoState', resettable: true })
export class Tramite260212Store extends Store<Tramite260212State> {
  constructor() {
    super(createInitialState());
  }

  public setSelectedEstado(selectedEstado: catalogoResponse): void {
    this.update((state) => ({
      ...state,
      selectedEstado,
    }));
  }

  public setClave(selectedClave: catalogoResponse): void {
    this.update((state) => ({
      ...state,
      selectedClave,
    }));
  }

  public setDescripcion(selectedDescripcion: catalogoResponse): void {
    this.update((state) => ({
      ...state,
      selectedDescripcion,
    }));
  }
}
