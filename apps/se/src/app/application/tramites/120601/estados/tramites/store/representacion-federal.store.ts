import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite
 * @returns RepresentacionFederaState
 */
export interface RepresentacionFederaState {
  estado: string;
  representacion: string;
}

export function createInitialState(): RepresentacionFederaState {
  return {
    estado: '',
    representacion: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'representacionfedera', resettable: true })
export class RepresentacionFederaStore extends Store<RepresentacionFederaState> {
  constructor() {
    super(createInitialState());
  }

  public setEstado(estado: string) {
    this.update((state) => ({
      ...state,
      estado,
    }));
  }

  public setRepresentacion(representacion: string) {
    this.update((state)=> ({
      ...state,
      representacion
    }))
  }

}
