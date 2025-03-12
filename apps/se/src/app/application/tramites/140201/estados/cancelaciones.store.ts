import { Injectable } from '@angular/core';

import { Store, StoreConfig } from '@datorama/akita';

export interface Cancelaciones140201State {
//   selectedEstado: Estado;
}

export function createInitialState(): Cancelaciones140201State {
  return {
    sample: null,
  };
}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'cancelaciones140201' })
export class Cancelaciones140201Store extends Store<Cancelaciones140201State> {
  constructor() {
    super(createInitialState());
  }

}