import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite
 * @returns RefProcedureState
 */
export interface Tramite630303State {
  rfc: string;
}

export function createInitialState(): Tramite630303State {
  return {
    rfc: '',
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'tramite630303', resettable: true })
export class Tramite630303Store extends Store<Tramite630303State> {
  constructor() {
    super(createInitialState());
  }

}
