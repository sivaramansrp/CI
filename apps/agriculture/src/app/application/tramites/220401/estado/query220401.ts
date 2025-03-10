import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { Dropdown220401State, Dropdown220401Store } from './store220401';

@Injectable({ providedIn: 'root' })
export class Dropdown220401Query extends Query<Dropdown220401State> {
  constructor(protected override store: Dropdown220401Store) {
    super(store);
  }

  getDropdownState(key: string) {
    return this.select(state => state[key]);
  }
}