import { Store, StoreConfig } from '@datorama/akita';

import { Injectable } from '@angular/core';

/**
 * Creacion del estado inicial para la interfaz de tramite
 * @returns DiamanteBruto
 */
export interface DiamanteBruto {
}

export function createInitialState(): DiamanteBruto {
  return {
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'refprocedure', resettable: true })
export class DiamanteBrutoStore extends Store<DiamanteBruto> {
  constructor() {
    super(createInitialState());
  }

}
