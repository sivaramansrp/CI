import { Tramite260912Store, Tramites260912State } from './tramite-260912.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class Tramite260912Query extends Query<Tramites260912State> {

  selectTramite260912$= this.select((state) => {
    return state;
  });

  constructor(
    protected override store: Tramite260912Store) {
    super(store);
  }
}