import { Tramite630303State, Tramite630303Store } from './tramite630303.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite630303Query extends Query<Tramite630303State> {

selectTramite630303State$ = this.select((state) => state);
  constructor(
    protected override store: Tramite630303Store) {
    super(store);
  }
}