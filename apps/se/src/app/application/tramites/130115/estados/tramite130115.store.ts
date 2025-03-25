import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite
 * @returns RefProcedureState
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Tramite130115State {
}

export function createInitialState(): Tramite130115State {
  return {
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite130115', resettable: true })
export class Tramite130115Store extends Store<Tramite130115State> {
  constructor() {
    super(createInitialState());
  }

}
