import { Injectable } from '@angular/core';

import { Store, StoreConfig } from '@datorama/akita';

import { catalogoResponse } from '@libs/shared/data-access-user/src';

export interface Dropdown220401State {
  [key: string]: any;
}

export function createInitialState(): Dropdown220401State {
  return {};
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'dropdown' })
export class Dropdown220401Store extends Store<Dropdown220401State> {
 
    constructor() {
    super(createInitialState());
  }
}