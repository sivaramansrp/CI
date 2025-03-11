import { Injectable } from '@angular/core';

import { Store, StoreConfig } from '@datorama/akita';

import { catalogoResponse } from '@libs/shared/data-access-user/src';

export interface Pantallas220401State {
  [key: string]: any;
}

export function createInitialState(): Pantallas220401State {
  return {};
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'Pantallas220401' })
// export class Dropdown220401Store extends Store<Dropdown220401State> {
  export class Pantallas220401Store extends Store<Pantallas220401State> {
 
    constructor() {
    super(createInitialState());
  }
}