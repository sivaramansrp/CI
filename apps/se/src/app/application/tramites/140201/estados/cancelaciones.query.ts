import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { Cancelaciones140201State, Cancelaciones140201Store } from './cancelaciones.store';

@Injectable({ providedIn: 'root' })
export class Cancelaciones140201Query extends Query<Cancelaciones140201State> {
 
  constructor(private Store: Cancelaciones140201Store) {
    super(Store);
  }
}