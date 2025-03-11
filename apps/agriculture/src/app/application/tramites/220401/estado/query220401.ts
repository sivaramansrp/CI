import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { Pantallas220401State, Pantallas220401Store } from './store220401';

@Injectable({ providedIn: 'root' })
export class Dropdown220401Query extends Query<Pantallas220401State> {
  constructor(protected override store: Pantallas220401Store) {
    super(store);
  }

  getDropdownState(key: string) {
    return this.select(state => state[key]);
  }
}