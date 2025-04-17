import { Tramite630307State, Tramite630307Store } from './tramite630307.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite630307Query extends Query<Tramite630307State> {

selectTramite630307State$ = this.select((state) => state);
  constructor(
    protected override store: Tramite630307Store) {
    super(store);
  }
 
}
