import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite
 * @returns RefProcedureState
 */
export interface RefProcedureState {
}

export function createInitialState(): RefProcedureState {
  return {
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'refprocedure', resettable: true })
export class RefProcedureStore extends Store<RefProcedureState> {
  constructor() {
    super(createInitialState());
  }

}
